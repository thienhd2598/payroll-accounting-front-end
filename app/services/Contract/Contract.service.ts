import apiClient from 'services';
import {
    GetListContractParams,
    GetListContractResponse,
    GetDetailContractResponse,
    UpdateContractRequest,
    UpdateContractResponse,
    ReleaseContractRequest,
    ReleaseContractResponse
} from './Contract.types';
import queryString from 'querystring';
import { PromiseResponse } from 'services/types';

const getListContract = async ({ keyword, status }: GetListContractParams): PromiseResponse<GetListContractResponse> => {
    const requestUrl = `/admin/contract?${queryString.stringify({ keyword, status })}`;
    const response = await apiClient.get<GetListContractResponse>(requestUrl);

    return response.data;
};

const getDetailContract = async ({ id }: { id: number }): PromiseResponse<GetDetailContractResponse> => {
    const requestUrl = `/admin/contract/${id}`;
    const response = await apiClient.get<GetDetailContractResponse>(requestUrl);

    return response.data;
};

const updateContract = async ({ id, ...args }: UpdateContractRequest): PromiseResponse<UpdateContractResponse> => {
    const requestUrl = `/admin/contract/${id}`;
    const response = await apiClient.put<UpdateContractResponse>(requestUrl, { ...args });

    return response.data;
};

const releaseContract = async (payload: ReleaseContractRequest): PromiseResponse<ReleaseContractResponse> => {
    const requestUrl = `/admin/contract/release`;
    const response = await apiClient.post<ReleaseContractResponse>(requestUrl, payload);

    return response.data;
};

const ContractService = {
    getListContract,
    getDetailContract,
    updateContract,
    releaseContract
};

export default ContractService;