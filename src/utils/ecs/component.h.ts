// src/utils/ecs/component.h.ts
import {IUpdate} from '@/utils/update.h';
import {Entity} from '@/utils';

export interface IComponent extends IUpdate {
    Entity: Entity | null
}
