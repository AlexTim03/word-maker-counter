import { Player } from 'contexts/types';
import { PointsMatrix } from '../types';

interface Winner {
    name: string;
    points: number;
}

interface Winners {
    first: Winner;
    second: Winner;
    third?: Winner;
}

export const getWinners = (players: Player[], matrix: PointsMatrix): Winners => {
    const neededThirdWinner = players.length > 2;

    const totalLine = [...matrix[matrix.length - 1]];
    totalLine.shift();
    const points = totalLine.map((value) => Number(value)).sort((a, b) => b - a);
    const winners: Winners = {
        first: {
            points: points[0],
            name: players[totalLine.findIndex((value) => value === points[0])].name,
        },
        second: {
            points: points[1],
            name: players[totalLine.findIndex((value) => value === points[1])].name,
        },
    };

    if (neededThirdWinner) {
        winners.third = {
            points: points[2],
            name: players[totalLine.findIndex((value) => value === points[2])].name,
        };
    }

    return winners;
};
