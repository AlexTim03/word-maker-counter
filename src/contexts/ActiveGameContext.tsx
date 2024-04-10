import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, Pair } from './types';
import { getNextPair } from './helpers/getNextPair';

interface ActiveGameContextValue {
    players: Player[];
    firstPlayer: string;
    activePair: Pair;
    roundsCount: number;
    startGame: (list: string[]) => void;
    nextMove: (roundPoints: number) => void;
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
        const [currentPlayerName, nextPlayerName] = activePair;
        const player = players.find(({ name }) => name === currentPlayerName);
        if (!player) return;

        const currentRoundsPoints = { ...player.rounds, [roundsCount.toString()]: roundPoints };

        const newPlayers = players.map<Player>(({ name, rounds }) => {
            if (name === currentPlayerName) {
                return { name, rounds: currentRoundsPoints };
            }
            return { name, rounds: { ...rounds } };
        });
        setPlayers(newPlayers);

        const pair = getNextPair(nextPlayerName, players);
        setActivePair(pair);

        //Если по кругу дошли до 1 игрока - увеличиваем раунд
        pair[0] === firstPlayer && setRoundsCount(roundsCount + 1);
    };

    return (
        <ActiveGameContext.Provider value={{ players, firstPlayer, activePair, roundsCount, startGame, nextMove }}>
            {children}
        </ActiveGameContext.Provider>
    );
};

export const useActiveGameContext = () => useContext<ActiveGameContextValue>(ActiveGameContext);
