import apiClient from "services";
import {
    GetPermissionResponse,
    GetRoleResponse
} from './Permission.types';
import { PromiseResponse } from 'services/types';

const getRole = async (): PromiseResponse<GetRoleResponse> => {
    const requestUrl = '/admin/permission/role';
    const response = await apiClient.get<GetRoleResponse>(requestUrl);

    return response.data;
};

const getPermission = async (): PromiseResponse<GetPermissionResponse> => {
    const requestUrl = '/admin/permission';
    const response = await apiClient.get<GetPermissionResponse>(requestUrl);

    return response.data;
};

const PermissionService = {
    getPermission,
    getRole
};

export default PermissionService