import { GAME_PREFIX } from 'config';
import { getSavedGame } from './getSavedGame';

export const getSavedGames = (): string[] => {
    const games: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith(`${GAME_PREFIX}_`)) continue;

        const name = key.slice(GAME_PREFIX.length + 1);
        if (name && getSavedGame(name)) {
            games.push(name);
        }
    }
    return games;
};
