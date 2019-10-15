import { emitEvent } from './eventBus';

export enum TIMER_STATES {
    Idle = 0,
    Running = 1,
    Paused = 2
}

export default class FibTimer {

    private timerID: NodeJS.Timeout;
    private interval: number;
    private remaining: number;
    private lastTimeFired: Date;
    private state: TIMER_STATES = 0;
    private eventName: string = '';

    constructor(intervalSeconds: number, eventName: string) {
        this.interval = Math.floor(intervalSeconds * 1000);
        this.remaining = this.interval;
        this.eventName = eventName;
    }

    resume() {
        this.lastTimeFired = new Date();
        this.state = 1;
        this.timerID = setTimeout(() => {
            this.remaining = this.interval;
            emitEvent(this.eventName);
            this.resume();
        }, this.remaining);
    }

    halt() {
        clearTimeout(this.timerID);
        this.remaining -= new Date().valueOf() - this.lastTimeFired.valueOf();
        this.state = 2;
    }

    stop() {
        clearTimeout(this.timerID);
        this.state = 0;
    }

    get timerState(): TIMER_STATES {
        return this.state;
    }
}