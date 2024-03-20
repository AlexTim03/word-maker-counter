import { createContext, useContext, useState, ReactNode } from 'react';

type Pair = [string, string];

interface ActiveGameContextValue {
    startGame: (list: string[]) => void;
    activePair: Pair;
}

const ActiveGameContext = createContext<ActiveGameContextValue>({} as ActiveGameContextValue);

export const ActiveGameContextProvider = ({ children }: { children: ReactNode }) => {
    const [players, setPlayers] = useState<string[]>([]);
    //TODO: типипзация для массива ролвно из 2 элементов
    const [activePair, setActivePair] = useState<Pair>(['', '']);
    const [roundsCount, setRoundsCount] = useState<number>(0);

    const startGame = (list: string[]) => {
        setPlayers(list);
        setActivePair([list[0], list[1]]);
        setRoundsCount(1);
    };

    // eslint-disable-next-line react/react-in-jsx-scope
    return <ActiveGameContext.Provider value={{ startGame, activePair }}>{children}</ActiveGameContext.Provider>;
};

export const useActiveGameContext = () => useContext<ActiveGameContextValue>(ActiveGameContext);
