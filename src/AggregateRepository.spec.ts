import { v4 as UUID } from 'uuid';
import { Aggregate } from './Aggregate';
import { EventHandler } from './AggregateEvent.Handler';
import { InternalEventHandler } from './HandleDecorators';
import {
  empty_guid,
  MockAggregate,
  MockCreatedEvent,
  MockCreatedHandler,
  MockRepository,
  MockUpdatedEvent,
  MockUpdatedHandler,
} from './Mocks';

describe('Aggregate Repository: ', () => {
  describe('Get', () => {
    it('should return null', async () => {
      const repository = new MockRepository([]);
      const result = await repository.get(empty_guid);
      expect(result).toBeNull();
    });

    it('should return a domain object', async () => {
      const repository = new MockRepository([]);
      const id = UUID();
      const result = await repository.get(id);

      expect(result).not.toBeNull();
      expect(result).toBeInstanceOf(MockAggregate);
      expect(result?.id).toBe(id);
    });
  });

  describe('Save', () => {
    it('should handle no handlers', async () => {
      const repository = new MockRepository([]);
      const event = new MockCreatedEvent(UUID(), UUID());
      const domain = new MockAggregate(UUID(), UUID());
      jest.spyOn(domain, 'getEvents').mockReturnValue([event]);
      await repository.save(domain);
      expect(domain.getEvents).toBeCalledTimes(1);
    });
    it('should handle a single event', async () => {
      const mockHandler1 = {
        handle: jest.fn().mockReturnValue(Promise.resolve()),
        __handles: MockCreatedEvent.name,
      };
      const mockHandler2 = {
        handle: jest.fn().mockReturnValue(Promise.resolve()),
        __handles: MockCreatedEvent.name,
      };
      const mockHandler3 = {
        handle: jest.fn().mockReturnValue(Promise.resolve()),
        __handles: MockUpdatedEvent.name,
      };

      const repository = new MockRepository([mockHandler1, mockHandler2, mockHandler3]);

      const domain = MockAggregate.snapshot(UUID(), UUID(), 1);
      jest.spyOn(domain, 'getEvents').mockReturnValue([new MockUpdatedEvent(UUID(), UUID(), 2)]);
      await repository.save(domain);

      expect(mockHandler1.handle).toBeCalledTimes(0);
      expect(mockHandler2.handle).toBeCalledTimes(0);
      expect(mockHandler3.handle).toBeCalledTimes(1);
    });

    it('should call multiple handlers', async () => {
      const event = new MockCreatedEvent(UUID(), UUID());
      const mockHandler1 = {
        handle: jest.fn().mockReturnValue(Promise.resolve()),
        __handles: MockCreatedEvent.name,
      };
      const mockHandler2 = {
        handle: jest.fn().mockReturnValue(Promise.resolve()),
        __handles: MockCreatedEvent.name,
      };
      const mockHandler3 = {
        handle: jest.fn().mockReturnValue(Promise.resolve()),
        __handles: MockUpdatedEvent.name,
      };

      const repository = new MockRepository([mockHandler1, mockHandler2, mockHandler3]);
      const domain = new MockAggregate(UUID(), UUID());
      jest.spyOn(domain, 'getEvents').mockReturnValue([event]);
      await repository.save(domain);

      expect(mockHandler1.handle).toBeCalledTimes(1);
      expect(mockHandler2.handle).toBeCalledTimes(1);
      expect(mockHandler3.handle).toBeCalledTimes(0);
    });
  });
});
