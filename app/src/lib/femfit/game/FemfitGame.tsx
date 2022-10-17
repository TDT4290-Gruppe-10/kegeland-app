import React, {ReactNode, PureComponent} from 'react';
import {StatusBar, StyleSheet, View, Image} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {GameEngine} from 'react-native-game-engine';
import {max, reduce, round, set} from 'lodash';

import BackgroundImage from '~assets/femfit/background.png';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';
import {PeripheralNotification} from '~constants/bluetooth/interface';
import {addServiceListener, removeServiceListener} from '~utils/bluetooth';
import {bleManagerEmitter} from '~hooks/useBluetooth';
import {UPDATE_INTERVAL_MS} from '~constants/bluetooth';
import {ExerciseScreenProps} from '~routes/interface';

import {ACTIVATION_THRESHOLD, SENSOR_SERVICE} from '../bluetooth/constants';
import {pressurePercent, readSensorBytes} from '../bluetooth/utils';

import GameOverDialog from './components/GameOverDialog';
import MenuDialog from './components/MenuDialog';
import Header from './components/Header';

import spawnEntities from './entities';
import {ExerciseScheme, GameEntities} from './interface';
import Physics from './physics';
import constants from './constants';

const {MAX_HEIGHT, MAX_WIDTH} = constants;

type FemfitGameProps = {
  device: BluetoothDevice;
  navigation: ExerciseScreenProps<'Femfit'>['navigation'];
  goBack: () => void;
};

type FemfitGameState = {
  running: boolean;
  gameOver: boolean;
  score: number;
  gameOverDialogVisible: boolean;
};

export default class FemfitGame extends PureComponent<
  FemfitGameProps,
  FemfitGameState
> {
  gameEngine: any | null;
  exerciseScheme: ExerciseScheme;
  entities: GameEntities;
  sensorData: Record<string, number[]>;
  interval: any;
  constructor(props: any) {
    super(props);
    this.gameEngine = null;
    this.exerciseScheme = require('./exercise_1.json') as ExerciseScheme;
    this.entities = spawnEntities(this.exerciseScheme);
    this.sensorData = reduce(
      SENSOR_SERVICE.characteristics,
      (prev, curr) => {
        prev[curr] = [];
        return prev;
      },
      {} as Record<string, number[]>,
    );
    this.interval = null;
    this.state = {
      running: true,
      gameOver: false,
      score: 0,
      gameOverDialogVisible: false,
    };
  }

  toggleMenuDialog() {
    this.setState({...this.state, running: !this.state.running});
  }

  toggleGameOverDialog() {
    this.setState({
      ...this.state,
      gameOverDialogVisible: !this.state.gameOverDialogVisible,
    });
  }

  handlePeripheralUpdate({characteristic, value}: PeripheralNotification) {
    if (characteristic in this.sensorData) {
      set(this.sensorData, characteristic, value);
    }
  }

  componentDidMount(): void {
    SystemNavigationBar.navigationHide();
    this.gameEngine.swap(spawnEntities(this.exerciseScheme));
    if (this.props.device && this.props.device.state === 'connected') {
      addServiceListener(this.props.device.id, SENSOR_SERVICE);
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (data: PeripheralNotification) => this.handlePeripheralUpdate(data),
      );
      this.interval = setInterval(() => {
        const {pressures} = readSensorBytes(Object.values(this.sensorData));
        const pctMax = round(pressurePercent(max(pressures) as number), 1);
        if (pctMax > ACTIVATION_THRESHOLD) {
          this.gameEngine.dispatch({type: 'move_up', value: pctMax});
        }
      }, UPDATE_INTERVAL_MS);
    }
  }

  componentWillUnmount(): void {
    SystemNavigationBar.navigationShow();
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    removeServiceListener(this.props.device.id, SENSOR_SERVICE);
    bleManagerEmitter.removeAllListeners(
      'BleManagerDidUpdateValueForCharacteristic',
    );
  }

  render(): ReactNode {
    return (
      <View style={styles.container}>
        <Image
          source={BackgroundImage}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <Header
          score={this.state.score}
          toggle={() => this.toggleMenuDialog()}
        />
        <View style={styles.container}>
          <StatusBar hidden />
          <GameEngine
            ref={(ref) => {
              this.gameEngine = ref;
            }}
            running={this.state.running}
            entities={this.entities}
            style={styles.gameContainer}
            onEvent={(event: any) => {
              switch (event.type) {
                case 'score':
                  this.setState({
                    ...this.state,
                    score: this.state.score + 1,
                  });
                  break;
                case 'game_over':
                  if (!this.state.gameOver) {
                    this.setState(
                      {
                        ...this.state,
                        running: false,
                        gameOver: true,
                      },
                      () => {
                        this.toggleGameOverDialog();
                      },
                    );
                  }
                  break;
              }
            }}
            systems={[Physics]}
          />
        </View>
        <MenuDialog
          visible={!this.state.running && !this.state.gameOver}
          onDismiss={() => this.toggleMenuDialog()}
          goBack={() => this.props.goBack()}
        />
        <GameOverDialog
          score={this.state.score}
          exercise={this.exerciseScheme}
          visible={this.state.gameOverDialogVisible}
          onDismiss={() => this.toggleGameOverDialog()}
          goBack={() => this.props.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
