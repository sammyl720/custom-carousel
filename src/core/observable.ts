import { IObservable } from "../interfaces/observable.interface";
import { ISubscriber } from "../interfaces/subscriber.interface";

export class observable implements IObservable {
  constructor(
    protected subscribers: ISubscriber[]
  ) {

  }

  subscribe(subscriber: ISubscriber) {
    if (!this.subscribers.find(s => s === subscriber)) {
      this.subscribers.push(subscriber)
    }
  }

  unsubscribe(subscriber: ISubscriber) {
    const indexOfSubscriber = this.subscribers.indexOf(subscriber);

    if (indexOfSubscriber != -1) {
      this.subscribers.splice(indexOfSubscriber, 1);
    }
  }

  notifySubscribers() {
    for (let subscriber of this.subscribers) {
      subscriber.update()
    }
  }
}