import {Entity} from '@/utils';
import {NodeDrawComponent} from '@/node/components';

export class Node extends Entity {

    // Quando si risveglia aggiungo il componente NodeDrawComponent
    public Awake(): void {
        this.AddComponent(new NodeDrawComponent());
        
        super.Awake();
    }
}
