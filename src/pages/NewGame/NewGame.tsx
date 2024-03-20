import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, List, Button, Space } from '@mantine/core';
import { useActiveGameContext } from 'contexts/ActiveGameContext';

export const NewGame = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<string[]>([]);
    const navigate = useNavigate();
    const { startGame } = useActiveGameContext();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            const trimValue = value.trim();
            if (list.find((el) => el === trimValue)) {
                alert('Неуникальное имя!');
                return;
            }
            setList([...list, trimValue]);
            setValue('');
        }
    };

    const handleStart = () => {
        if (list.length < 2) {
            //TODO сделать фокус
            alert('Не хватает игроков!');
            return;
        }
        startGame(list);
        navigate('/game');
    };

    return (
        <>
            <TextInput
                label="Имя игрока"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
            />
            <Space h="md" />
            <List size="lg">
                {list.map((el) => (
                    <List.Item key={el}>{el}</List.Item>
                ))}
            </List>
            <Space h="md" />
            <Button variant="filled" color="teal" fullWidth h="40" onClick={handleStart}>
                Начать игру
            </Button>
        </>
    );
};
