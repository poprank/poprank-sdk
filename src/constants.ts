import { Chain, ChainTermLabel } from "./types";
import { ChainExplorerMap } from "./types/explorers";
import { ChainMarketplaceMap } from "./types/marketplaces";

export const API_BASE_URL = 'https://api.poprank.io';

export const OPENSEA_BASE_URL = 'https://opensea.io';
export const OPENSEA_BASE_COLLECTIONS_URL = OPENSEA_BASE_URL;
export const OPENSEA_BASE_NFTS_URL = `${OPENSEA_BASE_URL}/assets`;

export const MAGICEDEN_BASE_URL = 'https://magiceden.io';
export const MAGICEDEN_BASE_COLLECTIONS_URL = `${MAGICEDEN_BASE_URL}/marketplace`;
export const MAGICEDEN_BASE_NFTS_URL = `${MAGICEDEN_BASE_URL}/item-details`;

const evmLabels: ChainTermLabel = {
    collectionId: "Contract Address",
    tokenId: "Token ID",
};

/**
 * Labels for collection, token, and token standards per-chain.
 * eg: on EVM chains, we have a "Contract Address", but on Solana that's
 * referred to as an "On-chain Collection"
 */
export const CHAIN_TERM_LABELS: Record<Chain, ChainTermLabel> = {
    ethereum: evmLabels,
    polygon: evmLabels,
    solana: {
        collectionId: "On-chain Collection",
        tokenId: "Mint Account"
    }
};

/**
 * A mapping of all PopRank supported chains to all
 * of our supported marketplaces.
 *
 * The first marketplace under a chain is considered the default.
 */
export const CHAIN_MARKETLACE_MAP: ChainMarketplaceMap = {
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
export const CHAIN_EXPLORER_MAP: ChainExplorerMap = {
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
