import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { APIResponse } from '../types/general';
import { RoundWithUrls } from '../types/rounds';

/** Gets number of rounds played by player for a specific collection */
export const getRounds = async (slug: string, player: string, serverUrl = API_BASE_URL): Promise<number> => {
    const res = (await axios.get<APIResponse<number>>(`${serverUrl}/rounds/${slug}`, { params: { player, count: true } })).data;

    if (!res.success) {
        throw 'Failed to get rounds';
    }

    return res.data;
};

/** Gets the total number of rounds played (valid and invalid) */
export const getTotalNumRoundsPlayed = async (serverUrl = API_BASE_URL): Promise<number | null> => {
    try {
        const res = (await axios.get<APIResponse<number | null>>(`${serverUrl}/rounds?count=true`)).data;

        if (!res.success) {
            throw res.data;
        }

        return res.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

/** Gets the last 5 rounds played by the NFT */
export const getNftRounds = async (slug: string, id: string, serverUrl = API_BASE_URL): Promise<RoundWithUrls[]> => {
    const res = (await axios.get<APIResponse<RoundWithUrls[]>>(`${serverUrl}/rounds/${slug}/${id}`)).data;

    if (!res.success) {
        throw 'Failed to get rounds';
    }

    return res.data;
};
