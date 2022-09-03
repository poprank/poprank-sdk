import { Chain } from "./types";

export const API_BASE_URL = 'https://api.poprank.io';

export const OPENSEA_BASE_URL = 'https://opensea.io';
export const OPENSEA_BASE_COLLECTIONS_URL = `${OPENSEA_BASE_URL}`;
export const OPENSEA_BASE_NFTS_URL = `${OPENSEA_BASE_URL}/assets`;

export const MAGICEDEN_BASE_URL = 'https://magiceden.io';
export const MAGICEDEN_BASE_COLLECTIONS_URL = 'https://magiceden.io';
export const MAGICEDEN_BASE_NFTS_URL = 'https://magiceden.io';

/** Holds the block explorer URL account/address lookup prefix for each chain */
export const blockExplorerDisplayNames: Record<Chain, string> = {
    ethereum: 'Etherscan',
    polygon: 'PolygonScan',
    solana: 'SolScan',
};