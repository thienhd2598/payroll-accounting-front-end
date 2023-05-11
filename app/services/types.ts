export interface ApiResponse<T> {
    status: number,
    message: string,
    total: number,
    data: T
};

export type PromiseResponse<T> = T extends ApiResponse<Object> ? Promise<T> : null;