import React, { useState, useRef, useEffect } from 'react';
import { Button, NumberInput, ActionIcon, Group } from '@mantine/core';
import { IconArrowBigRightLine } from '@tabler/icons-react';
import { useActiveGameContext } from 'contexts/ActiveGameContext';
import { Point } from 'components/Point';
import { getTotal } from './helpers/getTotal';

export const ActiveGame = () => {
    const { activePair, roundsCount, nextMove, addPointsToPlayer } = useActiveGameContext();
    const [currentPlayer, nextPlayer] = activePair;
    const [value, setValue] = useState<number | string>('');
    const [points, setPoints] = useState<number[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const addPoints = () => {
        if (value && typeof value === 'number') {
            addPointsToPlayer(value);
            setPoints([...points, value]);
            setValue('');
            inputRef.current?.focus();
        }
    };

    const handleNext = () => {
        nextMove();
        setPoints([]);
        setValue('');
        inputRef.current?.focus();
    };

    return (
        <div>
            <Group justify="space-between">
                <div>Текущий игрок: {currentPlayer}</div>
                <div>Раунд #{roundsCount}</div>
            </Group>
            <Group gap="2px" mt={10}>
                <NumberInput
                    ref={inputRef}
                    value={value}
                    onChange={setValue}
                    placeholder="Введите количество очков"
                    w="80%"
                    allowDecimal={false}
                    allowNegative={false}
                    hideControls
                />
                <ActionIcon variant="filled" color="teal" size="input-sm" onClick={addPoints}>
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
            <div>Итого за раунд: {getTotal(points)}</div>
            <Button variant="filled" color="teal" fullWidth h="40" mt={120} onClick={handleNext}>
                Следующий игрок ({nextPlayer})
            </Button>
        </div>
    );
};
