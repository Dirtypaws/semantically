import { AggregateEvent } from './AggregateEvent';

export interface IEventHandler {
  handle(event: any): Promise<void>;
}

export abstract class EventHandler<TEvent extends AggregateEvent> implements IEventHandler {
  abstract handle(event: TEvent): Promise<void>;
}
