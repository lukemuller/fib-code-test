import readline from 'readline';

export enum QUESTION_TYPE {
    frequency = 0,
    question = 1
}

export interface IQuestion {
    readonly question: string;
    readonly error: string;
    readonly type: QUESTION_TYPE;
}

export default class Question {
    public rl: readline.Interface = null;
    readonly questionFrequency: IQuestion;
    readonly questionEnterFirst: IQuestion;
    readonly questionEnterNext: IQuestion;
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        this.questionFrequency = {
            question: 'Please input the number of time in seconds between emitting numbers and their frequency',
            error: '>> Invalid frequency entered, please enter a whole number!',
            type: QUESTION_TYPE.frequency
        };
        this.questionEnterFirst = {
            question: 'Please enter the first number',
            error: '>> Invalid first number entered, please enter a whole number!',
            type: QUESTION_TYPE.question
        };
        this.questionEnterNext = {
            question: 'Please enter the next number',
            error: '>> Invalid next number entered, please enter a whole number!',
            type: QUESTION_TYPE.question
        };
    }

    promptQuestion = (question: string) => {
        return new Promise<string>((resolve) => {
            this.rl.question('>> ' + question + '\n', (userInput) => {
                resolve(userInput);
            });
        });
    };
}
