// src/settings/settings.ts

// Uso Object.freeze() per trasformare l'oggetto in una constante non più modificabile
export const Settings = Object.freeze({
    grid: {
        dimension: 6,
        nodeSize: 100,
        nodeOffset: 10,
        color: 'rgba(245, 245, 245, 1)'
    }
});

