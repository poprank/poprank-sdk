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

export type Response<T> = SuccessResponse<T> | FailureResponse;

// ========================================================
