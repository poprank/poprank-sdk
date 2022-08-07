export type TraitCategory = 'Traits' | 'Meta' | 'None';
export type DisplayType = 'number' | null;

//TODO: Swap TraitBase and Init naming

export interface TraitInit {
    typeValue: string;
    value: string;
    category: TraitCategory;
    displayType: DisplayType;
}
/**
 * The shape of our traits before we insert them into the DB
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
 * Model for the rows we get back from the DB when querying for all the trait values in a collection
 */
export interface TraitWithCheapestFromDb extends TraitFromDb {
    collection: string;
    minPrice?: number;
    minPriceTokenId?: string;
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
 * Shape of a trait after we've transformed the DB model. Other than the
 * specific method which is repsonsible for querying the DB and transforming
 * the result, everywhere interacts with this model
 */
export interface Trait extends TraitWithCheapestFromDb {
    // Undefined if there's no NFT for sale w/ this trait value
    cheapest?: TraitOverviewNft & { price: number; };
}
