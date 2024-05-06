import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Stack } from '@mantine/core';
import { IconHome2, IconDeviceFloppy, IconCalculator, IconDatabaseImport } from '@tabler/icons-react';

interface NavbarProps {
    toggle: () => void;
}

export const Navbar = ({ toggle }: NavbarProps) => {
    const navigate = useNavigate();

    const goToMainMenu = () => {
        navigate('/');
        toggle();
    };

    const findWinner = () => {
        navigate('/result');
        toggle();
    };

    const saveGame = () => {
        navigate('/save');
        toggle();
    };

    const restoreGame = () => {
        navigate('/restore');
        toggle();
    };

    return (
        <Stack gap="lg">
            <NavLink label="Главное меню" leftSection={<IconHome2 size="2rem" stroke={1} />} onClick={goToMainMenu} />
            <NavLink
                label="Подсчет очков"
                leftSection={<IconCalculator size="2rem" stroke={1} />}
                onClick={findWinner}
            />
            <NavLink
                label="Сохранить игру"
                leftSection={<IconDeviceFloppy size="2rem" stroke={1} />}
                onClick={saveGame}
            />
            <NavLink
                label="Восстановить игру"
                leftSection={<IconDatabaseImport size="2rem" stroke={1} />}
                onClick={restoreGame}
            />
        </Stack>
    );
};
