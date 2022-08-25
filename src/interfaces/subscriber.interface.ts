interface ISubscriber {
  update: (...args: []) => void;
}

export {
  ISubscriber
}