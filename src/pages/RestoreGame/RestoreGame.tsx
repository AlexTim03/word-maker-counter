import React from 'react';
import { useNavigate } from 'react-router';
import { Button, List, Text } from '@mantine/core';
import { useActiveGameContext } from 'contexts/ActiveGameContext';
import { getSavedGames } from './helpers/getSavedGames';
import { getSavedGame } from './helpers/getSavedGame';

export const RestoreGame = () => {
    const navigate = useNavigate();
    const { restoreGame } = useActiveGameContext();
    const games = getSavedGames();

    const handleRestore = (name: string) => {
        const savedGame = getSavedGame(name);
        if (!savedGame) {
            alert('Сохранение повреждено или имеет неподдерживаемый формат.');
            return;
        }

        restoreGame(savedGame.game);
        navigate('/game');
    };

    if (games.length === 0) {
        return <Text>Сохранений не найдено.</Text>;
    }

    return (
        <List size="lg" mt={16}>
            {games.map((name) => (
                <List.Item key={name}>
                    <Button variant="subtle" onClick={() => handleRestore(name)}>
                        {name}
                    </Button>
                </List.Item>
            ))}
        </List>
    );
};
