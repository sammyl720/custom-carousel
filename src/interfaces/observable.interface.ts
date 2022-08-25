import { ISubscriber } from "./subscriber.interface";

interface IObservable {
  subscribe: (subscriber: ISubscriber) => void;

  unsubscribe: (subscriber: ISubscriber) => void;

  notifySubscribers: () => void;
}

export {
  IObservable
}