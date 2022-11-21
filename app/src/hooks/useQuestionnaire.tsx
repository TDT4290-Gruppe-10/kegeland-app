import {useEffect, useState} from 'react';

import {DeviceType} from '~constants/bluetooth';
import {fetchQuestionnaire} from '~state/ducks/questions/questions.actions';
import {
  addAnswer,
  clearAnswers,
  clearQuestionnaire,
} from '~state/ducks/questions/questions.reducer';
import {isValidAnswers} from '~utils/questionnaire.utils';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useQuestionnaire = (deviceType: DeviceType) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [hasQuestionnaire, setHasQuestionnaire] = useState<boolean>(false);
  const {auth, questions} = useAppSelector((state) => state);

  const open = () => {
    setVisible(true);
  };

  const clear = () => {
    dispatch(clearQuestionnaire());
    dispatch(clearAnswers());
  };

  const submit = (data: number[]) => {
    if (auth.authUser && isValidAnswers(questions.questionnaire!, data)) {
      dispatch(
        addAnswer({
          userId: auth.authUser.id,
          answers: data,
          answeredAt: Date.now(),
        }),
      );
      setVisible(false);
    }
  };

  useEffect(() => {
    if (auth.authUser) {
      dispatch(
        fetchQuestionnaire({sensor: deviceType, userId: auth.authUser.id}),
      ).then((res: any) => {
        if (res.payload) {
          setHasQuestionnaire(true);
        }
      });
    }
    return () => {
      clear();
    };
  }, []);

  return {
    hasQuestionnaire,
    loading: auth.loading || questions.loading,
    questionnaire: questions.questionnaire,
    answers: questions.answers,
    visible,
    open,
    submit,
    clear,
  };
};

export default useQuestionnaire;
