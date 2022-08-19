import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { APIResponse } from '../types/general';
import { UserLeaderboard } from '../types/leaderboards';

/** Get leaderboard */
export const getPlayerLeaderboard = async (playerAddresses: string, slug?: string, serverUrl = API_BASE_URL): Promise<UserLeaderboard[]> => {
    try {
        const result = (await axios.get<APIResponse<UserLeaderboard[]>>(`${serverUrl}/leaderboard/player${slug ? '/' + slug : ''}`, { params: { playerAddresses } })).data;

        if (!result.success) {
            throw 'Failed to get leaderboard';
        }

        return result.data;
    } catch (e) {
        throw 'Failed to get leaderboard';
    }
};
