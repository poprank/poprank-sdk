import { Chain } from './general';
import { Trait, TraitBase, TraitInit } from './traits';

export const sortByTypes = ['aesthetic', 'price', 'rarityTraitSum', 'rarityJaccard'] as const;
export type SortBy = typeof sortByTypes[number];

/**
 * All the "external" components of an NFT, aka ones we don't define ourselves.
 * The "image_url" is external, as we get that from somewhere else (OS, moralis, etc),
 * whereas the "rating" is internal and is defined after initialisations
 */
export interface NftInit {
    readonly id: string;
    readonly imageUrl: string;
    readonly metadataUrl: string | null;
    readonly name: string;
    readonly collection: string;
    readonly address: string;
    readonly chain?: Chain;
    readonly marketplaceUrl?: string;
    /**
     * An `undefined` value indicates the owner is unnamed.
     * A `null` value indicates the server was unable to retrieve the owner.
     */
    readonly owner?: string | null;
    readonly ownerAddress?: string | null;
    readonly ownerProfileUrl?: string | null;
    readonly tokenSchema?: string | null;
    readonly price?: number;
    readonly animationUrl?: string | null;
}

/**
 * NFT schema as returned from tokenURI
 */
export interface NftFromContract {
    id: string;
    name: string;
    description: string;
    uri: string;
    image: string;
    image_url: string;
    animation_url?: string;
    attributes: { trait_type: string; value: string; }[];
    ipfs_image: string;
    google_image: string;
}

/**
 * Base NFT type, maps 1:1 to the rows in our database
 */
export interface NftBase extends NftInit {
    readonly rarityTraitSumRank: number;
    readonly rarityTraitSum: number;
    readonly rarityJaccardRank: number;
    readonly rarityJaccard: number;
    readonly fallbackUrl: string;
    readonly timesSeen: number;
    readonly timesWon: number;
    readonly timesDrawn: number;
    readonly rating: number;
    readonly aestheticRank: number;
    readonly aestheticRankReliability?: number;
}

/**
 * NFT type we'd return from our endpoints, having queried the Traits
 * table for the traits too.
 */
export interface Nft extends NftBase {
    readonly dbId: string;
    readonly traits: Trait[];
}

/**
 * NFT with initial traits, aka no rarity scores
 */
export interface NftWithInitialTraits extends NftInit {
    traits: TraitInit[];
}

/**
 * NFT after we've rated the rarity of each trait and NFT
 */
export interface NftWithRatedTraits extends NftInit {
    traits: TraitBase[];
    rarityTraitSum: number;
    rarityJaccard: number;
    rarityTraitSumRank: number;
    rarityJaccardRank: number;
}

/**
 * Pair of NFTs, used as the return for our /double endpoint
 * for head-to-head rounds
 */
export type Pair = [Nft, Nft];

/**
 * Options object to pass into `getNfts()`.
 */
export interface GetNftsOptions {
    readonly offset?: number;
    readonly count?: number;
    readonly asc?: boolean;
    readonly sortBy?: SortBy;
    readonly traitFilters: string[];
    readonly minAesthetic?: number;
    readonly maxAesthetic?: number;
    readonly minRarityTraitSum?: number;
    readonly maxRarityTraitSum?: number;
    readonly minPrice?: number;
    readonly maxPrice?: number;
    readonly name?: string;
    readonly user?: string;
    readonly onlyUserTokens?: boolean;
}

/**
 * Options object to pass into `getNft()`.
 */
export interface GetNftOptions {
    readonly price?: boolean;
    readonly rank?: boolean;
    readonly traits?: boolean;
}
