import { Pair, Player } from '../contexts/types';

export interface SavedGameState {
    players: Player[];
    activePair: Pair;
    roundsCount: number;
}

export interface SavedGame {
    version: string;
    timestamp: number;
    game: SavedGameState;
}
