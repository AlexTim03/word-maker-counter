import React, { useState } from 'react';
import { Button, NumberInput, ActionIcon, Group } from '@mantine/core';
import { IconArrowBigRightLine } from '@tabler/icons-react';
import { useActiveGameContext } from 'contexts/ActiveGameContext';
import { Point } from 'components/Point';
//import styles from './ActiveGame.module.css';

export const ActiveGame = () => {
    const { activePair, roundsCount, nextMove } = useActiveGameContext();
    const [currentPlayer, nextPlayer] = activePair;
    const [value, setValue] = useState<number | string>(0);
    const [points, setPoints] = useState<number[]>([]);

    const addPoints = () => {
        if (value && typeof value === 'number') {
            setPoints([...points, value]);
            setValue(0);
        }
    };

    const handleNext = () => {
        setValue(0);
        setPoints([]);
        nextMove(total);
    };

    const total = points.reduce<number>((acc, point) => acc + point, 0);

    return (
        <div>
            <Group justify="space-between">
                <div>Текущий игрок: {currentPlayer}</div>
                <div>Раунд #{roundsCount}</div>
            </Group>
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
            <Group gap="1px" mt={10}>
                {points.map((point, index) =>
                    index === 0 ? (
                        <Point key={`${index}_${point}`} point={point} />
                    ) : (
                        <span key={`${index}_${point}`}>
                            <span>+</span>
                            <Point point={point} />
                        </span>
                    )
                )}
            </Group>
            <div>Итого за раунд: {total}</div>
            <Button variant="filled" color="teal" fullWidth h="40" mt={40} onClick={handleNext}>
                Следующий игрок ({nextPlayer})
            </Button>
        </div>
    );
};
