import Fibonnaci from '../../helpers/fib';

describe('Fibonnaci', () => {
    let fib: Fibonnaci  = null;
    beforeAll(() => {
        fib = new Fibonnaci(1000);
    });
    it('SHOULD generate first number in Fibonnaci sequence', () => {
        const fibOne = new Fibonnaci(1);
        expect(fibOne.fibNumbersArray.length).toBe(1);
        expect(fibOne.fibNumbersArray[0]).toBe(BigInt('0'));
    });
    it('SHOULD generate first two number in Fibonnaci sequence', () => {
        const fibTwo = new Fibonnaci(2);
        expect(fibTwo.fibNumbersArray.length).toBe(2);
        expect(fibTwo.fibNumbersArray[1]).toBe(BigInt('1'));
    });
    it('SHOULD generate 1000 Fibonnaci sequence', () => {
        expect(fib.fibNumbersArray.length).toBe(1000);
        expect(fib.fibNumbersArray[2]).toBe(BigInt('1'));
    });
    it('SHOULD isFibonnaci(1) return true', () => {
        const res = fib.isFibonnaci(BigInt('1'));
        expect(res).toBeTruthy();
    });
    it('SHOULD isFibonnaci(4) return false', () => {
        const res = fib.isFibonnaci(BigInt('4'));
        expect(res).toBeFalsy();
    });
    it('SHOULD isFibonnaci(1000th term) return true', () => {
        const res = fib.isFibonnaci(BigInt('26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626'));
        expect(res).toBeTruthy();
    });
});