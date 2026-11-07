import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Button, TextInput } from '@mantine/core';
import { GAME_PREFIX, GAME_VERSION } from 'config';
import { useActiveGameContext } from 'contexts/ActiveGameContext';

export const SaveGame = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { players, activePair, roundsCount } = useActiveGameContext();
    const navigate = useNavigate();

    const handleSave = () => {
        const saveName = name.trim();
        if (!saveName) {
            setError('Введите имя сохранения.');
            return;
        }

        const key = `${GAME_PREFIX}_${saveName}`;
        const json = {
            version: GAME_VERSION,
            timestamp: Date.now(),
            game: {
                players,
                activePair,
                roundsCount,
            },
        };

        try {
            if (
                localStorage.getItem(key) &&
                !window.confirm('Сохранение с таким именем уже существует. Перезаписать?')
            ) {
                return;
            }
            localStorage.setItem(key, JSON.stringify(json));
            setName('');
            setError('');
            navigate('/');
        } catch {
            setError('Не удалось сохранить игру.');
        }
    };

    if (players.length === 0) {
        return <Alert color="yellow">Нет активной игры для сохранения.</Alert>;
    }

    return (
        <>
            <TextInput
                label="Введите имя для сохранения:"
                placeholder="Имя игры"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
            />
            {error && (
                <Alert color="red" mt={10}>
                    {error}
                </Alert>
            )}
            <Button variant="filled" color="teal" fullWidth h="40" mt={10} onClick={handleSave}>
                Сохранить
            </Button>
        </>
    );
};
