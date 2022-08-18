import axios from 'axios';
import { SERVER_IP } from '../constants';
import { APIResponse } from '../types/general';
import { Nft, SortBy } from '../types/nfts';

/** Get ranking data for numerous assets */
export const getNfts = async (
    offset: number,
    count: number,
    slug: string,
    asc?: boolean,
    sortBy?: SortBy,
    traitFilters: string[] = [],
    minAesthetic?: number,
    maxAesthetic?: number,
    minRarityTraitSum?: number,
    maxRarityTraitSum?: number,
    minPrice?: number,
    maxPrice?: number,
    name?: string,
    user?: string,
    onlyUserTokens?: boolean,
    serverUrl = SERVER_IP,
): Promise<Nft[]> => {
    try {
        const res = (await axios.get<APIResponse<Nft[]>>(`${serverUrl}/nfts/${slug}`, {
            params: {
                offset,
                count,
                asc,
                sortBy,
                // We only need to pass the id to the server, helps minimise the uri length as much as possible
                traitFilters,
                minAesthetic,
                maxAesthetic,
                minRarityTraitSum,
                maxRarityTraitSum,
                minPrice,
                maxPrice,
                name,
                user,
                onlyUserTokens,
            },
        })).data;

        if (!res.success) {
            throw 'Failed to get rankings';
        }

        return res.data as Nft[];
    } catch (e) {
        throw 'Failed to get rankings';
    }
};

/** Gets the ranking data for a single asset */
export const getNft = async (
    slug: string,
    id: string,
    showPrice?: boolean,
    showTraits?: boolean,
    hideRank?: boolean,
    user?: string,
    serverUrl = SERVER_IP,
): Promise<Nft> => {
    const res = (await axios.get(`${serverUrl}/nfts/${slug}/${id}`, {
        params: {
            showPrice,
            hideRank,
            showTraits,
            user,
        },
    })).data;

    if (!res.success) {
        throw res.data;
    }

    return res.data;
};
