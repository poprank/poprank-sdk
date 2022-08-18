import axios from 'axios';
import { SERVER_IP } from '../constants';
import { APIResponse } from '../types/general';
import { UserLeaderboard } from '../types/leaderboards';

/** Get leaderboard */
export const getPlayerLeaderboard = async (playerAddresses: string, slug?: string, serverUrl = SERVER_IP): Promise<UserLeaderboard[]> => {
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
