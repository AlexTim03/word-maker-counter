import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, Pair } from './types';
import { getNextPair } from './helpers/getNextPair';

interface ActiveGameContextValue {
    startGame: (list: string[]) => void;
    nextMove: (roundPoints: number) => void;
    activePair: Pair;
    roundsCount: number;
}

const ActiveGameContext = createContext<ActiveGameContextValue>({} as ActiveGameContextValue);

export const ActiveGameContextProvider = ({ children }: { children: ReactNode }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [firstPlayer, setFirstPlayer] = useState<string>('');
    const [activePair, setActivePair] = useState<Pair>(['', '']);
    const [roundsCount, setRoundsCount] = useState<number>(0);

    const startGame = (list: string[]) => {
        setPlayers(
            list.map(
                (name): Player => ({
                    name,
                    rounds: {},
                })
            )
        );
        setFirstPlayer(list[0]);
        setActivePair([list[0], list[1]]);
        setRoundsCount(1);
    };

    const nextMove = (roundPoints: number) => {
        const [currentPlayer, nextPlayer] = activePair;
        const player = players.find(({ name }) => name === currentPlayer);
        if (!player) return;

        const rounds = { ...player.rounds, [roundsCount.toString()]: roundPoints };
        const pair = getNextPair(nextPlayer, players);

        setPlayers([...players.filter(({ name }) => name !== currentPlayer), { ...player, rounds }]);
        setActivePair(pair);

        //Если по кругу дошли до 1 игрока - увеличиваем раунд
        pair[0] === firstPlayer && setRoundsCount(roundsCount + 1);
    };

    return (
        <ActiveGameContext.Provider value={{ startGame, nextMove, activePair, roundsCount }}>
            {children}
        </ActiveGameContext.Provider>
    );
};

export const useActiveGameContext = () => useContext<ActiveGameContextValue>(ActiveGameContext);
