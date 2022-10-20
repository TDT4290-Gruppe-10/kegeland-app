import {find} from 'lodash';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Text,
} from 'react-native-paper';

import FemfitGame from '~lib/femfit/game';
import useAppSelector from '~hooks/useAppSelector';
import {DeviceScreenProps} from '~routes/interface';
import {ExerciseScheme} from '~lib/femfit/game/interface';
import exercises from '~lib/femfit/game/exercises.json';
import Popup from '~components/Popup';
import {getEstimatedExerciseDuration} from '~lib/femfit/game/utils';
import NoDevicePopup from '~components/NoDevicePopup';
import PageWrapper from '~components/PageWrapper';
import QuestionnaireModal from '~components/QuestionnaireModal';
import {fetchQuestionnaire} from '~state/ducks/questions/questions.actions';
import useAppDispatch from '~hooks/useAppDispatch';
import {setAnswer} from '~state/ducks/questions/questions.reducer';

const FemfitScreen: React.FC<DeviceScreenProps<'Femfit'>> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [exercise, setExercise] = useState<ExerciseScheme>();
  const {authUser} = useAppSelector((state) => state.auth);
  const {questionnaire, loading, answers} = useAppSelector(
    (state) => state.questions,
  );
  const [noDeviceModalVisible, setNoDeviceModalVisible] =
    useState<boolean>(false);
  const [modalItem, setModalItem] = useState<ExerciseScheme>();
  const device = useAppSelector((state) =>
    find(state.bluetooth.connectedDevices, (d) => d.type === 'femfit'),
  );

  useEffect(() => {
    if (authUser) {
      dispatch(fetchQuestionnaire({sensor: 'femfit', userId: authUser.id}));
    }
  }, []);

  const shouldRenderGame = () =>
    device &&
    exercise &&
    (questionnaire !== undefined ? answers.length > 0 : true);

  useEffect(() => {
    setNoDeviceModalVisible(device === undefined);
  }, [device]);

  const handleAnswers = (data: number[]) => {
    if (authUser) {
      dispatch(setAnswer({userId: authUser.id, answers: data}));
    }
  };

  const toggleNoDeviceModal = () => {
    setNoDeviceModalVisible(!noDeviceModalVisible);
  };

  const selectExercise = (item: ExerciseScheme) => {
    setExercise(item);
  };

  const toggleDetails = (item?: ExerciseScheme) => {
    if (!item) {
      setModalItem(undefined);
    } else {
      setModalItem(item);
    }
  };

  const render = () => {
    if (shouldRenderGame()) {
      return (
        <SafeAreaView style={styles.wrapper}>
          <FemfitGame
            device={device!}
            exercise={exercise!}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    } else if (loading) {
      return (
        <SafeAreaView style={styles.loader}>
          <ActivityIndicator animating={true} />
        </SafeAreaView>
      );
    }
    return (
      <PageWrapper title="Select exercise" contentSize="medium">
        <ScrollView style={styles.exerciseList}>
          {(exercises as ExerciseScheme[]).map((item, idx) => (
            <Card style={styles.item} key={idx}>
              <Card.Content style={styles.itemContent}>
                <Card.Title
                  title={item.name}
                  subtitle={item.description}
                  subtitleNumberOfLines={2}
                />
                <Card.Actions style={styles.actions}>
                  <Button onPress={() => toggleDetails(item)}>Details</Button>
                  <Button onPress={() => selectExercise(item)} mode="contained">
                    Start exercise
                  </Button>
                </Card.Actions>
              </Card.Content>
            </Card>
          ))}
          <QuestionnaireModal
            onSubmit={handleAnswers}
            visible={exercise !== undefined && answers.length === 0}
            questionnaire={questionnaire}
          />
          <Popup
            title="Details"
            visible={modalItem !== undefined}
            contentContainerStyle={styles.detailPopup}
            onDismiss={() => toggleDetails(undefined)}
            actions={
              <Button onPress={() => toggleDetails(undefined)}>Close</Button>
            }>
            <Text style={styles.detailTitle}>{modalItem?.name}</Text>
            <ScrollView>
              <Paragraph>{modalItem?.description}</Paragraph>
            </ScrollView>
            {modalItem?.data && (
              <Text style={styles.detailDuration}>
                Estimated duration:&nbsp;
                <Text>{getEstimatedExerciseDuration(modalItem)} seconds</Text>
              </Text>
            )}
          </Popup>
          <NoDevicePopup
            deviceName="Femfit"
            visible={noDeviceModalVisible}
            onDismiss={toggleNoDeviceModal}
          />
        </ScrollView>
      </PageWrapper>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseList: {
    marginTop: 16,
  },
  item: {
    marginBottom: 16,
  },
  itemContent: {
    padding: 0,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  detailPopup: {
    width: '90%',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailDuration: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 4,
    justifyContent: 'space-between',
  },
});

export default FemfitScreen;
