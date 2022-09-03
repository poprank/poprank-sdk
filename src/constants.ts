import { Chain } from "./types";

export const API_BASE_URL = 'https://api.poprank.io';

/** Holds the block explorer URL account/address lookup prefix for each chain */
export const blockExplorerDisplayNames: Record<Chain, string> = {
    ethereum: 'Etherscan',
    polygon: 'PolygonScan',
    solana: 'SolScan',
};