export type Chain = 'ethereum' | 'solana' | 'polygon';

// ================== API Response types ==================
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

// ========================================================
