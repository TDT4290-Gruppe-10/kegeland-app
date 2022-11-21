import {Questionnaire} from '~state/ducks/questions/questions.interface';

export const isValidAnswers = (
  questionnaire: Questionnaire,
  answers: number[],
) => {
  return questionnaire.questions.length === answers.length;
};
