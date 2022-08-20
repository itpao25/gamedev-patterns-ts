import {Entity} from '@/utils';
import {Settings} from '@/settings';
import {Grid} from '@/grid';

export class Game extends Entity {

    // Il suo metodo di aggiornamento non prevede il deltaTime
    // Il motivo è perché il gioco è un'entità radice ed è lui che deve calcolare il deltaTime
    // Per fare ciò dobbiamo tenere traccia di quando Update è stato eseguito
    private _lastTimestamp = 0;

    // Array che contiene tutte le entità "figlio" (tutte le entità del game)
    private _entities: Entity[] = [];

    public get Entities(): Entity[] {
        return this._entities;
    }

    // Creo un metodo Awake per risvegliare il componente e fare faccio partire Update()
    public Awake(): void {
        super.Awake();

        // Aggiungo l'entità della griglia al gioco
        this._entities.push(new Grid());

        // sveglio tutte le altre entità del gioco (entità figli)
        for (const entity of this._entities) {
            entity.Awake();
        }

        // Aspetto il frame successivo per essere sicuro che tutti i componenti siano risvegliati
        window.requestAnimationFrame(() => {

            // set initial timestamp
            this._lastTimestamp = Date.now();

            // start update loop
            this.Update();
        });

        this.DirtyDraw();
    }

    // Game loop che aggiorna tutte le entità e i componenti del gioco
    public Update(): void {
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000;

        // aggiorno tutti i componenti dell'entità Game
        super.Update(deltaTime);

        // aggiorno tutte le altre entità del game (entità figli)
        for (const entity of this.Entities) {
            entity.Update(deltaTime);
        }

        // update the timestamp
        this._lastTimestamp = Date.now();

        // Creo il loop del gioco impostando il ciclo in ogni frame
        window.requestAnimationFrame(() => this.Update());
    }

    private DirtyDraw(): void {

        // Creo l'elemento canvas nel DOM
        const canvas = document.createElement('canvas');

        const canvasSize = (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset;
        canvas.setAttribute('width', canvasSize.toString());
        canvas.setAttribute('height', canvasSize.toString());
        document.body.appendChild(canvas);

        const size = Settings.grid.nodeSize;
        const offset = Settings.grid.nodeOffset;

        for (let y = 0; y < Settings.grid.dimension; y++) {
            for (let x = 0; x < Settings.grid.dimension; x++) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.beginPath();
                    ctx.fillStyle = Settings.grid.color;
                    ctx.rect((size + offset) * x, (size + offset) * y, size, size);
                    ctx.fill();
                }
            }
        }
    }
}
