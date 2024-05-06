import React from 'react';
import { List } from '@mantine/core';
import { getSavedGames } from './helpers/getSavedGames';

export const RestoreGame = () => {
    const games = getSavedGames();

    return (
        <List size="lg" mt={16}>
            {games.map((el) => (
                <List.Item key={el}>{el}</List.Item>
            ))}
        </List>
    );
};
