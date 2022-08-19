import axios from 'axios';

import { API_BASE_URL } from '../constants';
import { APIResponse } from '../types/general';
import { TraitOverview } from '../types/traits';

/**
 * Get the specified collection's Overview tab data
 * @param slug
 * @returns
 */
export const getCollectionOverview = async (slug: string, serverUrl = API_BASE_URL) => {
    try {
        const res = (await axios.get<APIResponse<Record<string, TraitOverview[]>>>(`${serverUrl}/collection/overview`, { params: { slug } })).data;

        if (!res.success) {
            throw 'Failed to get overview';
        }

        return res.data;
    } catch (e) {
        throw 'Failed to get overview';
    }
};

/**
 * Get the unique number of owners for `slug`
 * @param slug
 * @returns number of unique owners
 */
export const getNumOwners = async (slug: string, serverUrl = API_BASE_URL) => {
    try {
        const res = (await axios.get<APIResponse<number>>(`${serverUrl}/collection/owners`, { params: { slug } })).data;

        if (!res.success) {
            throw 'Failed to get number of owners';
        }

        return res.data;
    } catch (e) {
        throw 'Failed to get number of owners';
    }
};
