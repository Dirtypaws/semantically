import { InternalEvent, InternalEventHandler } from './HandleDecorators';
import { MockCreatedEvent, MockCreatedHandler } from './Mocks';

describe('Decorators: ', () => {
  describe('Handles: ', () => {
    const handler = new MockCreatedHandler();

    it('should have a __handles property', () => {
      const sut = handler as MockCreatedHandler & InternalEventHandler;
      expect(sut.__handles).toBe(MockCreatedEvent.name);
    });
  });

  describe('Event: ', () => {
    const handler = new MockCreatedEvent('', '');

    it('should have a __name property', () => {
      const sut = handler as MockCreatedEvent & InternalEvent;
      expect(sut.__name).toBe(MockCreatedEvent.name);
    });
  });
});
