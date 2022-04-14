import { EventHandler } from './AggregateEvent.Handler';
import { InternalEventHandler } from './HandleDecorators';
import { MockCreatedEvent, MockCreatedHandler } from './Mocks';

describe('Aggregate Event Handlers: ', () => {
  const handler = new MockCreatedHandler();

  it('should be created', () => {
    const sut = handler as EventHandler<MockCreatedEvent> & InternalEventHandler;

    expect(sut.__handles).toBe(MockCreatedEvent.name);
  });

  it('should be callable with an event', () => {
    expect(handler.handle).not.toThrow();
  });
});
