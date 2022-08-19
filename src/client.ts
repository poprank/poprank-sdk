import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './constants';
import { APIResponse, CollectionWithSeen, Nft, Pair, RoundDir, RoundWithUrls, SortBy, TraitOverview, UserLeaderboard } from './types';

/** If successful, returns `data`. Otherwise, throws an error. */
const handleResponse = <T>(response: APIResponse<T>) => {
    if (!response.success) {
        throw new Error(response.data);
    }

    return response.data;
};

/** The PopRank API client. */
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
     * Get the specified collection's Overview tab data.
     * @summary Get collection overview.
     * @param slug The collection identifier used in the PopRank collection page URL.
     */
    async getCollectionOverview(slug: string) {
        const response = (await axios.get<APIResponse<Record<string, TraitOverview[]>>>(
            '/collection/overview',
            { params: { slug } },
        )).data;

        handleResponse(response);
    }

    /**
     * Get the number of unique owners for `slug`.
     * @summary Get number of unique owners.
     * @param slug The collection identifier used in the PopRank collection page URL.
     */
    async getNumOwners(slug: string) {
        const response = (await axios.get<APIResponse<number>>(
            '/collection/owners',
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

    /**
     * Gets the ranking data for a single asset.
     * @summary Get an NFT.
     * @param slug The collection identifier used in the PopRank collection page URL.
     * @param id The NFT's token ID
     */
    async getNft(
        slug: string,
        id: string,
        showPrice?: boolean,
        showTraits?: boolean,
        hideRank?: boolean,
    ): Promise<Nft> {
        const response = (await axios.get(`/nfts/${slug}/${id}`, {
            params: {
                showPrice,
                hideRank,
                showTraits,
            },
        })).data;

        return handleResponse(response);
    }

    /**
     * Gets a random pair of NFTs to rank.
     * @summary Get NFT pair.
     * @param slug The collection identifier used in the PopRank collection page URL.
     */
    async getPair(slug: string, player?: string): Promise<Pair> {
        const response = (await axios.get<APIResponse<Pair>>(
            `/nfts/${slug}/double`,
            { params: { player } },
        )).data;

        return handleResponse(response);
    }

    /**
     * Get the total number of rounds played (valid and invalid).
     * @summary Get global rounds.
     */
    async getGlobalRounds(): Promise<number | null> {
        const response = (await axios.get<APIResponse<number | null>>(
            '/rounds',
            { params: { count: true } })
        ).data;

        return handleResponse(response);
    }

    /**
     * Get the number of rounds played by `player` for a specific collection, identified by `slug`.
     * @summary Get collection rounds.
     * @param slug The collection identifier used in the PopRank collection page URL.
     * @param player The player's wallet address.
     */
    async getCollectionRounds(slug: string, player: string): Promise<number> {
        const response = (await this.client.get<APIResponse<number>>(
            `/rounds/${slug}`,
            { params: { player, count: true } })
        ).data;

        return handleResponse(response);
    }

    /**
     * Get up to last 5 rounds for an NFT.
     * @summary Get NFT rounds.
     * @param slug The collection identifier used in the PopRank collection page URL.
     * @param id The NFT's token ID.
     */
    async getNftRounds(slug: string, id: string): Promise<RoundWithUrls[]> {
        const response = (await axios.get<APIResponse<RoundWithUrls[]>>(
            `/rounds/${slug}/${id}`,
        )).data;

        return handleResponse(response);
    }

    /**
     * Send HTTP PUT request containing the round's `winner` and `loser`.
     * @summary Send ranking game result.
     * @param winner The winning NFT contestant
     * @param loser The losing NFT contestant
     * @param player The player's wallet address
     * @param dir The direction selected by the player
     */
    async postRound(winner: Nft, loser: Nft, player?: string, dir?: RoundDir): Promise<void> {
        const response = (await axios.post(
            '/rounds',
            { winner, loser, player, dir },
        )).data;

        return handleResponse(response);
    }

    /**
     * Get the top global player leaderboard.
     * @summary Get global player leaderboard.
     * @param playerAddresses If not already in the top limit players, include the player at the end.
     * @param limit Limits the number of players returned in the response. Must be between 1-200, inclusive. Defaults to 50.
     */
    async getGlobalPlayerLeaderboard(playerAddresses?: string, limit?: number): Promise<UserLeaderboard[]> {
        const response = (await axios.get<APIResponse<UserLeaderboard[]>>(
            '/leaderboard/player',
            { params: { playerAddresses, limit } },
        )).data;

        return handleResponse(response);
    }

    /**
     * Get the top player leaderboard for a collection.
     * @summary Get collection player leaderboard.
     * @param slug collection identifier used in the PopRank collection page URL.
     * @param playerAddresses If not already in the top limit players, include the player at the end.
     * @param limit Limits the number of players returned in the response. Must be between 1-200, inclusive. Defaults to 50.
     */
    async getCollectionPlayerLeaderboard(slug: string, playerAddresses?: string, limit?: number): Promise<UserLeaderboard[]> {
        const response = (await axios.get<APIResponse<UserLeaderboard[]>>(
            `/leaderboard/player/${slug}`,
            { params: { playerAddresses, limit } },
        )).data;

        return handleResponse(response);
    }
}
