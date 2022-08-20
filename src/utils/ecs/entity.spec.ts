import {Entity} from '@/utils'
import {IComponent} from '@/utils'

class E extends Entity {
}

class C1 implements IComponent {
    public Entity: E;

    public Update(deltaTime: number): void { /* */
    }

    public Awake(): void { /*...*/
    }

}

class C2 implements IComponent {
    public Entity: E;

    public Update(deltaTime: number): void { /* */
    }

    public Awake(): void { /*...*/
    }
}

class C3 implements IComponent {
    public Entity: E;

    public Update(deltaTime: number): void { /* */
    }

    public Awake(): void { /*...*/
    }
}

describe('>>> Entity', () => {

    let entity: E
    const c1 = new C1()
    const c2 = new C2()
    const c3 = new C3()

    beforeEach(() => {
        entity = new E()
    })

    it('should add, remove, get, and check components', () => {
        expect(entity.Components.length).toBe(0)
        entity.AddComponent(c1)
        entity.AddComponent(c2)
        entity.AddComponent(c3)

        expect(entity.Components.length).toBe(3)
        expect(entity.Components[0]).toBe(c1)
        expect(entity.Components[1]).toBe(c2)
        expect(entity.Components[2]).toBe(c3)

        entity.RemoveComponent(C2)

        expect(entity.Components.length).toBe(2)
        expect(entity.Components[0]).toBe(c1)
        expect(entity.Components[1]).toBe(c3)

        expect(entity.GetComponent(C1)).toBe(c1)
        expect(entity.GetComponent(C3)).toBe(c3)

        expect(entity.HasComponent(C1)).toBeTruthy()
        expect(entity.HasComponent(C3)).toBeTruthy()
    })

    // Componente non aggiunto nell'entità
    it('should throw error if component wasn\'t found', () => {
        expect(entity.HasComponent(C1)).toBeFalsy()
        expect(() => entity.GetComponent(C1)).toThrow()
    });

    it('should update all Components', () => {
        const spy1 = jest.spyOn(c1, 'Update');
        const spy2 = jest.spyOn(c2, 'Update');
        const spy3 = jest.spyOn(c3, 'Update');

        expect(spy1).not.toBeCalled();
        expect(spy2).not.toBeCalled();
        expect(spy3).not.toBeCalled();

        entity.AddComponent(c1);
        entity.AddComponent(c2);
        entity.AddComponent(c3);

        const deltaTime = 12;
        entity.Update(deltaTime);

        expect(spy1).toBeCalledWith(deltaTime);
        expect(spy2).toBeCalledWith(deltaTime);
        expect(spy3).toBeCalledWith(deltaTime);
    });

    it('should awake all Components', () => {
        const spy1 = jest.spyOn(c1, 'Awake');
        const spy2 = jest.spyOn(c2, 'Awake');
        const spy3 = jest.spyOn(c3, 'Awake');

        expect(spy1).not.toBeCalled();
        expect(spy2).not.toBeCalled();
        expect(spy3).not.toBeCalled();

        entity.AddComponent(c1);
        entity.AddComponent(c2);
        entity.AddComponent(c3);

        entity.Awake();

        expect(spy1).toBeCalled();
        expect(spy2).toBeCalled();
        expect(spy3).toBeCalled();
    });
});
