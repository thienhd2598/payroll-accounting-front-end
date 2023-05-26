import apiClient from 'services';

const getAllIncomeTax = async () => {
    const requestUrl = '/income-tax';
    const response = await apiClient.get(requestUrl);

    return response
};

const createIncomeTax = async (body: any) => {
    const requestUrl = '/income-tax/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updateIncomeTax = async ({ id, ...args }) => {
    const requestUrl = `/income-tax/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response
}

const deleteIncomeTax = async (id: string) => {
    const requestUrl = `/income-tax/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const IncomeTaxService = {
    getAllIncomeTax,
    createIncomeTax,
    updateIncomeTax,
    deleteIncomeTax
};

export default IncomeTaxService;