import axios from 'axios';

import { SIGN_UP_URL, TOKEN } from '@/constants';

const BASE_URL = 'http://localhost:8080';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN);

        if (token != null) {
            config.headers['Content-Type'] = 'application/json; charset=utf-8';
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    async (error) => {
        console.log(error);
        return await Promise.resolve(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            window.location.assign(SIGN_UP_URL);
        }
        return await Promise.reject(error);
    },
);

export default instance;
