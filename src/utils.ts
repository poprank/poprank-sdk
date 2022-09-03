import { MAGICEDEN_BASE_COLLECTIONS_URL, MAGICEDEN_BASE_NFTS_URL, OPENSEA_BASE_COLLECTIONS_URL, OPENSEA_BASE_NFTS_URL } from './constants';
import { Chain, Nft } from './types';
import { MarketplaceMap } from './types/marketplaces';

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

export const marketplaces: MarketplaceMap = {
    'ethereum': {
        'opensea': {
            name: "OpenSea",
            nftUrlFormatter: (address?: string, id?: string) => `${OPENSEA_BASE_NFTS_URL}/${address}/${id}`,
            collectionUrlFormatter: (address: string) => `${OPENSEA_BASE_COLLECTIONS_URL}/${address}`
        }
    },
    'polygon': {
        'opensea': {
            name: "OpenSea",
            nftUrlFormatter: (address?: string, id?: string) => `${OPENSEA_BASE_NFTS_URL}/matic/${address}/${id}`,
            collectionUrlFormatter: (address: string) => `${OPENSEA_BASE_COLLECTIONS_URL}/${address}`
        }
    },
    'solana': {
        'magiceden': {
            name: "MagicEden",
            nftUrlFormatter: (_address?: string, id?: string) => `${MAGICEDEN_BASE_NFTS_URL}/${id}`,
            collectionUrlFormatter: (address: string) => `${MAGICEDEN_BASE_COLLECTIONS_URL}/${address}`
        }
    },
};

/** Holds the block explorer URL account/address lookup prefix for each chain */
export const blockExplorerAddressLinkFormatters: Record<Chain, (identifier: string) => string> = {
    ethereum: (identifier: string) => `https://etherscan.io/address/${identifier}`,
    polygon: (identifier: string) => `https://polygonscan.com/address/${identifier}`,
    solana: (identifier: string) => `https://solscan.io/account/${identifier}`,
};
