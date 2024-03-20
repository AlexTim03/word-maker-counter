import React, { useState } from 'react';
import { Button, NumberInput, ActionIcon, Group } from '@mantine/core';
import { IconArrowBigRightLine } from '@tabler/icons-react';
import { useActiveGameContext } from 'contexts/ActiveGameContext';
import styles from './ActiveGame.module.css';

export const ActiveGame = () => {
    const [value, setValue] = useState<number | string>(0);
    const [points, setPoints] = useState<number[]>([]);
    const { activePair } = useActiveGameContext();
    const [currentPlayer, nextPlayer] = activePair;

    const addPoints = () => {
        if (!value) {
            return;
        }
        setPoints([...points, value as number]);
        setValue(0);
    };

    return (
        <div>
            <div>Текущий игрок: {currentPlayer}</div>
            <Group gap="2px" mt={10}>
                <NumberInput
                    value={value}
                    onChange={setValue}
                    placeholder="Введите количество очков"
                    allowDecimal={false}
                    allowNegative={false}
                    hideControls
                />
                <ActionIcon variant="filled" color="teal" aria-label="Settings" size="input-sm" onClick={addPoints}>
                    <IconArrowBigRightLine stroke={1.5} size={36} />
                </ActionIcon>
            </Group>
            <div>{points.join(' + ')}</div>

            <Button variant="filled" color="teal" fullWidth h="40" className={styles.next}>
                Следующий игрок ({nextPlayer})
            </Button>
        </div>
    );
};
