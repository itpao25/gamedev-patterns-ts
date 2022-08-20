// src/grid/grid.ts
import {Entity} from '@/utils';
import {Node} from '@/node';

export class Grid extends Entity {

    private _nodes: Node[] = [];

    public get Nodes(): Node[] {
        return this._nodes;
    }

    // Quando la griglia si sveglia devo svegliare anche tutti i nodi entità
    public Awake(): void {
        super.Awake();

        // Sveglio tutti i nodi della griglia
        for (const node of this._nodes) {
            node.Awake();
        }
    }

    // Quando la griglia si aggiorna, devo aggiornare anche tutti i nodi al suo interno
    public Update(deltaTime: number): void {
        super.Update(deltaTime);

        // Aggiorno tutti i nodi della griglia
        for (const node of this._nodes) {
            node.Update(deltaTime);
        }
    }
}
