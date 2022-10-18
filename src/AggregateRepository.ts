import { Aggregate, InternalAggregate } from './Aggregate';
import { AggregateEvent } from './AggregateEvent';
import { EventHandler, IEventHandler } from './AggregateEventHandler';

interface InternalEventHandler {
  __handles: string;
}

interface InternalEvent {
  __name: string;
}

export abstract class AggregateRepository<TId, T extends Aggregate<TId>> {
  private readonly handlers: IEventHandler[];

  constructor(handlers: IEventHandler[]) {
    this.handlers = handlers;
  }

  async save(domain: Aggregate<TId>): Promise<void> {
    for await (const evt of domain.getEvents()) {
      for await (const h of this.handlers) {
        const handler = h as EventHandler<typeof evt> & InternalEventHandler;
        if (handler?.__handles === (evt as AggregateEvent & InternalEvent).__name) {
          await handler?.handle(evt);
        }
      }
      const d = domain as Aggregate<TId> & InternalAggregate;
      d.commit(evt);
    }
  }

  abstract get(id: TId): Promise<T | undefined>;
}
