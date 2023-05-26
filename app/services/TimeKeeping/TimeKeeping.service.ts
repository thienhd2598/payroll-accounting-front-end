import apiClient from 'services';

const getAllTimeKeeping = async () => {
    const requestUrl = '/time-keeping';
    const response = await apiClient.get(requestUrl);

    return response
};

const createTimeKeeping = async (body: any) => {
    const requestUrl = '/time-keeping/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updateTimeKeeping = async ({ id, ...args }) => {
    const requestUrl = `/time-keeping/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response
}

const deleteTimeKeeping = async (id: string) => {
    const requestUrl = `/time-keeping/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const TimeKeepingService = {
    getAllTimeKeeping,
    createTimeKeeping,
    updateTimeKeeping,
    deleteTimeKeeping
};

export default TimeKeepingService;