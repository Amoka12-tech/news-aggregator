import { instanceAxios } from "../utils/apiConfig";

export const get_preference = () => instanceAxios.post(`/users/get/preferences`,{});

export const set_preference = (payload) => instanceAxios.post(`/users/preferences`, payload);

export const fetch_articles = (params) => instanceAxios.get(`/articles/search${params}`);
export const auth_fetch_articles = (params) => instanceAxios.get(`/users/articles/search${params}`);

export const fetch_categories = () => instanceAxios.get(`/articles/categories-sources`);

export const news_feeds = () => instanceAxios.get(`/users/news-feed`);

export const feeds = () => instanceAxios.get(`/news-feed`);