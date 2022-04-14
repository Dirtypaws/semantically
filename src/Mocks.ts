import { Aggregate } from './Aggregate';
import { AggregateEvent } from './AggregateEvent';
import { EventHandler } from './AggregateEvent.Handler';
import { AggregateRepository } from './AggregateRepository';
import { Event, Handles } from './HandleDecorators';

@Event(MockCreatedEvent)
export class MockCreatedEvent extends AggregateEvent {
  constructor(readonly id: string, readonly name: string) {
    super(1);
  }
}

@Event(MockUpdatedEvent)
export class MockUpdatedEvent extends AggregateEvent {
  constructor(public readonly id: string, public readonly name: string, version: number) {
    super(version + 1);
  }
}

export class MockAggregate extends Aggregate<string> {
  private name!: string;

  constructor(id: string, name: string) {
    super(id);
    this.applyEvent(new MockCreatedEvent(id, name));

    this.eventEmitter.on(MockCreatedEvent.name, (_) => {
      this.name = _.name;
    });

    this.eventEmitter.on(MockUpdatedEvent.name, (_) => {
      this.name = _.name;
    });

    this.eventEmitter.on('snapshot', (_) => {
      this.name = _.name;
      this.version = _.version;
    });
  }

  updateName(name: string) {
    if (this.name !== name) {
      this.applyEvent(new MockUpdatedEvent(this.id, name, this.version));
    }
  }

  static snapshot(id: string, name: string, version: number): MockAggregate {
    const result = new MockAggregate(id, name);
    result.getEvents().forEach((_) => result.commit(_));
    result.eventEmitter.emit('snapshot', { id: id, name: name, version: version });
    return result;
  }
}

@Handles(MockCreatedEvent)
export class MockCreatedHandler extends EventHandler<MockCreatedEvent> {
  handle(event: MockCreatedEvent): Promise<void> {
    return Promise.resolve();
  }
}

@Handles(MockUpdatedHandler)
export class MockUpdatedHandler extends EventHandler<MockUpdatedEvent> {
  handle(event: MockUpdatedEvent): Promise<void> {
    return Promise.resolve();
  }
}

export class MockRepository extends AggregateRepository<string, MockAggregate> {
  get(id: string): Promise<MockAggregate | null> {
    if (id === empty_guid) return Promise.resolve(null);

    return Promise.resolve(MockAggregate.snapshot(id, 'test name', 3));
  }
}

export const empty_guid = '000000000-0000-0000-0000-000000000000';
