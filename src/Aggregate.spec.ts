import { v4 as UUID } from 'uuid';
import { MockAggregate, MockCreatedEvent, MockUpdatedEvent } from './Mocks';

describe('Aggregate tests: ', () => {
  let domain: MockAggregate = new MockAggregate(UUID(), UUID());

  afterEach(() => {
    commitAll();
  });

  function commitAll(): void {
    const d = domain as MockAggregate & { commit(): void };
    d.getEvents().forEach((_) => d.commit(_));
  }

  it('should have a created event when created', () => {
    const expectedName = UUID();
    domain = new MockAggregate(UUID(), expectedName);

    const events = domain.getEvents();
    expect(events[0]).toBeInstanceOf(MockCreatedEvent);

    const lastEvent = events[0] as MockCreatedEvent;
    expect(lastEvent.id).toBe(domain.id);
    expect(lastEvent.name).toBe(expectedName);
    expect(lastEvent.version).toBe(1);
  });

  it('should have a name updated event ', () => {
    const expectedName = UUID();
    domain.updateName(expectedName);

    const events = domain.getEvents();
    expect(events[0]).toBeInstanceOf(MockUpdatedEvent);

    const lastEvent = events[0] as MockUpdatedEvent;
    expect(lastEvent.id).toBe(domain.id);
    expect(lastEvent.name).toBe(expectedName);
    expect(lastEvent.version).toBe(domain.version + 1);
  });

  it('and only update it once', () => {
    const expectedName = UUID();
    domain.updateName(expectedName);
    commitAll();

    domain.updateName(expectedName);
    domain.updateName(expectedName);
    domain.updateName(expectedName);

    expect(domain.getEvents().length).toBe(0);
  });
});
