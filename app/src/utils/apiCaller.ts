import axios, {AxiosRequestConfig} from 'axios';
import {API_URL} from '@env';

import {Token} from '~constants/auth';

import {isApiError} from './isApiError';
import {retrieveToken} from './storage';

export const httpInstance = axios.create({
  timeout: 5000,
});

export const interceptFulfilled = async (config: AxiosRequestConfig) => {
  const token = await retrieveToken(Token.ACCESS_TOKEN);
  if (token) {
    config.headers!.Authorization = 'Bearer ' + token;
  }
  return config;
};

export const interceptRejected = async (err: any) => Promise.reject(err);

httpInstance.interceptors.request.use(interceptFulfilled, interceptRejected);

export type ApiCallerProps = Pick<
  AxiosRequestConfig,
  'url' | 'method' | 'data' | 'params'
>;

export const apiCaller = <T = unknown>(config: ApiCallerProps) =>
  httpInstance
    .request<T>({baseURL: API_URL, ...config})
    .then((res) => res.data)
    .catch((err) => {
      if (err instanceof Error) {
        if (axios.isAxiosError(err)) {
          if (err.response && isApiError(err)) {
            let message = err.response.data.message;
            if (message instanceof Array) {
              message = message[0];
            }
            throw new Error(message);
          }
        }
        throw new Error(err.message);
      }
      throw new Error('An unknown error has occurred');
    });
