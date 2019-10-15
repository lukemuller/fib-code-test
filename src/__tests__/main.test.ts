import CLI from '../helpers/cli';

describe('Main', () => {
    it('SHOULD init cli successfully', () => {
        const cli = new CLI();
        expect(cli.eventListenerName).toBe('outputFrequency');
        expect(cli.fib.fibNumbersArray.length).toBe(1000);
    });
});