// src/grid/grid.ts
import {Entity, Vector2D} from '@/utils';
import {Node} from '@/node';
import {Settings} from '@/settings';

export class Grid extends Entity {

    private _nodes: Node[] = [];

    public get Nodes(): Node[] {
        return this._nodes;
    }

    // Quando la griglia si sveglia devo svegliare anche tutti i nodi entità
    public Awake(): void {
        super.Awake();

        // Preparo i nodi della griglia
        this.InitNodes();
        
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

    // Inizializzo i nodi della griglia
    private InitNodes(): void {
        const size = Settings.grid.nodeSize;
        const offset = Settings.grid.nodeOffset;

        for (let y = 0; y < Settings.grid.dimension; y++) {
            for (let x = 0; x < Settings.grid.dimension; x++) {

                const start = new Vector2D(x * (size + offset), y * (size + offset));
                const end = new Vector2D(start.x + size, start.y + size);
                const index = new Vector2D(x, y);

                const node = new Node(start, end, index);
                this._nodes.push(node);
            }
        }
    }
}
