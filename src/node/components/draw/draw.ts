import { IComponent } from '@/utils';
import { Node } from '@/node';
import { Settings } from '@/settings';
import { CanvasLayer } from '@/canvas-layer';

export class NodeDrawComponent implements IComponent {
    public Entity: Node;

    public Awake(): void {
        this.Clear();
    }

    public Update(deltaTime: number): void {
        // A ogni update prima di renderizzare il nodo nel Canvas faccio il clear
        this.Clear();
        // renderizzo il nodo
        this.Draw();
    }

    public Draw(): void {
        CanvasLayer.Background.FillRect(
            this.Entity.Start,
            this.Entity.Size,
            Settings.grid.color
        );
    }

    private Clear(): void {
        CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.Size);
    }
}
