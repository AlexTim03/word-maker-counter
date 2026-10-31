import { Player } from 'contexts/types';
import { PointsMatrix } from '../types';

export interface Winner {
    name: string;
    points: number;
}

export interface Winners {
    first?: Winner;
    second?: Winner;
    third?: Winner;
}

export const getWinners = (players: Player[], matrix: PointsMatrix): Winners => {
    const totalLine = matrix[matrix.length - 1] ?? [];

    const rankedPlayers = players
        .map((player, index) => {
            const value = totalLine[index + 1];
            return {
                name: player.name,
                points: typeof value === 'number' ? value : Number(value) || 0,
                index,
            };
        })
        .sort((a, b) => b.points - a.points || a.index - b.index);

    const winners: Winners = {};
    if (rankedPlayers[0]) winners.first = { name: rankedPlayers[0].name, points: rankedPlayers[0].points };
    if (rankedPlayers[1]) winners.second = { name: rankedPlayers[1].name, points: rankedPlayers[1].points };
    if (rankedPlayers[2]) winners.third = { name: rankedPlayers[2].name, points: rankedPlayers[2].points };

    return winners;
};
