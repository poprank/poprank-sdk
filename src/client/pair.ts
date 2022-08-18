import axios from 'axios';
import { SERVER_IP } from '../constants';
import { APIResponse } from '../types/general';
import { Pair } from '../types/nfts';

/** Gets a random pair of NFTs to rank */
export const getPair = async (slug: string, player?: string, serverUrl = SERVER_IP): Promise<Pair> => {
    const res = (await axios.get<APIResponse<Pair>>(`${serverUrl}/nfts/${slug}/double`, { params: { player } })).data;

    if (!res.success) {
        throw 'Failed to get pair';
    }

    return res.data;
};
