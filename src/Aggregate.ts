import { EventEmitter } from 'events';
import { AggregateEvent } from './AggregateEvent';

interface IAggregate<TId> {
  id: TId;
  version: number;
  getEvents(): AggregateEvent[];
  applyEvent(event: AggregateEvent): void;
}

export interface InternalAggregate {
  commit(event: AggregateEvent): void;
}

export abstract class Aggregate<TId> implements IAggregate<TId> {
  private events: AggregateEvent[];
  protected readonly eventEmitter: EventEmitter;

  constructor(public readonly id: TId) {
    this.events = [];
    this.eventEmitter = new EventEmitter();
  }

  version!: number;

  getEvents(): AggregateEvent[] {
    return this.events;
  }

  applyEvent(event: AggregateEvent): void {
    this.events = this.events.concat(event);
  }

  protected commit(event: AggregateEvent): void {
    this.eventEmitter.emit(event.constructor.name, event);
    this.events = this.events.filter((_) => _.eventId !== event.eventId);
  }
}
