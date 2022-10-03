import axios, {Method} from 'axios';
import {API_URL} from '@env';

import {isApiError} from './isApiError';

const httpInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const apiCaller = <T = unknown>(
  endpoint: string,
  method: Method,
  data: any,
) =>
  httpInstance
    .request<T>({url: endpoint, method, data})
    .then((res) => res.data)
    .catch((err) => {
      if (err instanceof Error) {
        if (axios.isAxiosError(err)) {
          if (isApiError(err)) {
            let message = err.response?.data.message;
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
