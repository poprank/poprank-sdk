import { Chain, ChainIdentfierLabel } from "./types";

export const API_BASE_URL = 'https://api.poprank.io';

export const OPENSEA_BASE_URL = 'https://opensea.io';
export const OPENSEA_BASE_COLLECTIONS_URL = OPENSEA_BASE_URL;
export const OPENSEA_BASE_NFTS_URL = `${OPENSEA_BASE_URL}/assets`;

export const MAGICEDEN_BASE_URL = 'https://magiceden.io';
export const MAGICEDEN_BASE_COLLECTIONS_URL = `${MAGICEDEN_BASE_URL}/marketplace`;
export const MAGICEDEN_BASE_NFTS_URL = `${MAGICEDEN_BASE_URL}/item-details`;

const evmLabels: ChainIdentfierLabel = {
    collectionId: "Contract Address",
    tokenId: "Token ID",
};

/**
 * Labels for collection, token, and token standards per-chain.
 * eg: on EVM chains, we have a "Contract Address", but on Solana that's
 * referred to as an "On-chain Collection"
 */
export const chainIdentifierLabels: Record<Chain, ChainIdentfierLabel> = {
    ethereum: evmLabels,
    polygon: evmLabels,
    solana: {
        collectionId: "On-chain Collection",
        tokenId: "Mint Account"
    }
};