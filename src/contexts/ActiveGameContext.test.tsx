import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActiveGameContextProvider, useActiveGameContext } from './ActiveGameContext';

const wrapper = ({ children }: { children: ReactNode }) => (
    <ActiveGameContextProvider>{children}</ActiveGameContextProvider>
);

const renderGameContext = () => renderHook(() => useActiveGameContext(), { wrapper });

describe('ActiveGameContext', () => {
    it('создаёт игру и переходит между игроками по кругу', () => {
        const { result } = renderGameContext();

        act(() => result.current.startGame(['Аня', 'Боря', 'Вера']));

        expect(result.current.players).toHaveLength(3);
        expect(result.current.firstPlayer).toBe('Аня');
        expect(result.current.activePair).toEqual(['Аня', 'Боря']);
        expect(result.current.roundsCount).toBe(1);

        act(() => result.current.nextMove());
        expect(result.current.activePair).toEqual(['Боря', 'Вера']);

        act(() => result.current.nextMove());
        expect(result.current.activePair).toEqual(['Вера', 'Аня']);

        act(() => result.current.nextMove());
        expect(result.current.activePair).toEqual(['Аня', 'Боря']);
        expect(result.current.roundsCount).toBe(2);
    });

    it('сохраняет нулевые и повторные очки активного игрока', () => {
        const { result } = renderGameContext();
        act(() => result.current.startGame(['Аня', 'Боря']));

        act(() => result.current.addPointsToPlayer(0));
        act(() => result.current.addPointsToPlayer(5));

        expect(result.current.players[0].rounds).toEqual({ 1: 5 });
    });

    it('восстанавливает состояние сохранённой игры', () => {
        const { result } = renderGameContext();
        const savedGame = {
            players: [
                { name: 'Аня', rounds: { 1: 10 } },
                { name: 'Боря', rounds: { 1: 0 } },
            ],
            activePair: ['Боря', 'Аня'] as [string, string],
            roundsCount: 2,
        };

        act(() => result.current.restoreGame(savedGame));

        expect(result.current.players).toEqual(savedGame.players);
        expect(result.current.firstPlayer).toBe('Аня');
        expect(result.current.activePair).toEqual(['Боря', 'Аня']);
        expect(result.current.roundsCount).toBe(2);
    });

    it('не создаёт игру меньше чем с двумя игроками', () => {
        const { result } = renderGameContext();

        act(() => result.current.startGame(['Аня']));

        expect(result.current.players).toEqual([]);
        expect(result.current.roundsCount).toBe(0);
    });

    it('запрещает использование контекста вне провайдера', () => {
        expect(() => renderHook(() => useActiveGameContext())).toThrow(
            'useActiveGameContext must be used within ActiveGameContextProvider'
        );
    });
});
