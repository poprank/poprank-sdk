import { Nft } from './types/nfts';

export const aestheticBaseAttributes: Pick<Nft, 'aestheticRank' | 'aestheticRankReliability' | 'rating' | 'timesDrawn' | 'timesSeen' | 'timesWon'> = {
    rating: 1200,
    aestheticRank: 1,
    timesDrawn: 0,
    timesSeen: 0,
    timesWon: 0,
    aestheticRankReliability: 0,
};
