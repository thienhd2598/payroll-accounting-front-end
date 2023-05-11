import { ApiResponse } from 'services/types';

interface GetListCategoryParams {    
    keyword?: string;
};

type GetListCategoryResponse = ApiResponse<{}>;

type GetDetailCategoryResponse = ApiResponse<{}>;

export {
    GetListCategoryParams,
    GetListCategoryResponse,
    GetDetailCategoryResponse
};