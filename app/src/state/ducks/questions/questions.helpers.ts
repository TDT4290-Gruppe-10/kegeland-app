import {PayloadAction} from '@reduxjs/toolkit';

import {
  FetchQuestionnaireResponse,
  QuestionsState,
} from './questions.interface';

export const fetchQuestionnaireReducer = (
  state: QuestionsState,
  action: PayloadAction<FetchQuestionnaireResponse>,
) => {
  state.questionnaire = action.payload;
};
