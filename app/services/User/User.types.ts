import { ApiResponse } from 'services/types';

// Type profile
interface UpdateProfileParams {
    name: string,
    phone: string,
    address: string,
    gender: number
};

type GetProfileResponse = ApiResponse<{}>;
type UpdateProfileResponse = ApiResponse<{}>;

// Type change password 
interface ChangePasswordParams {
    password_old: string,
    password: string
};

type ChangePasswordResponse = ApiResponse<{}>;

export {
    UpdateProfileParams,
    UpdateProfileResponse,
    GetProfileResponse,
    ChangePasswordParams,
    ChangePasswordResponse
}