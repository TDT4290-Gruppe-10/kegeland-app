import {capitalize, clone, forEach, reduce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {ImageSourcePropType, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, List, useTheme} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import {BLE_PROFILES, DeviceType} from '~constants/bluetooth';
import {DeviceScreenProps} from '~routes/interface';
import FemfitImage from '~assets/devices/femfit.png';
import useAppSelector from '~hooks/useAppSelector';
import PageWrapper from '~components/PageWrapper';
import {getDeviceScreen} from '~utils/bluetooth';
import QuestionnaireModal from '~components/QuestionnaireModal';
import useAppDispatch from '~hooks/useAppDispatch';
import {
  clearAnswers,
  setAnswer,
} from '~state/ducks/questions/questions.reducer';
const deviceTypes = Object.keys(BLE_PROFILES);

const imgMap: Record<DeviceType, ImageSourcePropType> = {
  femfit: FemfitImage,
};

const initialDeviceMap = reduce(
  deviceTypes,
  (prev, curr) => {
    prev[curr as DeviceType] = false;
    return prev;
  },
  {} as Record<DeviceType, boolean>,
);

const DevicesScreen: React.FC<DeviceScreenProps<'Devices'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const {colors, roundness} = useTheme();
  const {session} = useAppSelector((state) => state.session);
  const {authUser} = useAppSelector((state) => state.auth);
  const {questionnaire, answers} = useAppSelector((state) => state.questions);
  const [devices, setDevices] =
    useState<Record<DeviceType, boolean>>(initialDeviceMap);
  const {connectedDevices} = useAppSelector((state) => state.bluetooth);
  const [showQuestionnaire, setShowQuestionnaire] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (session && questionnaire) {
        if (answers.length === 1) {
          setShowQuestionnaire(true);
        }
      }
      return () => {
        dispatch(clearAnswers());
      };
    }, [session, questionnaire]),
  );

  useEffect(() => {
    const tmp = clone(initialDeviceMap);
    forEach(connectedDevices, (device) => {
      tmp[device.type] = true;
    });
    setDevices(tmp);
  }, [connectedDevices]);

  useEffect(() => {
    if (session && questionnaire) {
      if (answers.length === 2) {
        dispatch(clearAnswers());
        console.log('upload session data');
      }
    }
  }, [session, answers, questionnaire]);

  const handleAnswers = (data: number[]) => {
    setShowQuestionnaire(false);
    if (authUser) {
      dispatch(setAnswer({userId: authUser.id, answers: data}));
    }
  };

  return (
    <PageWrapper title="Select device" contentSize="medium">
      <ScrollView style={styles.deviceList}>
        {Object.entries(devices).map(([type, connected]) => (
          <List.Item
            key={type}
            style={{
              backgroundColor: colors.elevation.elevation1,
              borderRadius: roundness,
            }}
            title={capitalize(type)}
            description={connected ? 'Connected' : 'Not connected'}
            left={() => (
              <Avatar.Image
                style={[
                  {backgroundColor: colors.placeholder},
                  styles.listItemExtra,
                ]}
                size={48}
                source={imgMap[type as DeviceType]}
              />
            )}
            right={() => (
              <Button
                mode="contained"
                style={styles.listItemExtra}
                disabled={!connected}
                onPress={() =>
                  navigation.navigate(getDeviceScreen(type as DeviceType))
                }>
                Select
              </Button>
            )}
          />
        ))}
      </ScrollView>
      <QuestionnaireModal
        onSubmit={handleAnswers}
        visible={showQuestionnaire}
        questionnaire={questionnaire}
      />
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
  deviceList: {
    marginTop: 16,
  },
  listItemExtra: {
    alignSelf: 'center',
  },
});

export default DevicesScreen;
