import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from '@mantine/core';

export const MainMenu = () => {
    const navigate = useNavigate();
    const handleNew = () => navigate('/new');
    const handleRestore = () => navigate('/restore');

    return (
        <>
            <Button variant="filled" color="teal" fullWidth h="40" onClick={handleNew}>
                Новая игра
            </Button>
            <Space h="md" />
            <Button variant="filled" color="teal" fullWidth h="40" onClick={handleRestore}>
                Восстановить игру
            </Button>
        </>
    );
};
