import apiClient from 'services';

const getAllPosition = async () => {
    const requestUrl = '/position';
    const response = await apiClient.get(requestUrl);

    return response
};

const createPosition = async (body: any) => {
    const requestUrl = '/position/create';
    const response = await apiClient.post(requestUrl, body);

    return response
};

const updatePosition = async ({ id, ...args }) => {
    const requestUrl = `/position/${id}`;
    const response = await apiClient.patch(requestUrl, { ...args });

    return response
}

const deletePosition = async (id: string) => {
    const requestUrl = `/position/${id}`;
    const response = await apiClient.delete(requestUrl);

    return response;
}

const PositionService = {
    getAllPosition,
    createPosition,
    updatePosition,
    deletePosition
};

export default PositionService;