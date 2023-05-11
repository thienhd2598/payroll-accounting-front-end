import apiClient from 'services';
import {
    GetListBriefParams,
    GetListBriefResponse,
    DetailBriefParams,
    DetailBriefResponse,
    CreateBriefParams,
    CreateBriefResponse,
    UpdateBriefParams,
    UpdateBriefResponse,
    UpdatePlanNumberParams,
    UpdatePlanNumberResponse,
    AssigneParams,
    AssigneResponse,
    CloseBriefParams,
    CloseBriefResponse,
    OpenBriefParams,
    OpenBriefResponse,
    UpdateStatusParams,
    UpdateStatusResponse,
    HistoryBriefParams,
    HistoryBriefResponse
} from './Brief.types';
import queryString from 'querystring';
import { PromiseResponse } from 'services/types';

const getListBrief = async ({ number_receive, keyword, status }: GetListBriefParams) => {
    const requestUrl = `/admin/brief?status[]=${status}&${queryString.stringify({ keyword, number_receive })}`;
    const response = await apiClient.get<GetListBriefResponse>(requestUrl);

    return response.data;
};

const getListAllBrief = async ({ number_receive, keyword }: GetListBriefParams): PromiseResponse<GetListBriefResponse> => {
    const statusUrl = [...Array(11).keys()]
        ?.filter(__ => Boolean(__))
        ?.map(__ => `status[]=${__}`)
        ?.join('&');

    const requestUrl = `/admin/brief?${statusUrl}&${queryString.stringify({ keyword, number_receive })}`;
    const response = await apiClient.get<GetListBriefResponse>(requestUrl);

    return response.data;
};

const getDetailBrief = async ({ briefId }: DetailBriefParams): PromiseResponse<DetailBriefResponse> => {
    const requestUrl = `/admin/brief/${briefId}`;
    const response = await apiClient.get<DetailBriefResponse>(requestUrl);

    return response.data;
};

const createBrief = async (params: CreateBriefParams): PromiseResponse<CreateBriefResponse> => {
    const requestUrl = `/admin/brief`;
    const response = await apiClient.post<CreateBriefResponse>(requestUrl, params);

    return response.data;
}

const updateBrief = async ({ brief_id, ...args }: UpdateBriefParams): PromiseResponse<UpdateBriefResponse> => {
    const requestUrl = `/admin/brief/${brief_id}`;
    const response = await apiClient.put<UpdateBriefResponse>(requestUrl, { ...args });

    return response.data;
};

const updatePlanNumber = async (payload: UpdatePlanNumberParams): PromiseResponse<UpdatePlanNumberResponse> => {
    const requestUrl = `/admin/brief/updatePlan`;
    const response = await apiClient.post<UpdateBriefResponse>(requestUrl, payload);

    return response.data;
};

const assigneeBrief = async (payload: AssigneParams): PromiseResponse<AssigneResponse> => {
    const requestUrl = `/admin/brief/assignee`;
    const response = await apiClient.post<AssigneResponse>(requestUrl, payload);
    
    return response.data;
};

const openBrief = async (payload: OpenBriefParams): PromiseResponse<OpenBriefResponse> => {
    const requestUrl = `/admin/brief/open`;
    const response = await apiClient.post<OpenBriefResponse>(requestUrl, payload);
    
    return response.data;
}

const closeBrief = async (payload: CloseBriefParams): PromiseResponse<CloseBriefResponse> => {
    const requestUrl = `/admin/brief/close`;
    const response = await apiClient.post<CloseBriefResponse>(requestUrl, payload);
    
    return response.data;
}

const updateStatus = async (payload: UpdateStatusParams): PromiseResponse<UpdateStatusResponse> => {
    const requestUrl = `/admin/brief/updateStatus`;
    const response = await apiClient.post<UpdateStatusResponse>(requestUrl, payload);
    
    return response.data;
}

const getHistoryBrief = async ({ brief_id }: HistoryBriefParams): PromiseResponse<HistoryBriefResponse> => {
    const requestUrl = `/admin/brief/history?brief_id=${brief_id}`;
    const response = await apiClient.get<HistoryBriefResponse>(requestUrl);
    
    return response.data;
}

const BriefService = {
    getListBrief,
    getListAllBrief,
    getDetailBrief,
    createBrief,
    updateBrief,
    updatePlanNumber,
    assigneeBrief,
    openBrief,
    closeBrief,
    updateStatus,
    getHistoryBrief
};

export default BriefService;
