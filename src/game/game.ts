import {Entity} from '@/utils';

export class Game extends Entity {

    // Il suo metodo di aggiornamento non prevede il deltaTime
    // Il motivo è perché il gioco è un'entità radice ed è lui che deve calcolare il deltaTime
    // Per fare ciò dobbiamo tenere traccia di quando Update è stato eseguito
    private _lastTimestamp = 0;

    public Update(): void {
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000;

        // update all components
        super.Update(deltaTime);

        // update the timestamp
        this._lastTimestamp = Date.now();

        // Creo il loop del gioco
        window.requestAnimationFrame(() => this.Update());
    }
}
