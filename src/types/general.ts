export type Chain = 'ethereum' | 'solana' | 'polygon';

// ================== API Response types ==================
interface SuccessResponse<T> {
    readonly success: true;
    readonly data: T;
}

interface FailureResponse {
    readonly success: false;
    readonly data: string;
}

/**
 * Success or failure API response
 */
export type Response<T> = SuccessResponse<T> | FailureResponse;
// ========================================================
