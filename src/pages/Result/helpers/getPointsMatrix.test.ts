import { describe, expect, it } from 'vitest';
import { Player } from 'contexts/types';
import { getPointsMatrix } from './getPointsMatrix';

const players: Player[] = [
    { name: 'Аня', rounds: { 1: 5, 2: 0 } },
    { name: 'Боря', rounds: { 1: 10 } },
];

describe('getPointsMatrix', () => {
    it('сохраняет нулевые очки и помечает пропущенный раунд', () => {
        expect(getPointsMatrix(players, 2)).toEqual([
            [1, 5, 10],
            [2, 0, '--'],
            ['Итого', 5, 10],
        ]);
    });

    it('возвращает итог для пустых раундов', () => {
        expect(getPointsMatrix([], 0)).toEqual([['Итого']]);
    });
});
