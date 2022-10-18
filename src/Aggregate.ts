import { EventEmitter } from 'events';
import { AggregateEvent } from './AggregateEvent';

interface IAggregate<TId> {
  id: TId;
  version: number;
  getEvents(): AggregateEvent[];
  getLastEvent(): AggregateEvent | undefined;
  applyEvent(event: AggregateEvent): void;
}

export interface InternalAggregate {
  commit(event: AggregateEvent): void;
}

export abstract class Aggregate<TId> implements IAggregate<TId> {
  private events: AggregateEvent[];
  eventEmitter: EventEmitter;

  constructor(public readonly id: TId) {
    this.events = [];
    this.eventEmitter = new EventEmitter();
  }

  version: number;

  getEvents(): AggregateEvent[] {
    return this.events;
  }

  getLastEvent(): AggregateEvent | undefined {
    return this.events.length ? this.events[this.events.length - 1] : undefined;
  }

  applyEvent(event: AggregateEvent): void {
    this.events.push(event);
  }

  protected commit(event: AggregateEvent): void {
    this.eventEmitter.emit(event.constructor.name, event);
    this.events = this.events.filter((_) => _.eventId !== event.eventId);
  }
}
