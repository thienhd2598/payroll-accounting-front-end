import apiClient from 'services';

const getAllAdvanceSalary = async () => {
    const requestUrl = '/advance-salary';
    const response = await apiClient.get(requestUrl);

    return response
};

const createAdvanceSalary = async (body: any) => {
    const requestUrl = '/advance-salary/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updateAdvanceSalary = async ({ id, ...args }) => {
    const requestUrl = `/advance-salary/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response;
}

const deleteAdvanceSalary = async (id: string) => {
    const requestUrl = `/advance-salary/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const AdvanceSalaryService = {
    getAllAdvanceSalary,
    createAdvanceSalary,
    updateAdvanceSalary,
    deleteAdvanceSalary
};

export default AdvanceSalaryService;