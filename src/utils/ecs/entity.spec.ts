import {Entity} from './entity'
import {IComponent} from './component.h'

class E extends Entity {
}

class C1 implements IComponent {
    public Entity: E
}

class C2 implements IComponent {
    public Entity: E
}


class C3 implements IComponent {
    public Entity: E
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

    it('should throw error if component want\'t found', () => {
        expect(entity.HasComponent(C1)).toBeFalsy()
        expect(() => entity.GetComponent(C1)).toThrow()
    })
})
