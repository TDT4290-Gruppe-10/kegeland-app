import {find} from 'lodash';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FemfitDebugger from '~components/FemfitDebugger';
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
      {device && <FemfitDebugger device={device} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
});

export default HomeScreen;
