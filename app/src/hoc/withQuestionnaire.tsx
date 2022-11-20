import React, {ComponentType, useEffect} from 'react';

import QuestionnaireModal from '~components/QuestionnaireModal';
import {DeviceType} from '~constants/bluetooth';
import useCurrentSession from '~hooks/useCurrentSession';
import useQuestionnaire from '~hooks/useQuestionnaire';
import {Answer} from '~state/ducks/questions/questions.interface';
import {ExerciseSession} from '~state/ducks/session/session.interface';

export type WithQuestionnaireContext = {
  session: ExerciseSession;
  answers: Answer[];
  hasQuestionnaire: boolean;
  loading: boolean;
  openQuestionnaire: () => void;
};

const withQuestionnaire =
  <P extends WithQuestionnaireContext>(
    deviceType: DeviceType,
    Component: ComponentType<P>,
  ): ComponentType<Omit<P, keyof WithQuestionnaireContext>> =>
  (props) => {
    const questionnaire = useQuestionnaire(deviceType);
    const session = useCurrentSession(questionnaire.hasQuestionnaire);

    const mapStateToProps: any = {
      session: session.session,
      answers: questionnaire.answers,
      hasQuestionnaire: questionnaire.hasQuestionnaire,
      loading: questionnaire.loading || session.loading,
      openQuestionnaire: questionnaire.open,
    };

    useEffect(() => {
      if (
        session.session &&
        questionnaire.hasQuestionnaire &&
        questionnaire.answers.length === 1
      ) {
        questionnaire.open();
      }
    }, [session.session]);

    useEffect(() => {
      if (session.session && !questionnaire.visible && !session.isUploading) {
        session.upload();
      }
    }, [session.session, questionnaire.submit]);

    return (
      <>
        <Component {...props} {...mapStateToProps} />
        <QuestionnaireModal
          onSubmit={questionnaire.submit}
          visible={questionnaire.visible}
          questionnaire={questionnaire.questionnaire}
        />
      </>
    );
  };

export default withQuestionnaire;
