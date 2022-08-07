/**
 * Category of the trait. "Meta" traits are custom traits
 * not returned from the tokenURI and don't affect
 * rarity, "None" traits are traits in the collection
 * that this NFT *doesn't* have
 */
export type TraitCategory = 'Traits' | 'Meta' | 'None';
/**
 * Display type for the trait. Most traits are strings
 * but some (like "Power Level") can be treated as numbers
 */
export type DisplayType = 'number' | null;

/**
 * Initial Trait shape, before we've calculated its rarity
 */
export interface TraitInit {
    typeValue: string;
    value: string;
    category: TraitCategory;
    displayType: DisplayType;
}
/**
 * The shape of our traits before we insert them into the DB
 * after we've calculated the rarity
 */
export interface TraitBase extends TraitInit {
    rarityTraitSum: number;
    traitCount: number;
}

/**
 * Base model for the rows we get back from the DB when querying for a trait
 */
export interface TraitFromDb extends TraitBase {
    id: string;
    traitTypeId: string;
}

/**
 * Model for the rows we get back from the DB when querying for all the trait values in a collection.
 * Contains info for the cheapest NFT in the collection with
 * this trait (null if none with this trait are for sale)
 */
export interface TraitWithCheapestFromDb extends TraitFromDb {
    collection: string;
    /**
     * Price of the cheapest NFT with this trait
     */
    minPrice?: number;
    /**
     * ID of the cheapest NFT with this trait
     */
    minPriceTokenId?: string;
    /**
     * Image URL of the cheapest NFT with this trait
     */
    minPriceImg?: string;
}

/**  The subset of an NFT we care about for the trait overview table */
export interface TraitOverviewNft {
    readonly id: string;
    readonly imageUrl: string;
    readonly collection: string;
    readonly price?: number;
}

/** A single trait's overview data */
export interface TraitOverview {
    readonly trait: Trait;
    readonly numForSale: number;
    readonly nftsWithTrait: TraitOverviewNft[];
}

/**
 * Shape of a trait after we've transformed the DB model.
 */
export interface Trait extends TraitWithCheapestFromDb {
    // Undefined if there's no NFT for sale w/ this trait value
    cheapest?: TraitOverviewNft & { price: number; };
}
