import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { GAME_PREFIX, GAME_VERSION } from 'config';
import { ActiveGameContextProvider, useActiveGameContext } from 'contexts/ActiveGameContext';
import { RestoreGame } from './RestoreGame';

const savedGame = {
    version: GAME_VERSION,
    timestamp: 123,
    game: {
        players: [
            { name: 'Аня', rounds: { 1: 10 } },
            { name: 'Боря', rounds: { 1: 0 } },
        ],
        activePair: ['Боря', 'Аня'],
        roundsCount: 2,
    },
};

const GameProbe = () => {
    const { players, activePair, roundsCount } = useActiveGameContext();
    return (
        <div data-testid="game-state">
            {players.map(({ name }) => name).join(',')} / {activePair.join('|')} / {roundsCount}
        </div>
    );
};

const LocationProbe = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

const renderRestoreGame = () =>
    render(
        <MantineProvider>
            <ActiveGameContextProvider>
                <MemoryRouter initialEntries={['/restore']}>
                    <Routes>
                        <Route path="/restore" element={<RestoreGame />} />
                        <Route path="/game" element={<GameProbe />} />
                    </Routes>
                    <LocationProbe />
                </MemoryRouter>
            </ActiveGameContextProvider>
        </MantineProvider>
    );

describe('RestoreGame', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('восстанавливает сохранение и переходит к игре', async () => {
        const user = userEvent.setup();
        localStorage.setItem(`${GAME_PREFIX}_Финал`, JSON.stringify(savedGame));
        renderRestoreGame();

        await user.click(screen.getByRole('button', { name: 'Финал' }));

        expect(screen.getByTestId('location')).toHaveTextContent('/game');
        expect(screen.getByTestId('game-state')).toHaveTextContent('Аня,Боря / Боря|Аня / 2');
    });

    it('скрывает повреждённые сохранения', () => {
        localStorage.setItem(`${GAME_PREFIX}_broken`, '{broken');
        renderRestoreGame();

        expect(screen.getByText('Сохранений не найдено.')).toBeInTheDocument();
    });
});
