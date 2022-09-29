import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';

export const userLogin = createAsyncThunk(
  'user/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post(
        '/api/auth/login',
        {email, password},
        config,
      );
      // store user's token in local storage
      // localStorage.setItem('userToken', data.userToken);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        // return custom error message from API if any
        if (err.response && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('An unknown error has occurred.');
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    {name, email, password}: {name: string; email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // make request to backend
      await axios.post('/api/user/register', {name, email, password}, config);
    } catch (err) {
      if (err instanceof AxiosError) {
        // return custom error message from API if any
        if (err.response && err.response.data.message) {
          return rejectWithValue(err.response.data.message);
        }
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('An unknown error has occurred.');
    }
  },
);
