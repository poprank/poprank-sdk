
export interface LeaderboardTopCollection {
    readonly collection: string;
    readonly played: number;
}

export interface UserCollectionLeaderboard {
    readonly user: string;
    readonly played: number;
    readonly rank: number;
}

export interface UserLeaderboard extends UserCollectionLeaderboard {
    readonly topCollections: LeaderboardTopCollection[];
}

