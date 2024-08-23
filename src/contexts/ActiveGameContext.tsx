import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, Pair } from './types';
import { getNextPair } from './helpers/getNextPair';

interface ActiveGameContextValue {
    players: Player[];
    firstPlayer: string;
    activePair: Pair;
    roundsCount: number;
    startGame: (list: string[]) => void;
    addPointsToPlayer: (roundPoints: number) => void;
    nextMove: () => void;
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

    const addPointsToPlayer = (addingPoints: number) => {
        const currentPlayerName = activePair[0];
        const player = players.find(({ name }) => name === currentPlayerName);
        if (!player) return;

        const round = roundsCount.toString();

        const allRounds = { ...player.rounds };
        if (!allRounds[round]) {
            allRounds[round] = 0;
        }
        allRounds[round] = allRounds[round] + addingPoints;

        const newPlayers = players.map<Player>(({ name, rounds }) => {
            if (name === currentPlayerName) {
                return { name, rounds: allRounds };
            }
            return { name, rounds: { ...rounds } };
        });
        setPlayers(newPlayers);
    };

    const nextMove = () => {
        const nextPlayerName = activePair[1];
        const pair = getNextPair(nextPlayerName, players);
        setActivePair(pair);

        //Если по кругу дошли до 1 игрока - увеличиваем раунд
        pair[0] === firstPlayer && setRoundsCount(roundsCount + 1);
    };

    return (
        <ActiveGameContext.Provider
            value={{ players, firstPlayer, activePair, roundsCount, startGame, addPointsToPlayer, nextMove }}
        >
            {children}
        </ActiveGameContext.Provider>
    );
};

export const useActiveGameContext = () => useContext<ActiveGameContextValue>(ActiveGameContext);
