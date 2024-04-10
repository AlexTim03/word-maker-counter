import { Player } from 'contexts/types';

type PointsMatrix = (number | string)[][];

export const getPointsMatrix = (players: Player[], roundsCount: number): PointsMatrix => {
    const matrix: PointsMatrix = [];

    for (let i = 1; i <= roundsCount; i++) {
        const innerLine: (number | string)[] = [i];
        players.forEach(({ rounds }) => {
            const points = rounds[i.toString()] || '--';
            innerLine.push(points);
        });
        matrix.push(innerLine);
    }

    const innerLine: (number | string)[] = ['Итого'];
    players.forEach(({ rounds }) => {
        const total = Object.values(rounds).reduce((acc, points) => acc + points, 0);
        innerLine.push(total);
    });
    matrix.push(innerLine);

    return matrix;
};
