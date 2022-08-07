import axios from 'axios';
import { SERVER_IP } from '../constants';
import { Response } from '../types/general';
import { RoundWithUrls } from '../types/rounds';

/** Gets number of rounds played for a specific collection */
export const getRounds = async (slug: string, player: string, serverUrl = SERVER_IP): Promise<number> => {
    const res = (await axios.get<Response<number>>(`${serverUrl}/rounds/double`, { params: { slug, player } })).data;

    if (!res.success) {
        throw 'Failed to get rounds';
    }

    return res.data;
};

/** Gets the total number of rounds played (valid and invalid) */
export const getTotalNumRoundsPlayed = async (serverUrl = SERVER_IP): Promise<number | null> => {
    try {
        const res = (await axios.get<Response<number | null>>(`${serverUrl}/rounds?count=true`)).data;

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
export const getNftRounds = async (slug: string, id: string, serverUrl = SERVER_IP): Promise<RoundWithUrls[]> => {
    const res = (await axios.get<Response<RoundWithUrls[]>>(`${serverUrl}/rounds/${slug}/${id}`)).data;

    if (!res.success) {
        throw 'Failed to get rounds';
    }

    return res.data;
};
