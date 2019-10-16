import Fibonnaci from './fib';
import Question, { IQuestion, QUESTION_TYPE } from './question';
import FibTimer, { TIMER_STATES } from './timer';
import { registerEvent } from './eventBus';
import validator from 'validator';

export default class CLI {
    inputtedNumbers: Map<BigInt, number>;
    fib: Fibonnaci;
    question: Question;
    eventListenerName: string;
    fibTimer: FibTimer;

    constructor() {
        this.eventListenerName = 'outputFrequency';
        this.fib = new Fibonnaci(1000);
        this.question = new Question();
        this.inputtedNumbers = new Map<BigInt, number>();
        registerEvent(this.eventListenerName, this.displayFrequency);
    }

    init = async () => {
        let canProceed = false;

        do {
            canProceed = await this.questionHandler(this.question.questionFrequency)
                .catch((error) => { console.log(error); return null; });
        }
        while (!canProceed);

        do {
            canProceed = await this.questionHandler(this.question.questionEnterFirst)
                .catch((error) => { console.log(error); return null; });
        }
        while (!canProceed);

        do {
            await this.questionHandler(this.question.questionEnterNext)
                .catch((error) => { console.log(error); return null; });
        }
        while (true);
    }

    keypress = async () => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        return new Promise(resolve => process.stdin.once('data', () => {
            process.stdin.setRawMode(false);
            resolve();
        }));
    };

    handleActions = async (input: string) => {
        let actionExecuted = false;
        switch (input.toLowerCase()) {
            case 'halt':
                if (this.fibTimer && this.fibTimer.timerState === TIMER_STATES.Running) {
                    console.log('>> timer halted');
                    this.fibTimer.halt();
                } else if (this.fibTimer && this.fibTimer.timerState === TIMER_STATES.Paused) {
                    console.log('>> timer already halted');
                } else {
                    console.log('>> no timer to halt');
                }
                actionExecuted = true;
                break;
            case 'resume':
                if (this.fibTimer && this.fibTimer.timerState === TIMER_STATES.Paused) {
                    console.log('>> timer resumed');
                    this.fibTimer.resume();
                } else if (this.fibTimer && this.fibTimer.timerState === TIMER_STATES.Running) {
                    console.log('>> timer already resumed');
                } else {
                    console.log('>> no timer to resume');
                }
                actionExecuted = true;
                break;
            case 'quit':
                this.question.rl.close();
                this.displayFrequency();
                console.log('>> Thanks for playing, press any key to exit.');
                if (this.fibTimer) {
                    this.fibTimer.stop();
                }
                await this.keypress().then(process.exit);
                break;
            default:
                break;
        }
        return actionExecuted;
    };

    handleFIB = (input: string) => {
        if (this.fib.isFibonnaci(BigInt(input))) {
            console.log('>> FIB');
        }
    };

    storeFrequency = (input: string) => {
        if (this.inputtedNumbers.has(BigInt(input))) {
            this.inputtedNumbers.set(BigInt(input), (this.inputtedNumbers.get(BigInt(input)) + 1));
        } else {
            this.inputtedNumbers.set(BigInt(input), 1);
        }
    };

    displayFrequency = () => {
        if (this.inputtedNumbers.size > 0) {
            const sortedInputtedNumbers = new Map([...this.inputtedNumbers.entries()].sort((a, b) => b[1] - a[1]));
            const frequencyStringArray = [];
            for (const [key, value] of sortedInputtedNumbers) {
                frequencyStringArray.push(key.toString() + ':' + value.toString());
            }
            console.log('\n>> ' + frequencyStringArray.join(', '));
        } else {
            console.log('\n>> No Numbers to output');
        }
    };

    questionHandler = async (questionType: IQuestion) => {
        const response = await this.question.promptQuestion(questionType.question)
            .catch((error) => { console.log(error); return null; });
        // Check input isn't one of our actions beforing int validation - halt, resume, quit
        const actionExecuted = await this.handleActions(response);
        if (validator.isInt(response)) {
            if (questionType.type === QUESTION_TYPE.question) {
                this.handleFIB(response);
                this.storeFrequency(response);
            } else if (questionType.type === QUESTION_TYPE.frequency) {
                this.fibTimer = new FibTimer(Number(response), this.eventListenerName);
                this.fibTimer.resume();
            }
            // Valid response received
            return true;
        } else {
            if (!actionExecuted) {
                console.log(questionType.error);
            }
             // Invalid response received
            return false;
        }
    };
}