import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiCaller} from '~utils/apiCaller';

import {UploadSessionDto, UploadSessionResponse} from './session.interface';

export const uploadSession = createAsyncThunk(
  'session/upload',
  async (data: UploadSessionDto) =>
    apiCaller<UploadSessionResponse>({
      url: 'sessions',
      method: 'POST',
      data,
    }),
);
