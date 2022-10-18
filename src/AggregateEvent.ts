import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

export interface IAggregateEvent {
  eventId: string;
  recordedAt: number;
}

export abstract class AggregateEvent implements IAggregateEvent {
  eventId: string;
  recordedAt: number;
  version: number;

  protected constructor(version: number) {
    this.eventId = uuid();
    this.recordedAt = DateTime.now().toUTC().toSeconds();
    this.version = version;
  }
}
