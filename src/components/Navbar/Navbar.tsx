import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { IconHome2, IconDeviceFloppy, IconCalculator } from '@tabler/icons-react';

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

    return (
        <>
            <NavLink label="Главное меню" leftSection={<IconHome2 size="1rem" stroke={1.5} />} onClick={goToMainMenu} />
            <NavLink
                label="Подсчет очков"
                leftSection={<IconCalculator size="1rem" stroke={1.5} />}
                onClick={findWinner}
            />
            <NavLink
                label="Сохранить игру"
                leftSection={<IconDeviceFloppy size="1rem" stroke={1.5} />}
                onClick={saveGame}
            />
        </>
    );
};
