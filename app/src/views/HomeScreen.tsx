import {find} from 'lodash';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FemfitGame from '~lib/femfit/game';
import useAppSelector from '~hooks/useAppSelector';

const HomeScreen: React.FC = () => {
  const device = useAppSelector((state) =>
    find(
      state.bluetooth.connectedDevices,
      (device) => device.type === 'femfit',
    ),
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      {device && <FemfitGame device={device} />}
      {/* {device && <FemfitDebugger device={device} />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
});

export default HomeScreen;
