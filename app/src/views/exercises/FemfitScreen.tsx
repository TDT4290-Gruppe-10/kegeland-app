import {find} from 'lodash';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

import FemfitGame from '~lib/femfit/game';
import useAppSelector from '~hooks/useAppSelector';
import {ExerciseScreenProps} from '~routes/interface';

const FemfitScreen: React.FC<ExerciseScreenProps<'Femfit'>> = ({
  navigation,
}) => {
  const device = useAppSelector((state) =>
    find(
      state.bluetooth.connectedDevices,
      (device) => device.type === 'femfit',
    ),
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Button onPress={() => navigation.goBack()}>Go back</Button>
      </View>
      {device && <FemfitGame device={device} />}
      {/* {device && <FemfitDebugger device={device} />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
});

export default FemfitScreen;
