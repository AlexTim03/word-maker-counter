import { describe, expect, it } from 'vitest';
import { Player } from '../types';
import { getNextPair } from './getNextPair';

const players: Player[] = [
    { name: 'Аня', rounds: {} },
    { name: 'Боря', rounds: {} },
    { name: 'Вера', rounds: {} },
];

describe('getNextPair', () => {
    it('возвращает следующую пару игроков', () => {
        expect(getNextPair('Аня', players)).toEqual(['Аня', 'Боря']);
        expect(getNextPair('Боря', players)).toEqual(['Боря', 'Вера']);
    });

    it('переходит от последнего игрока к первому', () => {
        expect(getNextPair('Вера', players)).toEqual(['Вера', 'Аня']);
    });

    it('обрабатывает неизвестного игрока', () => {
        expect(getNextPair('Гриша', players)).toEqual(['unknown', 'unknown']);
    });
});
