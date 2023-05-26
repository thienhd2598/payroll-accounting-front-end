import apiClient from 'services';

const getAllSalaryInformation = async () => {
    const requestUrl = '/salary-information';
    const response = await apiClient.get(requestUrl);

    return response
};

const createSalaryInformation = async (body: any) => {
    const requestUrl = '/salary-information/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updateSalaryInformation = async ({ id, ...args }) => {
    const requestUrl = `/salary-information/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response
}

const deleteSalaryInformation = async (id: string) => {
    const requestUrl = `/salary-information/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const SalaryInformationService = {
    getAllSalaryInformation,
    createSalaryInformation,
    updateSalaryInformation,
    deleteSalaryInformation
};

export default SalaryInformationService;