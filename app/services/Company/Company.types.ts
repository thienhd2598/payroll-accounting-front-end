import { ApiResponse } from 'services/types';

interface GetListCompanyParams {
    keyword?: string,
    tax_code?: string
};

type GetListCompanyResponse = ApiResponse<{}>;

type GetDetailCompanyResponse = ApiResponse<{}>;

type InputActionCompany = "name" | "deputy" | "position" | "address" | "phone" | "telephone" | "fax" | "tax_code" | "account_number" | "bank" | "description";
type CreateCompanyRequest = Record<InputActionCompany, string | null>;
type UpdateCompanyRequest = Record<InputActionCompany, string | null> & { id: number };

type ActionCompanyResponse = ApiResponse<{}>;

type DeleteCompanyResponse = ApiResponse<{}>;

export {
    GetListCompanyParams,
    GetListCompanyResponse,
    GetDetailCompanyResponse,
    CreateCompanyRequest,
    UpdateCompanyRequest,
    ActionCompanyResponse,
    DeleteCompanyResponse
}