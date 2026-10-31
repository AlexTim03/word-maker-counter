import { describe, expect, it } from 'vitest';
import { Player } from 'contexts/types';
import { getWinners } from './getWinners';

const players: Player[] = [
    { name: 'Аня', rounds: {} },
    { name: 'Боря', rounds: {} },
    { name: 'Вера', rounds: {} },
];

describe('getWinners', () => {
    it('выбирает разных игроков при ничьей', () => {
        const winners = getWinners(players, [['Итого', 10, 10, 5]]);

        expect(winners).toEqual({
            first: { name: 'Аня', points: 10 },
            second: { name: 'Боря', points: 10 },
            third: { name: 'Вера', points: 5 },
        });
    });

    it('не возвращает победителей без игроков', () => {
        expect(getWinners([], [['Итого']])).toEqual({});
    });

    it('возвращает только доступные места для одного игрока', () => {
        const winners = getWinners([players[0]], [['Итого', 7]]);

        expect(winners).toEqual({ first: { name: 'Аня', points: 7 } });
    });

    it('сохраняет исходный порядок при одинаковых очках', () => {
        const winners = getWinners(players, [['Итого', 3, 8, 8]]);

        expect(winners.first?.name).toBe('Боря');
        expect(winners.second?.name).toBe('Вера');
        expect(winners.third?.name).toBe('Аня');
    });
});
