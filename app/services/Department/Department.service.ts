import apiClient from 'services';

const getAllDepartment = async () => {
    const requestUrl = '/department';
    const response = await apiClient.get(requestUrl);

    return response
};

const createDepartment = async (body: any) => {
    const requestUrl = '/department/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updateDepartment = async ({ id, ...args }) => {
    const requestUrl = `/department/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response
}

const deleteDepartment = async (id: string) => {
    const requestUrl = `/department/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const DepartmentService = {
    getAllDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
};

export default DepartmentService;