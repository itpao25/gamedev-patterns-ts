// src/utils/ecs/component.h.ts
import {IUpdate, IAwake} from '@/utils';
import {Entity} from '@/utils';

export interface IComponent extends IAwake, IUpdate {
    Entity: Entity | null
}
