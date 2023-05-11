import { ApiResponse } from 'services/types';

interface GetListContractParams {
    keyword?: string;
    status: number
};

type GetListContractResponse = ApiResponse<{}>;

type GetDetailContractResponse = ApiResponse<{}>;

interface UpdateContractRequest {
    id?: number;
    number_suggest?: string;
    date_suggest?: string;
    price?: number;
    user_suggest?: number;
    contract_number?: string;
    contract_date?: string;
    accountant_confirm?: number;
    status?: number;
};

type UpdateContractResponse = ApiResponse<{}>;

interface ReleaseContractRequest {
    contract_id: number;
    date_release: string;
    date_payment: string;
};

type ReleaseContractResponse = ApiResponse<{}>;

export {
    GetListContractParams,
    GetListContractResponse,
    GetDetailContractResponse,
    UpdateContractRequest,
    UpdateContractResponse,
    ReleaseContractResponse,
    ReleaseContractRequest
};