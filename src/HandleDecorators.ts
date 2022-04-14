export function Handles<T extends { name: string }>(event: T): ClassDecorator {
  return (target) => {
    target.prototype.__handles = event.name;
  };
}

export function Event<T extends { name: string }>(evt: T): ClassDecorator {
  return (target) => {
    target.prototype.__name = evt.name;
  };
}

export interface InternalEvent {
  __name: string;
}

export interface InternalEventHandler {
  __handles: string;
}
