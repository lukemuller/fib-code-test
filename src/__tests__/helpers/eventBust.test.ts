import { emitEvent, registerEvent } from '../../helpers/eventBus';

describe('EventBus', () => {
    it('SHOULD invoke the callback once when emitted once', () => {
        const spy = jest.fn();
        registerEvent('test', spy);
        emitEvent('test');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('SHOULD invoke the callback twice when emitted twice', () => {
        const spy = jest.fn();
        registerEvent('test', spy);
        emitEvent('test');
        emitEvent('test');
        expect(spy).toHaveBeenCalledTimes(2);
    });
});
