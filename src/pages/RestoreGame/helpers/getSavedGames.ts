import { GAME_PREFIX } from 'config';

export const getSavedGames = (): string[] => {
    const games: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(GAME_PREFIX)) {
            games.push(key.slice(GAME_PREFIX.length + 1));
        }
    }
    return games;
};
