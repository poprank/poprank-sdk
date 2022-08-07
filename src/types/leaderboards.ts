/**
 * Top collection played by a user, shown on the
 * all-up leaderboard
 */
export interface LeaderboardTopCollection {
    readonly collection: string;
    readonly played: number;
}

/**
 * User leaderboard stats for either a collection
 * or all-up, depending on the context
 */
export interface UserCollectionLeaderboard {
    readonly user: string;
    readonly played: number;
    readonly rank: number;
}

/**
 * All-up leaderboard row's data for a single user
 */
export interface UserLeaderboard extends UserCollectionLeaderboard {
    readonly topCollections: LeaderboardTopCollection[];
}

