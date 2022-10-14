import {max, reduce, round, set} from 'lodash';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

import {UPDATE_INTERVAL_MS} from '~constants/bluetooth';
import {PeripheralNotification} from '~constants/bluetooth/interface';
import {bleManagerEmitter} from '~hooks/useBluetooth';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';
import {addServiceListener, removeServiceListener} from '~utils/bluetooth';
import BackgroundImage from '~assets/femfit/background.png';

import {ACTIVATION_THRESHOLD, SENSOR_SERVICE} from '../bluetooth/constants';
import {pressurePercent, readSensorBytes} from '../bluetooth/utils';

import constants from './constants';
import entities from './entities';
import Physics from './physics';

type FemfitGameProps = {
  device: BluetoothDevice;
};

const FemfitGame: React.FC<FemfitGameProps> = ({device}) => {
  const gameRef = useRef<any>(null);
  const sensorData = reduce(
    SENSOR_SERVICE.characteristics,
    (prev, curr) => {
      prev[curr] = [];
      return prev;
    },
    {} as Record<string, number[]>,
  );

  const handlePeripheralUpdate = ({
    characteristic,
    value,
  }: PeripheralNotification) => {
    if (characteristic in sensorData) {
      set(sensorData, characteristic, value);
    }
  };

  useEffect(() => {
    let interval: any | null = null;
    console.log(device);
    if (device && device.state === 'connected') {
      if (gameRef.current) {
        gameRef.current.swap(entities());
      }
      addServiceListener(device.id, SENSOR_SERVICE);
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (data: PeripheralNotification) => handlePeripheralUpdate(data),
      );
      interval = setInterval(() => {
        const {pressures} = readSensorBytes(Object.values(sensorData));
        const pctMax = round(pressurePercent(max(pressures) as number), 1);
        if (pctMax > ACTIVATION_THRESHOLD) {
          gameRef.current.dispatch({type: 'move_up', value: pctMax});
        }
      }, UPDATE_INTERVAL_MS);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      removeServiceListener(device.id, SENSOR_SERVICE);
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
      );
    };
  }, [device]);

  return (
    <View style={styles.container}>
      <Image
        source={BackgroundImage}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={gameRef}
        systems={[Physics]}
        entities={entities()}
        running={true}
        style={styles.gameContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: constants.MAX_WIDTH,
    height: constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default FemfitGame;
// export default memo(FemfitGame, (prevProps, nextProps) => {
//   return prevProps.device === nextProps.device;
// });
