import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { APIResponse } from '../types/general';

/** Gets the Discord username for a user */
export const getDiscordUsername = async (id: string, serverUrl = API_BASE_URL): Promise<string> => {
    try {
        const response = (await axios.get<APIResponse<string>>(`${serverUrl}/discord/user`, { params: { id } })).data;

        if (!response.success) {
            throw 'Failed to get collections';
        }

        return response.data;
    } catch (e) {
        throw 'Failed to get collections';
    }
};
