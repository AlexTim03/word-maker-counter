export type Pair = [string, string];

export interface Player {
    name: string;
    rounds: Record<string, number>;
}
