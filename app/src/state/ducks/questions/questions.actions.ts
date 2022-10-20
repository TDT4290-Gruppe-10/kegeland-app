import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiCaller} from '~utils/apiCaller';

import {
  FetchQuestionnaireDTO,
  FetchQuestionnaireResponse,
} from './questions.interface';

export const fetchQuestionnaire = createAsyncThunk(
  'questions/fetchQuestionnaire',
  async (data: FetchQuestionnaireDTO) => {
    const {userId, ...params} = data;
    return apiCaller<FetchQuestionnaireResponse>({
      url: `questionnaires/assignments/${userId}`,
      method: 'GET',
      params,
    });
  },
);
