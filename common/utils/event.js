class Event {
  constructor() {
    this.callbacks = new Map();
  }

  addEvent(event, callback) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    const callbacks = this.callbacks.get(event);
    callbacks.push(callback);
  }

  trigger(event, ...args) {
    if (!this.callbacks.get(event)) return;
    const callbacks = this.callbacks.get(event);
    callbacks.forEach((callback) => callback(...args));
  }
}

export default Event;
