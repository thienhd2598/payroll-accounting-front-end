import apiClient from 'services';

const getAllStaff = async () => {
    const requestUrl = '/staff';
    const response = await apiClient.get(requestUrl);

    return response
};

const createStaff = async (body: any) => {
    const requestUrl = '/staff/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const payrollStaff = async (body: any) => {
    const requestUrl = '/staff/payroll';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updateStaff = async ({ id, ...args }) => {
    const requestUrl = `/staff/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response
}

const deleteStaff = async (id: string) => {
    const requestUrl = `/staff/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const StaffService = {
    getAllStaff,
    createStaff,
    payrollStaff,
    updateStaff,
    deleteStaff
};

export default StaffService;