import {Node, NodeDrawComponent} from '@/node';

describe('>>> Node', () => {
    let node: Node;

    beforeEach(() => {
        node = new Node();
    });

    it('should awake and update all Components', function () {
        const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, 'Awake');
        const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, 'Update');

        expect(spyDrawCompAwake).not.toBeCalled();
        expect(spyDrawCompUpdate).not.toBeCalled();
        
        node.Awake();
        expect(spyDrawCompAwake).toBeCalled();

        node.Update(12);
        expect(spyDrawCompUpdate).toBeCalled();
    });
});
