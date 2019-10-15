import FibTimer from '../../helpers/timer';
import { registerEvent } from '../../helpers/eventBus';

jest.useFakeTimers();

describe('Timers', () => {
    let fibTimer: FibTimer = null;
    beforeEach(() => {
        jest.clearAllTimers();
        jest.useFakeTimers();
        fibTimer = new FibTimer(1, 'test');
    });
    it('SHOULD schedule a 1 second timer', () => {
        expect(fibTimer.timerState).toBe(0);
        fibTimer.resume();
        jest.runOnlyPendingTimers();
        expect(fibTimer.timerState).toBe(1);
    });
    it('SHOULD emit event 5 times within 5 seconds for 1 second timer', () => {
        const spy = jest.fn();
        expect(fibTimer.timerState).toBe(0);
        registerEvent('test', spy);
        expect(spy).toHaveBeenCalledTimes(0);
        fibTimer.resume();
        jest.advanceTimersByTime(5000);
        expect(fibTimer.timerState).toBe(1);
        expect(spy).toHaveBeenCalledTimes(5);
    });
    it('SHOULD pause the timer and not emit events', () => {
        const spy = jest.fn();
        registerEvent('test', spy);
        fibTimer.resume();
        jest.advanceTimersByTime(2000);
        expect(spy).toHaveBeenCalledTimes(2);
        fibTimer.halt();
        jest.advanceTimersByTime(10000);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fibTimer.timerState).toBe(2);
    });
    it('SHOULD pause then resume timer', () => {
        const spy = jest.fn();
        registerEvent('test', spy);
        fibTimer.resume();
        jest.advanceTimersByTime(2000);
        expect(spy).toHaveBeenCalledTimes(2);
        fibTimer.halt();
        jest.advanceTimersByTime(10000);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fibTimer.timerState).toBe(2);
        fibTimer.resume();
        expect(fibTimer.timerState).toBe(1);
        jest.advanceTimersByTime(2000);
        expect(spy).toHaveBeenCalledTimes(4);
    });

    it('SHOULD stop the timer and not emit events', () => {
        const spy = jest.fn();
        registerEvent('test', spy);
        fibTimer.resume();
        jest.advanceTimersByTime(2000);
        expect(spy).toHaveBeenCalledTimes(2);
        fibTimer.stop();
        jest.advanceTimersByTime(10000);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fibTimer.timerState).toBe(0);
    });
});