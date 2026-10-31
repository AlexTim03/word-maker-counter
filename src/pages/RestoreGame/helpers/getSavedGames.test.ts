import { beforeEach, describe, expect, it } from 'vitest';
import { GAME_PREFIX } from 'config';
import { getSavedGames } from './getSavedGames';

const validSave = JSON.stringify({
    version: '1.0',
    timestamp: 123,
    game: {
        players: [{ name: 'Аня', rounds: { 1: 0 } }],
        activePair: ['Аня', 'Боря'],
        roundsCount: 1,
    },
});

describe('getSavedGames', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('возвращает только валидные сохранения с префиксом игры', () => {
        localStorage.setItem(`${GAME_PREFIX}_valid`, validSave);
        localStorage.setItem(`${GAME_PREFIX}_corrupted`, '{broken');
        localStorage.setItem(`${GAME_PREFIX}_wrong-shape`, JSON.stringify({ version: '1.0' }));
        localStorage.setItem('OTHER_game', validSave);
        localStorage.setItem(GAME_PREFIX, validSave);

        expect(getSavedGames()).toEqual(['valid']);
    });

    it('принимает сохранение с нулевыми очками', () => {
        localStorage.setItem(`${GAME_PREFIX}_zero-points`, validSave);

        expect(getSavedGames()).toEqual(['zero-points']);
    });
});
