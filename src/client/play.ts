import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { Nft } from '../types/nfts';
import { RoundDir } from '../types/rounds';

/** Send HTTP PUT request containing the round's `winner` and `loser` */
export const sendPlayResult = async (winner: Nft, loser: Nft, player?: string, dir?: RoundDir, serverUrl = API_BASE_URL): Promise<void> => {
    try {
        await axios.post(`${serverUrl}/rounds`, { winner, loser, player, dir });
    } catch (e) {
        // Send a message somehow? User doesn't need to know about this
    }
};
