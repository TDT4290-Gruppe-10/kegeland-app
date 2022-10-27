import React, {useEffect, useState, ComponentType} from 'react';

import QuestionnaireModal from '~components/QuestionnaireModal';
import {DeviceType} from '~constants/bluetooth';
import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {
  fetchQuestionnaire,
  uploadAnswers,
} from '~state/ducks/questions/questions.actions';
import {
  Answer,
  Questionnaire,
} from '~state/ducks/questions/questions.interface';
import {
  clearAnswers,
  setAnswer,
} from '~state/ducks/questions/questions.reducer';
import {uploadSession} from '~state/ducks/session/session.actions';
import {UploadSessionResponse} from '~state/ducks/session/session.interface';
import {clearSession} from '~state/ducks/session/session.reducer';

export type WithQuestionnaireContext = {
  answers: Answer[];
  questionnaireEnabled: boolean;
  questionnaireLoading: boolean;
  toggleQuestionnaire: () => void;
};

const isValidAnswers = (questionnaire: Questionnaire, answers: number[]) => {
  return questionnaire.questions.length === answers.length;
};

const withQuestionnaire =
  <P extends WithQuestionnaireContext>(
    deviceType: DeviceType,
    Component: ComponentType<P>,
  ): ComponentType<Omit<P, keyof WithQuestionnaireContext>> =>
  (props) => {
    const dispatch = useAppDispatch();
    const [questionnaireEnabled, setQuestionnaireEnabled] =
      useState<boolean>(true);
    const [questionnaireVisible, setQuestionnaireVisible] =
      useState<boolean>(false);
    const {auth, questions, session} = useAppSelector((state) => state);
    const {authUser} = auth;
    const {currentSession} = session;
    const {answers, questionnaire} = questions;

    useEffect(() => {
      if (authUser) {
        dispatch(fetchQuestionnaire({sensor: deviceType, userId: authUser.id}));
      } else {
        setQuestionnaireEnabled(false);
      }
      return () => {
        dispatch(clearAnswers());
      };
    }, []);

    useEffect(() => {
      if (authUser && questionnaire?.id) {
        if (answers.length === 2 && currentSession) {
          dispatch(
            uploadSession({...currentSession, userId: authUser.id}),
          ).then((res) => {
            const {id} = res.payload as UploadSessionResponse;
            dispatch(
              uploadAnswers({
                answers,
                questionnaireId: questionnaire.id,
                sessionId: id,
              }),
            ).then(() => {
              dispatch(clearAnswers());
              dispatch(clearSession());
            });
          });
        }
      }
    }, [answers]);

    useEffect(() => {
      if (currentSession !== undefined && answers.length === 1) {
        toggleQuestionnaire();
      }
    }, [currentSession]);

    const handleAnswers = (data: number[]) => {
      if (authUser && isValidAnswers(questionnaire!, data)) {
        dispatch(
          setAnswer({
            userId: authUser.id,
            answers: data,
            answeredAt: Date.now(),
          }),
        );
      }
      toggleQuestionnaire();
    };

    const toggleQuestionnaire = () => {
      setQuestionnaireVisible(!questionnaireVisible);
    };

    const mapStateToProps: any = {
      answers,
      questionnaireEnabled,
      questionnaireLoading: questions.loading || session.loading,
      toggleQuestionnaire,
    };

    return (
      <>
        <Component {...props} {...mapStateToProps} />
        <QuestionnaireModal
          onSubmit={handleAnswers}
          visible={questionnaireVisible}
          questionnaire={questions.questionnaire}
        />
      </>
    );
  };

export default withQuestionnaire;
