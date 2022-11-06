import React, {useState} from 'react';
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
import PageWrapper from '~components/PageWrapper';
import {WithDeviceContext} from '~hoc/withDevice';
import {WithQuestionnaireContext} from '~hoc/withQuestionnaire';

export type FemfitScreenProps = DeviceScreenProps<'Femfit'> &
  WithDeviceContext &
  WithQuestionnaireContext;

const FemfitScreen: React.FC<FemfitScreenProps> = ({
  navigation,
  answers,
  device,
  questionnaireEnabled,
  questionnaireLoading,
  toggleQuestionnaire,
}) => {
  const {currentSession} = useAppSelector((state) => state.session);
  const [exercise, setExercise] = useState<ExerciseScheme>();
  const [modalItem, setModalItem] = useState<ExerciseScheme>();

  const shouldRenderGame = () => {
    if (device && exercise && !questionnaireLoading) {
      if (questionnaireEnabled) {
        if (currentSession === undefined && answers.length === 1) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  };

  const selectExercise = (item: ExerciseScheme) => {
    setExercise(item);
    toggleQuestionnaire();
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
    } else if (questionnaireLoading) {
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
