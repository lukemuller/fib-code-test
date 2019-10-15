export default class Fibonnaci {
    private fibNumbers: bigint[] = [];
    constructor(sequenceTotal: number) {
        this.generateFibArray(sequenceTotal);
    }

    private generateFibArray = (n: number) => {
        if (n === 1) {
            this.fibNumbers = [BigInt(0)];
        } else if (n > 1) {
            this.fibNumbers = [BigInt(0), BigInt(1)];
        }
        if (n > 2) {
            for (let i = 2; i < n; i++) {
                this.fibNumbers.push(BigInt(this.fibNumbers[i - 2].toString()) + BigInt(this.fibNumbers[i - 1].toString()));
            }
        }
    }

    isFibonnaci = (n: bigint) => {
        return this.fibNumbers.indexOf(n) > -1;
    }

    get fibNumbersArray(): bigint[] {
        return this.fibNumbers;
    }
}

