import { createContext, ReactNode, useContext, useState } from 'react';
import { Player, Pair } from './types';
import { getNextPair } from './helpers/getNextPair';

export interface ActiveGameState {
    players: Player[];
    activePair: Pair;
    roundsCount: number;
}

interface ActiveGameContextValue extends ActiveGameState {
    firstPlayer: string;
    startGame: (list: string[]) => void;
    restoreGame: (game: ActiveGameState) => void;
    addPointsToPlayer: (roundPoints: number) => void;
    nextMove: () => void;
}

const ActiveGameContext = createContext<ActiveGameContextValue | undefined>(undefined);

export const ActiveGameContextProvider = ({ children }: { children: ReactNode }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [firstPlayer, setFirstPlayer] = useState<string>('');
    const [activePair, setActivePair] = useState<Pair>(['', '']);
    const [roundsCount, setRoundsCount] = useState<number>(0);

    const startGame = (list: string[]) => {
        if (list.length < 2) return;

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

    const restoreGame = (game: ActiveGameState) => {
        setPlayers(game.players.map(({ name, rounds }) => ({ name, rounds: { ...rounds } })));
        setFirstPlayer(game.players[0]?.name ?? '');
        setActivePair([...game.activePair]);
        setRoundsCount(game.roundsCount);
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
        if (players.length < 2) return;

        const nextPlayerName = activePair[1];
        const pair = getNextPair(nextPlayerName, players);
        setActivePair(pair);

        //Если по кругу дошли до 1 игрока - увеличиваем раунд
        if (pair[0] === firstPlayer) {
            setRoundsCount(roundsCount + 1);
        }
    };

    return (
        <ActiveGameContext.Provider
            value={{ players, firstPlayer, activePair, roundsCount, startGame, restoreGame, addPointsToPlayer, nextMove }}
        >
            {children}
        </ActiveGameContext.Provider>
    );
};

export const useActiveGameContext = (): ActiveGameContextValue => {
    const context = useContext(ActiveGameContext);
    if (!context) {
        throw new Error('useActiveGameContext must be used within ActiveGameContextProvider');
    }
    return context;
};
