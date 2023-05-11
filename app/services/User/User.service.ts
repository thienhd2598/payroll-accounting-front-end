import apiClient from "services";
import { PromiseResponse } from "services/types";
import {
    GetProfileResponse,
    UpdateProfileParams,
    UpdateProfileResponse,
    ChangePasswordParams,
    ChangePasswordResponse
} from './User.types';

const getProfile = async (): PromiseResponse<GetProfileResponse> => {
    const response = await apiClient.get<GetProfileResponse>("/admin/profile");

    return response.data;
};

const updateProfile = async (payload: UpdateProfileParams): PromiseResponse<UpdateProfileResponse> => {
    const response = await apiClient.post<UpdateProfileResponse>("/admin/profile", payload);

    return response.data;
};

const changePassword = async (payload: ChangePasswordParams): PromiseResponse<ChangePasswordResponse> => {
    const response = await apiClient.post<ChangePasswordResponse>("/admin/profile/change-password", payload);

    return response.data;
};

const UserService = { getProfile, updateProfile, changePassword };

export default UserService;