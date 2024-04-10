import React from 'react';
import { TextInput, List, Button, Group, ActionIcon } from '@mantine/core';
import { IconArrowBigRightLine } from '@tabler/icons-react';
import { useNewGame } from './hooks/useNewGame';
import styles from './NewGame.module.css';

export const NewGame = () => {
    const { value, list, handleChangeValue, handleAdd, handleKeyDown, handleStart, isStartDisabled, inputRef } =
        useNewGame();

    return (
        <>
            <Group gap="2px" align="flex-end">
                <TextInput
                    ref={inputRef}
                    label="Имя игрока"
                    value={value}
                    w="80%"
                    onChange={handleChangeValue}
                    onKeyDown={handleKeyDown}
                />
                <ActionIcon variant="filled" color="teal" size="input-sm" onClick={handleAdd}>
                    <IconArrowBigRightLine stroke={1.5} size={36} />
                </ActionIcon>
            </Group>
            <List size="lg" mt={16}>
                {list.map((el) => (
                    <List.Item key={el}>{el}</List.Item>
                ))}
            </List>
            <Button
                variant="filled"
                color="teal"
                fullWidth
                h="40"
                mt={16}
                onClick={handleStart}
                disabled={isStartDisabled}
                className={styles.button}
            >
                Начать игру
            </Button>
        </>
    );
};
