import axios from 'axios';
import { SERVER_IP } from '../constants';
import { Response } from '../types/general';

/** Gets the Discord username for a user */
export const getDiscordUsername = async (id: string, serverUrl = SERVER_IP): Promise<string> => {
    try {
        const response = (await axios.get<Response<string>>(`${serverUrl}/discord/user`, { params: { id } })).data;

        if (!response.success) {
            throw 'Failed to get collections';
        }

        return response.data;
    } catch (e) {
        throw 'Failed to get collections';
    }
};
