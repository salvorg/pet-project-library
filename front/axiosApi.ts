import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiURL } from './constants';
import { AppStore } from '@/app/store';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({ baseURL: apiURL });

export const addInterceptors = (store: Store<AppStore>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    return config;
  });
};

export default axiosApi;
