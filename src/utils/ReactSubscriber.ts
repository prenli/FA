type SubscribeFunctionType = () => void;

export class ReactSubscriber<TStorageState> {
  state: TStorageState;
  subscribeFunctions: SubscribeFunctionType[] = [];

  constructor(state: TStorageState) {
    this.state = state;
  }

  subscribe(subscribeFunction: SubscribeFunctionType) {
    this.subscribeFunctions.push(subscribeFunction);
    return this.subscribeFunctions.length - 1;
  }

  unsubscribe(index: number) {
    this.subscribeFunctions[index] = () => null;
  }

  updateState() {
    this.subscribeFunctions.forEach((fn) => fn());
  }

  get State() {
    return this.state;
  }
}
