export type RoundDir = 'left' | 'right';
export type RoundPlatform = 'web' | 'discord';

/** Represents a FaceMash round played by one or more users */
export interface RoundConventional {
    readonly kind: 'conventional';
    readonly winnerId: string;
    readonly winnerDbId: string;
    readonly winnerCollection: string;
    readonly loserId: string;
    readonly loserDbId: string;
    readonly loserCollection: string;
    readonly draw?: boolean;
    readonly timestamp: Date;
    /** If played by a single user, the player's identification */
    readonly player?: string;
    readonly dir?: RoundDir;
    readonly platform: RoundPlatform;
}

export interface RoundWithUrls extends RoundConventional {
    readonly winnerUrl: string;
    readonly winnerName: string;
    readonly loserUrl: string;
    readonly loserName: string;
}
