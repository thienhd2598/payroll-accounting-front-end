import { ApiResponse } from 'services/types';

interface GetListStaffParams {
    email?: string;
    keyword?: string;
};

type GetListStaffResponse = ApiResponse<{}>;

type GetDetailStaffResponse = ApiResponse<{}>;

export {
    GetListStaffParams,
    GetListStaffResponse,
    GetDetailStaffResponse
};