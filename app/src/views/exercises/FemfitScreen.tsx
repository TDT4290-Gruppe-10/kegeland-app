import {find} from 'lodash';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FemfitGame from '~lib/femfit/game';
import useAppSelector from '~hooks/useAppSelector';
import {ExerciseScreenProps} from '~routes/interface';

const FemfitScreen: React.FC<ExerciseScreenProps<'Femfit'>> = ({
  navigation,
}) => {
  const device = useAppSelector((state) =>
    find(state.bluetooth.connectedDevices, (d) => d.type === 'femfit'),
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {device && (
        <FemfitGame device={device} navigation={navigation} goBack={goBack} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
});

export default FemfitScreen;
