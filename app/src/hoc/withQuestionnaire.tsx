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
import {addAnswer} from '~state/ducks/questions/questions.reducer';
import {uploadSession} from '~state/ducks/session/session.actions';
import {UploadSessionResponse} from '~state/ducks/session/session.interface';

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

    const dispatchSessionWithAnswers = async () => {
      await dispatch(
        uploadSession({...currentSession!, userId: authUser!.id}),
      ).then(async (res) => {
        const {id} = res.payload as UploadSessionResponse;
        if (id) {
          await dispatch(
            uploadAnswers({
              answers,
              questionnaireId: questionnaire!.id,
              sessionId: id,
            }),
          );
        }
      });
      // .finally(async () => {
      //   await Promise.all([dispatch(clearAnswers()), dispatch(setSession())]);
      // });
    };

    const dispatchSession = async () => {
      await dispatch(uploadSession({...currentSession!, userId: authUser!.id}));
      // dispatch(setSession());
    };

    useEffect(() => {
      if (authUser) {
        dispatch(fetchQuestionnaire({sensor: deviceType, userId: authUser.id}));
      } else {
        setQuestionnaireEnabled(false);
      }
    }, []);

    useEffect(() => {
      if (!questions.loading && !questionnaire) {
        setQuestionnaireEnabled(false);
      }
    }, [questions.loading]);

    useEffect(() => {
      if (authUser && currentSession) {
        if (questionnaireEnabled) {
          if (questionnaire?.id && answers.length === 2) {
            dispatchSessionWithAnswers();
          }
        } else {
          dispatchSession();
        }
      }
    }, [answers, questionnaireEnabled]);

    useEffect(() => {
      if (currentSession !== undefined && answers.length === 1) {
        toggleQuestionnaire();
      }
    }, [currentSession]);

    const handleAnswers = (data: number[]) => {
      if (authUser && isValidAnswers(questionnaire!, data)) {
        dispatch(
          addAnswer({
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
