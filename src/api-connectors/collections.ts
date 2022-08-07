import axios from 'axios';

import { SERVER_IP } from '../constants';
import { CollectionWithSeen } from '../types/collections';
import { Response } from '../types/general';
import { TraitOverview } from '../types/traits';

/** Get all collections. If `name` is provided, then the collection is updated on the server, before the full collections response is sent */
export const getCollections = async (slug?: string, player?: string, serverUrl = SERVER_IP): Promise<CollectionWithSeen[]> => {
    try {
        const res = (await axios.get<Response<CollectionWithSeen[]>>(`${serverUrl}/collections`, { params: { slug, player } })).data;

        if (!res.success) {
            throw 'Failed to get collections';
        }

        return res.data;

    } catch (e) {
        throw 'Failed to get collections';
    }
};

/**
 * Get the specified collection's Overview tab data
 * @param slug
 * @returns
 */
export const getCollectionOverview = async (slug: string, serverUrl = SERVER_IP) => {
    try {
        const res = (await axios.get<Response<Record<string, TraitOverview[]>>>(`${serverUrl}/collection/overview`, { params: { slug } })).data;

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
export const getNumOwners = async (slug: string, serverUrl = SERVER_IP) => {
    try {
        const res = (await axios.get<Response<number>>(`${serverUrl}/collection/owners`, { params: { slug } })).data;

        if (!res.success) {
            throw 'Failed to get number of owners';
        }

        return res.data;
    } catch (e) {
        throw 'Failed to get number of owners';
    }
};
