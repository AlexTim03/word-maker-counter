import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from '@mantine/core';
import { GAME_PREFIX, GAME_VERSION } from 'config';
import { useActiveGameContext } from 'contexts/ActiveGameContext';

export const SaveGame = () => {
    const [name, setName] = useState('');
    const { players, activePair, roundsCount } = useActiveGameContext();
    const navigate = useNavigate();

    const handleSave = () => {
        const json = {
            version: GAME_VERSION,
            timestamp: Date.now(),
            game: {
                players,
                activePair,
                roundsCount,
            },
        };
        localStorage.setItem(`${GAME_PREFIX}_${name.trim()}`, JSON.stringify(json));
        setName('');
        navigate('/');
    };

    return (
        <>
            <TextInput
                label="Введите имя для сохранения:"
                placeholder="Имя игры"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
            />
            <Button variant="filled" color="teal" fullWidth h="40" mt={10} onClick={handleSave}>
                Сохранить
            </Button>
        </>
    );
};
