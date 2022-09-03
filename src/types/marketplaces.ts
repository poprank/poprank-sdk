import { Chain } from "./general";

export const marketplaceIdentifiers = ['opensea', 'magiceden'] as const;
export type MarketplaceIdentifier = typeof marketplaceIdentifiers[number];

export interface MarketplaceInfo {
    /**
     * Display name for marketplace, ie: "OpenSea"
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

// ======= Chain-specific marketplace types ======= //
type ChainMarketplace<C extends Chain, M extends MarketplaceIdentifier> = Record<C, Record<M, MarketplaceInfo>>;

export type EthereumMarketplace = ChainMarketplace<'ethereum', 'opensea'>;
export type PolygonMarketplace = ChainMarketplace<'polygon', 'opensea'>;
export type SolanaMarketplace = ChainMarketplace<'solana', 'magiceden' | 'opensea'>;

/**
 * Map of chain to all its marketplaces' info.
 */
export type ChainMarketplaceMap =
    EthereumMarketplace & PolygonMarketplace & SolanaMarketplace;
