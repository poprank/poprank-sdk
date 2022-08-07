import { Chain } from './general';
import { Trait } from './traits';

/**
 * Collection categories
 */
export type Category = 'avatar' | 'gaming' | 'gen-art';
/**
 * Type of collection, aka whether it lives on `poprank.io`
 * or prelaunch.poprank.io
 */
export type CollectionType = 'default' | 'prelaunch';
/**
 * All of a collection's traits grouped by trait_type
 */
export type GroupedTraits = Record<string, Trait[]>;

/**
 * Collection stats around how many NFTs have been in rounds
 */
export interface Exposure {
    totalItemsSeen: number;
    totalPercentSeen: number;
    totalItems: number;
}

export const collectionStates = ['not-enough'] as const;
/**
 * State of this collection's "aesthetic ranking reliability"
 */
export type CollectionState = typeof collectionStates[number];

/**
 * Base attributes for the collection
 */
export interface CollectionBase {
    readonly slug: string;
    readonly address: string;
    readonly profileUrl: string;
    readonly featureUrl: string;
    readonly name: string;
    readonly description: string;
}

/** Maps directly to `Collections` SQL relation */
export interface Collection extends CollectionBase {
    readonly size: number;
    readonly threshold: number;
    readonly active: boolean;
    /**
     * JSON string of all traits
     */
    readonly traits: GroupedTraits;

    /** Our database has a `featured:int` column, where it's either undefined (not featured),
    or the 1-indexed position of the feature. Aka `featured:1` means it's our main feature,
    2,3,4 are our secondary 3 */
    readonly featured: number;
    readonly timestamp: string;
    readonly sample_id: string;
    readonly chain: Chain[];
    /** JSON array of the categories, eg [""] */
    readonly categories: Category[];
    // Milliseconds since epoch for last update
    readonly lastUpdated: number;
    readonly collectionType: CollectionType;
    /**
     * Array of addresses that are allowed to see this collection.
     * A defined value here = this is a private collection
     */
    readonly privateAddresses?: string[];
    readonly floorPrice?: number;
}

export type CollectionWithSeen = Exposure & Collection;
export type CollectionWithSeenAndTotalRounds = CollectionWithSeen & { totalRounds: number; };
