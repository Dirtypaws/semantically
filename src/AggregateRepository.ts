import { Aggregate, InternalAggregate } from './Aggregate';
import { AggregateEvent } from './AggregateEvent';
import { EventHandler, IEventHandler } from './AggregateEvent.Handler';
import { InternalEvent, InternalEventHandler } from './HandleDecorators';

export abstract class AggregateRepository<TId, T extends Aggregate<TId>> {
  constructor(private readonly handlers: IEventHandler[]) {}

  async save(domain: Aggregate<TId>): Promise<void> {
    domain.getEvents().forEach((evt) => {
      this.handlers.forEach((h) => {
        const handler = h as EventHandler<typeof evt> & InternalEventHandler;
        if (handler.__handles === (evt as AggregateEvent & InternalEvent).__name) {
          handler.handle(evt);
        }
      });
      const d = domain as Aggregate<TId> & InternalAggregate;
      d.commit(evt);
    });
  }

  abstract get(id: TId): Promise<T | null>;
}
