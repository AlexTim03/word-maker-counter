import { useEffect, useRef } from 'react';
import { MemoryRouter, useLocation } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { GAME_PREFIX, GAME_VERSION } from 'config';
import { ActiveGameContextProvider, useActiveGameContext } from 'contexts/ActiveGameContext';
import { SaveGame } from './SaveGame';

const GameSetup = () => {
    const { startGame } = useActiveGameContext();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            startGame(['Аня', 'Боря']);
            initialized.current = true;
        }
    }, [startGame]);

    return null;
};

const LocationProbe = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

const renderSaveGame = (withGame = true) =>
    render(
        <MantineProvider>
            <ActiveGameContextProvider>
                {withGame && <GameSetup />}
                <MemoryRouter initialEntries={['/save']}>
                    <SaveGame />
                    <LocationProbe />
                </MemoryRouter>
            </ActiveGameContextProvider>
        </MantineProvider>
    );

describe('SaveGame', () => {
    it('сохраняет активную игру под именем с обрезанными пробелами', async () => {
        const user = userEvent.setup();
        renderSaveGame();

        await user.type(screen.getByLabelText('Введите имя для сохранения:'), '  Финал  ');
        await user.click(screen.getByRole('button', { name: 'Сохранить' }));

        expect(screen.getByTestId('location')).toHaveTextContent('/');

        const savedGame = JSON.parse(localStorage.getItem(`${GAME_PREFIX}_Финал`) ?? '{}');
        expect(savedGame).toMatchObject({
            version: GAME_VERSION,
            game: {
                players: [
                    { name: 'Аня', rounds: {} },
                    { name: 'Боря', rounds: {} },
                ],
                activePair: ['Аня', 'Боря'],
                roundsCount: 1,
            },
        });
    });

    it('требует непустое имя сохранения', async () => {
        const user = userEvent.setup();
        renderSaveGame();

        await user.click(screen.getByRole('button', { name: 'Сохранить' }));

        expect(screen.getByText('Введите имя сохранения.')).toBeInTheDocument();
        expect(localStorage).toHaveLength(0);
    });

    it('не перезаписывает существующее сохранение без подтверждения', async () => {
        const user = userEvent.setup();
        const key = `${GAME_PREFIX}_Финал`;
        const existingSave = {
            version: GAME_VERSION,
            timestamp: 1,
            game: {
                players: [{ name: 'Старая игра', rounds: {} }],
                activePair: ['Старая игра', 'Старая игра'],
                roundsCount: 3,
            },
        };
        localStorage.setItem(key, JSON.stringify(existingSave));
        vi.spyOn(window, 'confirm').mockReturnValue(false);
        renderSaveGame();

        await user.type(screen.getByLabelText('Введите имя для сохранения:'), 'Финал');
        await user.click(screen.getByRole('button', { name: 'Сохранить' }));

        expect(JSON.parse(localStorage.getItem(key) ?? '{}')).toEqual(existingSave);
        expect(screen.getByTestId('location')).toHaveTextContent('/save');
    });

    it('сообщает об ошибке localStorage', async () => {
        const user = userEvent.setup();
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('quota');
        });
        renderSaveGame();

        await user.type(screen.getByLabelText('Введите имя для сохранения:'), 'Финал');
        await user.click(screen.getByRole('button', { name: 'Сохранить' }));

        expect(screen.getByText('Не удалось сохранить игру.')).toBeInTheDocument();
    });

    it('не сохраняет игру без активных игроков', () => {
        renderSaveGame(false);

        expect(screen.getByText('Нет активной игры для сохранения.')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Сохранить' })).not.toBeInTheDocument();
    });
});
