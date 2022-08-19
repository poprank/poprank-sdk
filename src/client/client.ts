import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../constants';
import { APIResponse, CollectionWithSeen, Nft, SortBy } from '../types';

const handleResponse = <T>(response: APIResponse<T>) => {
    if (!response.success) {
        throw new Error(response.data);
    }

    return response.data;
};

export class PopRankClient {
    client: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            ...config,
        });
    }

    /**
     * Get all `Collection` objects. If `slug` is provided, then the collection
     * is updated on the server, before the response is sent. 
     * @summary Get all collections.
     * @param slug The collection identifier used in the PopRank collection page URL.
     * @param player A player's wallet address.
     */
    async getCollections(slug?: string, player?: string): Promise<CollectionWithSeen[]> {
        const response = (await axios.get<APIResponse<CollectionWithSeen[]>>(
            '/collections',
            { params: { slug, player } },
        )).data;

        return handleResponse(response);
    }

    /**
     * Get the `Collection` object that corresponds with the provided `slug`. The
     * collection is updated on PopRank's server before response, so this method
     * effectively doubles as a data refresh.
     * @summary Get a collection.
     * @param slug The collection identifier used in the PopRank collection page URL.
     */
    async getCollection(slug: string): Promise<CollectionWithSeen[]> {
        const response = (await this.client.get<APIResponse<CollectionWithSeen[]>>(
            `/collections/${slug}`,
            { params: { slug } },
        )).data;

        return handleResponse(response);
    }

    /**
     * Get ranking data for numerous assets.
     * @summary Get a collection's NFTs
     */
    async getNfts(
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
    ): Promise<Nft[]> {
        try {
            const response = (await axios.get<APIResponse<Nft[]>>(`/nfts/${slug}`, {
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

            return handleResponse(response);
        }
    }

    /**
     * Get the number of rounds played by `player` for a specific collection, identified by `slug`.
     * @summary Get number of rounds played by player for collection
     * @param slug The collection identifier used in the PopRank collection page URL.
     * @param player The player's wallet address.
     */
    async getRounds(slug: string, player: string): Promise<number> {
        const response = (await this.client.get<APIResponse<number>>(`/rounds/${slug}`, { params: { player, count: true } })).data;

        return handleResponse(response);
    }
}

const client = new PopRankClient();

/** EXAMPLE */

const fetchCollection = async () => {
    try {
        const numRounds = await client.getRounds('animetas', '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1');
        console.log(numRounds);
    } catch {
        console.error('yo');
    }
};

fetchCollection();
