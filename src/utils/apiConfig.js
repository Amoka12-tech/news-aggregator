import { API_BASE_URL } from '.';

import axios from 'axios';

let instanceAxios;

instanceAxios = axios.create({
    baseURL: API_BASE_URL,
});

instanceAxios.interceptors.request.use(req => {
    const userToken = localStorage.getItem('token');
    if (!!userToken) {
        req.headers.Authorization = `Bearer ${userToken}`;
    }
    console.log(req.url);
    return req;
});

export { instanceAxios };