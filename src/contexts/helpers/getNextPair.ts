import { Player, Pair } from '../types';

export const getNextPair = (currentPlayer: string, players: Player[]): Pair => {
    const currentIndex = players.findIndex(({ name }) => name === currentPlayer);
    if (currentIndex === -1) return ['unknown', 'unknown'];

    const nextIndex = currentIndex === players.length - 1 ? 0 : currentIndex + 1;
    return [currentPlayer, players[nextIndex].name];
};
