import { MemoryRouter, Route, Routes } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ActiveGameContextProvider, useActiveGameContext } from 'contexts/ActiveGameContext';
import { NewGame } from './NewGame';

const GameProbe = () => {
    const { players, activePair, roundsCount } = useActiveGameContext();
    return <div data-testid="game-state">{[players.map(({ name }) => name).join(','), activePair.join('|'), roundsCount].join(' / ')}</div>;
};

const renderNewGame = () =>
    render(
        <MantineProvider>
            <ActiveGameContextProvider>
                <MemoryRouter initialEntries={['/new']}>
                    <Routes>
                        <Route path="/new" element={<NewGame />} />
                        <Route path="/game" element={<GameProbe />} />
                    </Routes>
                </MemoryRouter>
            </ActiveGameContextProvider>
        </MantineProvider>
    );

describe('NewGame', () => {
    it('не добавляет пустое имя из пробелов и запускает игру с валидными игроками', async () => {
        const user = userEvent.setup();
        renderNewGame();

        const input = screen.getByLabelText('Имя игрока');
        const startButton = screen.getByRole('button', { name: 'Начать игру' });

        await user.type(input, '   {Enter}');
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
        expect(startButton).toBeDisabled();

        await user.type(input, 'Аня{Enter}');
        await user.type(input, 'Боря{Enter}');

        expect(screen.getByText('Аня')).toBeInTheDocument();
        expect(screen.getByText('Боря')).toBeInTheDocument();
        expect(startButton).toBeEnabled();

        await user.click(startButton);

        expect(screen.getByTestId('game-state')).toHaveTextContent('Аня,Боря / Аня|Боря / 1');
    });
});
