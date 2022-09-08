import { Nft } from './types';

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
