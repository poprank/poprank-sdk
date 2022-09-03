import { Chain } from './types';
import { Nft } from './types/nfts';

/**
 * Base aesthetic attributes for an NFT.
 * Used when we are transforming NFTs from their
 * tokenURI / API response into PopRank NFTs
 */
export const aestheticBaseAttributes: Pick<Nft, 'aestheticRank' | 'aestheticRankReliability' | 'rating' | 'timesDrawn' | 'timesSeen' | 'timesWon'> = {
    rating: 1200,
    aestheticRank: 1,
    timesDrawn: 0,
    timesSeen: 0,
    timesWon: 0,
    aestheticRankReliability: 0,
};

export const marketplaceNftLinkFormatters: Record<Chain, (identifier: string) => string> = {
    'ethereum': (identifier: string) => `https://opensea.io/assets/${identifier}`,
    'polygon': (identifier: string) => `https://opensea.io/assets/matic/${identifier}`,
    'solana': (identifier: string) => `https://magiceden.io/item-details/${identifier}`,
};

export const marketplaceCollectionLinkFormatters: Record<Chain, (identifier: string) => string> = {
    'ethereum': (identifier: string) => `https://opensea.io/${identifier}`,
    'polygon': (identifier: string) => `https://opensea.io/${identifier}`,
    'solana': (identifier: string) => `https://magiceden.io/${identifier}`,
};

/** Holds the block explorer URL account/address lookup prefix for each chain */
export const blockExplorerAddressLinkFormatters: Record<Chain, (identifier: string) => string> = {
    ethereum: (identifier: string) => `https://etherscan.io/address/${identifier}`,
    polygon: (identifier: string) => `https://polygonscan.com/address/${identifier}`,
    solana: (identifier: string) => `https://solscan.io/account/${identifier}`,
};
