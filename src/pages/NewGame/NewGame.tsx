import React, { useState, KeyboardEvent } from 'react';
import { TextInput } from '@mantine/core';
//+Lisi

export const NewGame = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<string[]>([]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            setList([...list, value]);
            setValue('');
        }
    };

    return (
        <>
            <TextInput
                label="Имя игрока"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
            />
            <ul>
                {list.map((el) => (
                    <li key={el}>{el}</li>
                ))}
            </ul>
        </>
    );
};
