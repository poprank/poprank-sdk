
export const marketplaceIdentifiers = ['opensea', 'magiceden'] as const;
export type MarketplaceIdentifier = typeof marketplaceIdentifiers[number];

export interface MarketplaceInfo {
    /**
     * Pretty name for marketplace, ie: "OpenSea"
     */
    name: string;
    /**
     * OpenSea for EVM chains has an `/address/id` structure,
     * whereas MagicEden for Solana only requires the NFT's ID
     * (it's mint address)
     */
    nftUrlFormatter: (address?: string, id?: string) => string;
    collectionUrlFormatter: (address: string) => string;
}

export type EthereumMarketplace = Record<'ethereum', Record<Extract<MarketplaceIdentifier, 'opensea'>, MarketplaceInfo>>;
export type PolygonMarketplace = Record<'polygon', Record<Extract<MarketplaceIdentifier, 'opensea'>, MarketplaceInfo>>;
export type SolanaMarketplace = Record<'solana', Record<Extract<MarketplaceIdentifier, 'magiceden'>, MarketplaceInfo>>;

/**
 * Map of all marketplace IDs to their associated info.
 */
export type MarketplaceMap =
    EthereumMarketplace & PolygonMarketplace & SolanaMarketplace;

// Record<Chain, Partial<Record<MarketplaceIdentifier, MarketplaceInfo>>>;
