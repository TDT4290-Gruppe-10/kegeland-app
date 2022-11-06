import React from 'react';
import {View} from 'react-native';
import {cloneDeep, map, set} from 'lodash';
import {Button} from 'react-native-paper';

import {
  fetchQuestionnaire,
  uploadAnswers,
} from '~state/ducks/questions/questions.actions';
import {act, cleanup, fireEvent, render, waitFor} from '~utils/test-utils';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import * as apiCaller from '~utils/apiCaller';
import withQuestionnaire from '~hoc/withQuestionnaire';
import {AuthState} from '~state/ducks/auth/auth.interface';
import {
  answerAfter,
  answerBefore,
  questionnaireMock,
} from '~state/ducks/__mocks__/questions.mock';
import {
  addAnswer,
  clearAnswers,
} from '~state/ducks/questions/questions.reducer';
import {sessionMock} from '~state/ducks/__mocks__/session.mocks';
import {uploadSession} from '~state/ducks/session/session.actions';
import {setSession} from '~state/ducks/session/session.reducer';

const authUser = {id: 'asdnqiqw', email: 'test@test.no'};
jest.spyOn(apiCaller, 'apiCaller').mockImplementation((config) => {
  if (config.url === `questionnaires/assignments/${authUser.id}`) {
    return Promise.resolve(questionnaireMock);
  } else if (config.url === 'sessions') {
    return Promise.resolve({userId: authUser.id, id: sessionMock.id});
  } else {
    return Promise.resolve();
  }
});
jest.useFakeTimers();
describe('Test withQuestionnaire-hoc', () => {
  afterEach(cleanup);
  const MockComponent: React.FC<any> = ({toggleQuestionnaire, ...props}) => {
    return (
      <View testID="content" {...props}>
        <Button testID="ToggleModalBtn" onPress={toggleQuestionnaire}>
          Modal
        </Button>
      </View>
    );
  };

  it('should render correctly', () => {
    const store = mockStore(initialStore);
    const Component = withQuestionnaire('femfit', MockComponent);
    const component = render(<Component />, {wrapperProps: {store}});
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should upload a session with answers', async () => {
    const stateCp = cloneDeep(initialStore);
    set(stateCp, 'auth', {
      ...stateCp.auth,
      isSignedIn: true,
      authUser,
    } as AuthState);
    set(stateCp, 'questions', {
      ...stateCp.questions,
      questionnaire: questionnaireMock,
      answers: [answerBefore, answerAfter],
    });
    set(stateCp, 'session', {
      ...stateCp.session,
      currentSession: sessionMock,
    });

    const store = mockStore(stateCp);
    const Component = withQuestionnaire('femfit', MockComponent);
    render(<Component />, {wrapperProps: {store}});

    const expectedActions = [
      fetchQuestionnaire.fulfilled.type,
      uploadSession.fulfilled.type,
      uploadAnswers.fulfilled.type,
    ];
    const raceActions = [clearAnswers.type, setSession.type];
    await waitFor(() => {
      const actionHistory = map(store.getActions(), 'type');
      const orderedHistory = actionHistory.slice(0, 3);
      const raceHistory = actionHistory.slice(3);
      expect([...orderedHistory, ...raceHistory]).toStrictEqual([
        ...expectedActions,
        ...raceActions.sort(),
      ]);
    });
  });

  it('should upload a session without answers', async () => {
    const stateCp = cloneDeep(initialStore);
    set(stateCp, 'auth', {
      ...stateCp.auth,
      isSignedIn: true,
      authUser,
    } as AuthState);
    set(stateCp, 'session', {
      ...stateCp.session,
      currentSession: sessionMock,
    });

    const store = mockStore(stateCp);
    const Component = withQuestionnaire('femfit', MockComponent);
    render(<Component />, {wrapperProps: {store}});

    const expectedActions = [
      fetchQuestionnaire.fulfilled.type,
      uploadSession.fulfilled.type,
      setSession.type,
    ];
    await waitFor(() => {
      expect(map(store.getActions(), 'type')).toStrictEqual(expectedActions);
    });
  });

  describe('test modal interaction', () => {
    it('should toggle questionnaire modal', async () => {
      const stateCp = cloneDeep(initialStore);
      set(stateCp, 'auth', {
        ...stateCp.auth,
        isSignedIn: true,
        authUser,
      } as AuthState);

      const store = mockStore(stateCp);
      const Component = withQuestionnaire('femfit', MockComponent);
      const component = render(<Component />, {wrapperProps: {store}});

      await waitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(
          fetchQuestionnaire.fulfilled.type,
        );
      });

      const btn = component.getByTestId('ToggleModalBtn');
      fireEvent.press(btn);
      const modal = component.container.findAll(
        (node) => node.props.testID === 'QuestionnaireModal',
      )[0];
      const modalProps = modal.props;
      expect(modalProps.visible).toBeTruthy();
    });

    it('should submit a answer', async () => {
      const stateCp = cloneDeep(initialStore);
      set(stateCp, 'auth', {
        ...stateCp.auth,
        isSignedIn: true,
        authUser,
      } as AuthState);
      set(stateCp, 'questions', {
        ...stateCp.questions,
        questionnaire: questionnaireMock,
      });
      const store = mockStore(stateCp);
      const Component = withQuestionnaire('femfit', MockComponent);
      const component = render(<Component />, {wrapperProps: {store}});

      await waitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(
          fetchQuestionnaire.fulfilled.type,
        );
      });

      const btn = component.getByTestId('ToggleModalBtn');
      fireEvent.press(btn);

      const modal = component.container.findAll(
        (node) => node.props.testID === 'QuestionnaireModal',
      )[0];
      const modalProps = modal.props;
      expect(modalProps.visible).toBeTruthy();

      await act(async () => {
        modalProps.actions.props.onPress();
      });

      await waitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(addAnswer.type);
      });
    });

    it('should initially open modal', async () => {
      const stateCp = cloneDeep(initialStore);
      set(stateCp, 'auth', {
        ...stateCp.auth,
        isSignedIn: true,
        authUser,
      } as AuthState);
      set(stateCp, 'questions', {
        ...stateCp.questions,
        questionnaire: questionnaireMock,
        answers: [answerBefore],
      });
      set(stateCp, 'session', {
        ...stateCp.session,
        currentSession: sessionMock,
      });

      const store = mockStore(stateCp);
      const Component = withQuestionnaire('femfit', MockComponent);
      const component = render(<Component />, {wrapperProps: {store}});

      await waitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(
          fetchQuestionnaire.fulfilled.type,
        );
      });

      const modal = component.container.findAll(
        (node) => node.props.testID === 'QuestionnaireModal',
      )[0];
      const modalProps = modal.props;
      expect(modalProps.visible).toBeTruthy();
    });
  });
});
