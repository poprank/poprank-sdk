import { Chain } from "./types/general";

export const API_BASE_URL = 'https://api.poprank.io';

export const marketplaceLinkPrefixes: Record<Chain, string> = {
    'ethereum': 'https://opensea.io/assets',
    'polygon': 'https://opensea.io/assets/matic',
    'solana': 'https://magiceden.io/item-details',
};
