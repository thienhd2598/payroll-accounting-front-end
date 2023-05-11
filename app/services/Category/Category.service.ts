import apiClient from 'services';
import {
    GetListCategoryParams,
    GetListCategoryResponse,
    GetDetailCategoryResponse
} from './Category.types';
import queryString from 'querystring';
import { PromiseResponse } from 'services/types';

const getListCategory = async ({ keyword }: GetListCategoryParams): PromiseResponse<GetListCategoryResponse> => {
    const requestUrl = `/admin/category?${queryString.stringify({ keyword })}`;
    const response = await apiClient.get<GetListCategoryResponse>(requestUrl);

    return response.data;
};

const getDetailCategory = async ({ id }: { id: number }): PromiseResponse<GetDetailCategoryResponse> => {
    const requestUrl = `/admin/category/${id}`;
    const response = await apiClient.get<GetDetailCategoryResponse>(requestUrl);
    
    return response.data;
};

const CategoryService = {
    getListCategory,
    getDetailCategory
};

export default CategoryService;