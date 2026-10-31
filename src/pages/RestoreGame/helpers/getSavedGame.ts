import { GAME_PREFIX } from 'config';
import { SavedGame } from '../../../types/savedGame';

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const isPlayer = (value: unknown): boolean => {
    if (!isRecord(value) || typeof value.name !== 'string') return false;
    if (!isRecord(value.rounds)) return false;
    return Object.values(value.rounds).every((points) => typeof points === 'number');
};

const isPair = (value: unknown): boolean =>
    Array.isArray(value) && value.length === 2 && value.every((name) => typeof name === 'string');

export const parseSavedGame = (rawValue: string | null): SavedGame | null => {
    if (rawValue === null) return null;

    try {
        const value: unknown = JSON.parse(rawValue);
        if (!isRecord(value)) return null;
        if (typeof value.version !== 'string' || typeof value.timestamp !== 'number') return null;
        if (!isRecord(value.game)) return null;

        const { players, activePair, roundsCount } = value.game;
        if (!Array.isArray(players) || !players.every(isPlayer)) return null;
        if (!isPair(activePair) || typeof roundsCount !== 'number') return null;

        return value as unknown as SavedGame;
    } catch {
        return null;
    }
};

export const getSavedGame = (name: string): SavedGame | null =>
    parseSavedGame(localStorage.getItem(`${GAME_PREFIX}_${name}`));
