import axios, { AxiosInstance } from 'axios';

const createDataApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_DATA_API,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000', 10),
    });

    instance.interceptors.request.use((config) => {
        console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    });

    return instance;
};

export const axiosAPIInstance = createDataApiInstance();