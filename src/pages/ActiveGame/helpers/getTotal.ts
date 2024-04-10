export const getTotal = (points: number[]): number => points.reduce<number>((acc, point) => acc + point, 0);
