import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveGameContext } from 'contexts/ActiveGameContext';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useNewGame = () => {
    const navigate = useNavigate();
    const { startGame } = useActiveGameContext();
    const [value, setValue] = useState('');
    const [list, setList] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && value) {
            addPlayer();
        }
    };

    const handleAdd = (): void => {
        if (value) {
            addPlayer();
        }
    };

    const addPlayer = (): void => {
        const trimValue = value.trim();
        if (list.find((el) => el === trimValue)) {
            alert('Неуникальное имя!');
            return;
        }
        setList([...list, trimValue]);
        setValue('');
        inputRef.current?.focus();
    };

    const handleStart = (): void => {
        if (list.length < 2) {
            alert('Не хватает игроков!');
            return;
        }
        startGame(list);
        navigate('/game');
    };

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => setValue(e.currentTarget.value);

    return {
        value,
        list,
        handleChangeValue,
        handleAdd,
        handleKeyDown,
        handleStart,
        isStartDisabled: list.length < 2,
        inputRef,
    };
};
