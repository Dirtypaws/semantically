import { v4 as uuid } from 'uuid';

export interface IAggregateEvent {
  eventId: string;
  recordedAt: Date;
}

export abstract class AggregateEvent implements IAggregateEvent {
  eventId: string;
  recordedAt: Date;
  version: number;

  protected constructor(version: number) {
    this.eventId = uuid();
    this.recordedAt = new Date();
    this.version = version;
  }
}
