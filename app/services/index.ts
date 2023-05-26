import axios from "axios";

const apiClient = axios.create({
    // baseURL: 'https://payroll-api.herokuapp.com',
    baseURL: 'http://localhost:4001',
    headers: {
        "Content-type": "application/json",        
    },
});

const onSuccessInterceptorRequest = config => {
    const newConfig = { ...config };
    const token = localStorage.getItem('jwt-token');
    if (token && !newConfig.headers.Authorization)
        newConfig.headers.Authorization = `Bearer ${token}`;
                            
    return newConfig;
};

const onSuccessInterceptorResponse = (response) => {    
    return response?.data;
};

const onErrorInterceptorResponse = async (error: Error) => {
    return Promise.reject(error);
};

const onErrorInterceptorRequest = (error: Error) => Promise.reject(error);

apiClient.interceptors.request.use(
    onSuccessInterceptorRequest,
    onErrorInterceptorRequest,
);

apiClient.interceptors.response.use(
    onSuccessInterceptorResponse,
    onErrorInterceptorResponse,
);

export default apiClient;