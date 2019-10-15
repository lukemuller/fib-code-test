jest.mock('readline');
import readline from 'readline';
import Question from '../../helpers/question';

describe('Question Prompt', () => {
    beforeEach(() => {
        (readline.createInterface as jest.Mock).mockClear();
    });
    it('SHOULD return user input', async () => {
        (readline.createInterface as jest.Mock).mockReturnValue({
            question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb('20')),
            close: jest.fn().mockImplementationOnce(() => undefined)
        });
        const question = new Question();
        const res = await question.promptQuestion(question.questionFrequency.question);
        expect(res).toBe('20');
    });
});