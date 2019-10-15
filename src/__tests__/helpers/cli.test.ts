jest.mock('readline');
import CLI from '../../helpers/cli';
import readline from 'readline';
import mockConsole from 'jest-mock-console';
import FibTimer from '../../helpers/timer';
import { removeListeners } from '../../helpers/eventBus';

describe('CLI', () => {
    afterEach(() => {
        removeListeners();
    });
    describe('Question Handler', () => {
        it('SHOULD return error if invalid input detected for frequency', async () => {
            mockConsole();
            (readline.createInterface as jest.Mock).mockReturnValue({
                question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('test')),
                close: jest.fn().mockImplementationOnce(() => undefined)
            });
            const cli = new CLI();
            await cli.questionHandler(cli.question.questionFrequency);
            expect(console.log).toHaveBeenCalledWith(cli.question.questionFrequency.error);
        });
        it('SHOULD return error if invalid input detected for first number', async () => {
            mockConsole();
            (readline.createInterface as jest.Mock).mockReturnValue({
                question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('test')),
                close: jest.fn().mockImplementationOnce(() => undefined)
            });
            const cli = new CLI();
            await cli.questionHandler(cli.question.questionEnterFirst);
            expect(console.log).toHaveBeenCalledWith(cli.question.questionEnterFirst.error);
        });
        it('SHOULD return true if valid frequency entered', async () => {
            (readline.createInterface as jest.Mock).mockReturnValue({
                question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('10')),
                close: jest.fn().mockImplementationOnce(() => undefined)
            });
            const cli = new CLI();
            const res = await cli.questionHandler(cli.question.questionFrequency);
            expect(res).toBeTruthy();
        });
        it('SHOULD start a timer if valid frequency entered', async () => {
            (readline.createInterface as jest.Mock).mockReturnValue({
                question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('10')),
                close: jest.fn().mockImplementationOnce(() => undefined)
            });
            const cli = new CLI();
            await cli.questionHandler(cli.question.questionFrequency);
            expect(cli.fibTimer.timerState).toBe(1);
        });
        it('SHOULD return >> FIB when 2 entered when requesting numbers', async () => {
            mockConsole();
            (readline.createInterface as jest.Mock).mockReturnValue({
                question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('2')),
                close: jest.fn().mockImplementationOnce(() => undefined)
            });
            const cli = new CLI();
            await cli.questionHandler(cli.question.questionEnterFirst);
            expect(console.log).toHaveBeenCalledWith('>> FIB');
        });
    });
    describe('Handle FIB', () => {
        it('SHOULD return >> FIB when 2 entered', () => {
            mockConsole();
            const cli = new CLI();
            cli.handleFIB('2');
            expect(console.log).toHaveBeenCalledWith('>> FIB');
        });
        it('SHOULD not log to console when 4 entered', () => {
            mockConsole();
            const cli = new CLI();
            cli.handleFIB('4');
            expect(console.log).toBeCalledTimes(0);
        });
    });
    describe('Store Frequency', () => {
        it('SHOULD store the frequency of numbers entered', () => {
            const cli = new CLI();
            cli.storeFrequency('10');
            cli.storeFrequency('10');
            cli.storeFrequency('1');
            expect(cli.inputtedNumbers.get(BigInt('10'))).toBe(2);
            expect(cli.inputtedNumbers.get(BigInt('1'))).toBe(1);
        });
    });
    describe('Display Frequency', () => {
        it('SHOULD display the frequency decscending', () => {
            mockConsole();
            const cli = new CLI();
            cli.displayFrequency();
            expect(console.log).toHaveBeenCalledWith('\n>> No Numbers to output');
            cli.storeFrequency('10');
            cli.storeFrequency('10');
            cli.storeFrequency('1');
            cli.displayFrequency();
            expect(console.log).toHaveBeenCalledWith('\n>> 10:2, 1:1');
        });
    });
    describe('Handle Actions', () => {
        it('SHOULD halt timer and display timer halted', async () => {
            mockConsole();
            const cli = new CLI();
            cli.fibTimer = new FibTimer(Number(1), 'test');
            cli.fibTimer.resume();
            const res = await cli.handleActions('halt');
            expect(console.log).toHaveBeenCalledWith('>> timer halted');
            expect(cli.fibTimer.timerState).toBe(2);
            expect(res).toBeTruthy();
        });
        it('SHOULD resume timer and display timer resumed', async () => {
            mockConsole();
            const cli = new CLI();
            cli.fibTimer = new FibTimer(Number(1), 'test');
            cli.fibTimer.resume();
            expect(cli.fibTimer.timerState).toBe(1);
            cli.fibTimer.halt();
            expect(cli.fibTimer.timerState).toBe(2);
            const res = await cli.handleActions('resume');
            expect(console.log).toHaveBeenCalledWith('>> timer resumed');
            expect(cli.fibTimer.timerState).toBe(1);
            expect(res).toBeTruthy();
        });
        it('SHOULD return timer check messages', async () => {
            mockConsole();
            const cli = new CLI();
            await cli.handleActions('resume');
            expect(console.log).toHaveBeenCalledWith('>> no timer to resume');
            await cli.handleActions('halt');
            expect(console.log).toHaveBeenCalledWith('>> no timer to halt');
            cli.fibTimer = new FibTimer(Number(1), 'test');
            cli.fibTimer.resume();
            await cli.handleActions('resume');
            expect(console.log).toHaveBeenCalledWith('>> timer already resumed');
            cli.fibTimer.halt();
            await cli.handleActions('halt');
            expect(console.log).toHaveBeenCalledWith('>> timer already halted');
        });
        it('SHOULD return timer check messages', async () => {
            mockConsole();
            const cli = new CLI();
            await cli.handleActions('resume');
            expect(console.log).toHaveBeenCalledWith('>> no timer to resume');
            await cli.handleActions('halt');
            expect(console.log).toHaveBeenCalledWith('>> no timer to halt');
            cli.fibTimer = new FibTimer(Number(1), 'test');
            cli.fibTimer.resume();
            await cli.handleActions('resume');
            expect(console.log).toHaveBeenCalledWith('>> timer already resumed');
            cli.fibTimer.halt();
            await cli.handleActions('halt');
            expect(console.log).toHaveBeenCalledWith('>> timer already halted');
        });
    });
});