import apiClient from 'services';
import {
    GetListStaffParams,
    GetListStaffResponse,
    GetDetailStaffResponse
} from './Staff.types';
import queryString from 'querystring';
import { PromiseResponse } from 'services/types';

const getListStaff = async ({ keyword, email }: GetListStaffParams): PromiseResponse<GetListStaffResponse> => {
    const requestUrl = `/admin/staff?${queryString.stringify({ keyword, email })}`;
    const response = await apiClient.get<GetListStaffResponse>(requestUrl);

    return response.data;
};

const getDetailStaff = async ({ id }: { id: number }): PromiseResponse<GetDetailStaffResponse> => {
    const requestUrl = `/admin/staff/${id}`;
    const response = await apiClient.get<GetDetailStaffResponse>(requestUrl);
    
    return response.data;
};

const StaffService = {
    getListStaff,
    getDetailStaff
};

export default StaffService;