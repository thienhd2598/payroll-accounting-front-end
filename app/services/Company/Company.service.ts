import apiClient from 'services';
import {
    GetListCompanyParams,
    GetListCompanyResponse,
    GetDetailCompanyResponse,
    CreateCompanyRequest,
    UpdateCompanyRequest,
    ActionCompanyResponse,
    DeleteCompanyResponse
} from './Company.types';
import queryString from 'querystring';
import { PromiseResponse } from 'services/types';

const getListCompany = async ({ keyword, tax_code }: GetListCompanyParams): PromiseResponse<GetListCompanyResponse> => {
    const requestUrl = `/admin/company?${queryString.stringify({ keyword, tax_code })}`;
    const response = await apiClient.get<GetListCompanyResponse>(requestUrl);

    return response.data;
};

const getDetailCompany = async ({ id }: { id: number }): PromiseResponse<GetDetailCompanyResponse> => {
    const requestUrl = `/admin/company/${id}`;
    const response = await apiClient.get<GetDetailCompanyResponse>(requestUrl);
    
    return response.data;
};

const createCompany = async (payload: CreateCompanyRequest): PromiseResponse<ActionCompanyResponse> => {
    const response = await apiClient.post<ActionCompanyResponse>('/admin/company', payload);
    
    return response.data;
};

const updateCompany = async ({ id, ...args }: UpdateCompanyRequest): PromiseResponse<ActionCompanyResponse> => {
    const requestUrl = `/admin/company/${id}`;
    const response = await apiClient.put<ActionCompanyResponse>(requestUrl, { ...args });

    return response.data;
};

const deleteCompany = async ({ id }: { id: number }): PromiseResponse<DeleteCompanyResponse> => {
    const requestUrl = `/admin/company/${id}`;
    const response = await apiClient.delete<DeleteCompanyResponse>(requestUrl);

    return response.data;
};

const CompanyService = {
    getListCompany,
    getDetailCompany,
    createCompany,
    updateCompany,
    deleteCompany
};

export default CompanyService;