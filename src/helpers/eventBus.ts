import EventEmitter from 'events';
const emitter: EventEmitter = new EventEmitter();

export function emitEvent(eventName: string) {
    emitter.emit(eventName);
}

export function registerEvent(eventName: string, callback: ((...args: any[]) => void)) {
    emitter.on(eventName, callback);
}

export function removeListeners() {
    emitter.removeAllListeners();
}