import { v4 as UUID, validate } from 'uuid';
import { MockCreatedEvent } from './Mocks';

describe('Aggregate Events: ', () => {
  const event = new MockCreatedEvent(UUID(), UUID());
  it('should have an id', () => {
    expect(validate(event.eventId)).toBeTruthy();
  });

  it('should have a timestamp', () => {
    expect(event.recordedAt).toBeInstanceOf(Date);
  });

  it('should have a version of 1', () => {
    expect(event.version).toBe(1);
  });
});
