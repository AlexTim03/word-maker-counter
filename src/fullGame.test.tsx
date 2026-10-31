import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { GAME_PREFIX } from 'config';
import { ActiveGameContextProvider } from 'contexts/ActiveGameContext';
import { ActiveGame } from 'pages/ActiveGame';
import { NewGame } from 'pages/NewGame';
import { RestoreGame } from 'pages/RestoreGame';
import { Result } from 'pages/Result';
import { SaveGame } from 'pages/SaveGame';

const NavigationProbe = () => {
    const navigate = useNavigate();
    return (
        <nav>
            <button onClick={() => navigate('/result')}>К результату</button>
            <button onClick={() => navigate('/save')}>К сохранению</button>
            <button onClick={() => navigate('/restore')}>К восстановлению</button>
        </nav>
    );
};

const LocationProbe = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

const renderFullGame = () =>
    render(
        <MantineProvider>
            <ActiveGameContextProvider>
                <MemoryRouter initialEntries={['/new']}>
                    <Routes>
                        <Route path="/" element={<div>Главное меню</div>} />
                        <Route path="/new" element={<NewGame />} />
                        <Route path="/game" element={<ActiveGame />} />
                        <Route path="/result" element={<Result />} />
                        <Route path="/save" element={<SaveGame />} />
                        <Route path="/restore" element={<RestoreGame />} />
                    </Routes>
                    <NavigationProbe />
                    <LocationProbe />
                </MemoryRouter>
            </ActiveGameContextProvider>
        </MantineProvider>
    );

describe('полный сценарий игры', () => {
    it('создаёт игру, считает очки, показывает результат, сохраняет и восстанавливает', async () => {
        const user = userEvent.setup();
        renderFullGame();

        const nameInput = screen.getByLabelText('Имя игрока');
        await user.type(nameInput, 'Аня{Enter}');
        await user.type(nameInput, 'Боря{Enter}');
        await user.click(screen.getByRole('button', { name: 'Начать игру' }));

        const pointsInput = screen.getByPlaceholderText('Введите количество очков');
        await user.type(pointsInput, '0');
        await user.click(screen.getByRole('button', { name: 'Добавить очки' }));
        expect(screen.getByText('Итого за раунд: 0')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /Следующий игрок/ }));
        await user.type(pointsInput, '5');
        await user.click(screen.getByRole('button', { name: 'Добавить очки' }));

        await user.click(screen.getByRole('button', { name: 'К результату' }));
        expect(screen.getByText('Боря, 5 оч.')).toBeInTheDocument();
        expect(within(screen.getByRole('table')).getAllByText('0').length).toBeGreaterThan(0);

        await user.click(screen.getByRole('button', { name: 'К сохранению' }));
        await user.type(screen.getByLabelText('Введите имя для сохранения:'), 'Финал');
        await user.click(screen.getByRole('button', { name: 'Сохранить' }));
        expect(localStorage.getItem(`${GAME_PREFIX}_Финал`)).toContain('Боря');

        await user.click(screen.getByRole('button', { name: 'К восстановлению' }));
        await user.click(screen.getByRole('button', { name: 'Финал' }));

        expect(screen.getByTestId('location')).toHaveTextContent('/game');
        expect(screen.getByText('Текущий игрок: Боря')).toBeInTheDocument();
        expect(screen.getByText('Раунд #1')).toBeInTheDocument();
    });
});
