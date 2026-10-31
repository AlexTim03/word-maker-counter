import { useEffect, useRef } from 'react';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActiveGameContextProvider, useActiveGameContext } from 'contexts/ActiveGameContext';
import { SavedGameState } from 'types/savedGame';
import { Result } from './Result';

const RestoreState = ({ state }: { state: SavedGameState }) => {
    const { restoreGame } = useActiveGameContext();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            restoreGame(state);
            initialized.current = true;
        }
    }, [restoreGame, state]);

    return null;
};

const renderResult = (state?: SavedGameState) =>
    render(
        <MantineProvider>
            <ActiveGameContextProvider>
                {state && <RestoreState state={state} />}
                <Result />
            </ActiveGameContextProvider>
        </MantineProvider>
    );

describe('Result', () => {
    it('показывает разные места при ничьей', () => {
        renderResult({
            players: [
                { name: 'Аня', rounds: { 1: 10 } },
                { name: 'Боря', rounds: { 1: 10 } },
                { name: 'Вера', rounds: { 1: 5 } },
            ],
            activePair: ['Аня', 'Боря'],
            roundsCount: 1,
        });

        expect(screen.getByText('Аня, 10 оч.')).toBeInTheDocument();
        expect(screen.getByText('Боря, 10 оч.')).toBeInTheDocument();
        expect(screen.getByText('Вера, 5 оч.')).toBeInTheDocument();
    });

    it('не падает и показывает сообщение без активной игры', () => {
        renderResult();

        expect(screen.getByText('Нет данных для отображения результатов.')).toBeInTheDocument();
    });

    it('выводит нулевые очки в таблице', () => {
        renderResult({
            players: [
                { name: 'Аня', rounds: { 1: 0 } },
                { name: 'Боря', rounds: { 1: 3 } },
            ],
            activePair: ['Аня', 'Боря'],
            roundsCount: 1,
        });

        expect(screen.getAllByRole('cell', { name: '0' }).length).toBeGreaterThan(0);
        expect(screen.getByText('Боря, 3 оч.')).toBeInTheDocument();
    });
});
