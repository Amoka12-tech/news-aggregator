import { instanceAxios } from "../utils/apiConfig";

export const login = (loginCredentials) => instanceAxios.post(`/auth/login/`, loginCredentials);

export const register = (payload) => instanceAxios.post(`/auth/register`, payload);

export const logout_api = () => instanceAxios.post(`/auth/logout`, {});

export const get_user = (id) => instanceAxios.get(`/users/${id}`);