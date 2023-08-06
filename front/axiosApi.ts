import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiURL } from './constants';
import { RootStore } from '@/app/store';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({ baseURL: apiURL });

export const addInterceptors = (store: Store<RootStore>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    return config;
  });
};

export default axiosApi;
