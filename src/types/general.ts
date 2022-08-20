import { AxiosRequestConfig } from 'axios';

export type Chain = 'ethereum' | 'solana' | 'polygon';

export interface APISuccessResponse<T> {
    readonly success: true;
    readonly data: T;
}

export interface APIFailureResponse {
    readonly success: false;
    readonly data: string;
}
/**
 * Success or failure API response
 */
export type APIResponse<T> = APISuccessResponse<T> | APIFailureResponse;

/**
 * Configuration of underlying `axios` instance.
 * @summary PopRank Client configuration.
 * @see https://axios-http.com/docs/req_config
 */
export type ClientConfig = AxiosRequestConfig;
