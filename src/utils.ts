import { MAGICEDEN_BASE_COLLECTIONS_URL, MAGICEDEN_BASE_NFTS_URL, OPENSEA_BASE_COLLECTIONS_URL, OPENSEA_BASE_NFTS_URL } from './constants';
import { Nft } from './types';
import { ChainExplorerMap } from './types/explorers';
import { ChainMarketplaceMap } from './types/marketplaces';

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

/**
 * A mapping of all PopRank supported chains to all
 * of our supported marketplaces.
 *
 * The first marketplace under a chain is considered the default.
 */
export const chainMarketplaceMap: ChainMarketplaceMap = {
    ethereum: {
        opensea: {
            name: "OpenSea",
            nftUrlFormatter: (id: string, address?: string) => `${OPENSEA_BASE_NFTS_URL}/${address}/${id}`,
            collectionUrlFormatter: (address: string) => `${OPENSEA_BASE_COLLECTIONS_URL}/${address}`
        }
    },
    polygon: {
        opensea: {
            name: "OpenSea",
            nftUrlFormatter: (id: string, address?: string) => `${OPENSEA_BASE_NFTS_URL}/matic/${address}/${id}`,
            collectionUrlFormatter: (address: string) => `${OPENSEA_BASE_COLLECTIONS_URL}/${address}`
        }
    },
    solana: {
        magiceden: {
            name: "MagicEden",
            nftUrlFormatter: (id: string, _address?: string) => `${MAGICEDEN_BASE_NFTS_URL}/${id}`,
            collectionUrlFormatter: (address: string) => `${MAGICEDEN_BASE_COLLECTIONS_URL}/${address}`
        },
        opensea: {
            name: "OpenSea",
            nftUrlFormatter: (id: string, address?: string) => `${OPENSEA_BASE_NFTS_URL}/solana/${address}/${id}`,
            collectionUrlFormatter: (address: string) => `${OPENSEA_BASE_COLLECTIONS_URL}/${address}`
        }
    },
};

/**
 * Mapping of all PopRank supported block explorers, per-chain.
 *
 * The first explorer for a given chain is the default.
 */
export const chainExplorerMap: ChainExplorerMap = {
    ethereum: {
        etherscan: {
            name: "Etherscan",
            addressUrlFormatter: (address: string) => `https://etherscan.io/address/${address}`
        }
    },
    polygon: {
        polygonscan: {
            name: "PolygonScan",
            addressUrlFormatter: (address: string) => `https://polygonscan.io/address/${address}`
        }
    },
    solana: {
        solscan: {
            name: "Solscan",
            addressUrlFormatter: (address: string) => `https://solscan.io/account/${address}`
        }
    }
};
