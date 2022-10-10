import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Button} from 'react-native-paper';

import getEntities from './entities';
import Physics from './physics';

const FemfitGame: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const gameRef = useRef<React.ComponentRef<typeof GameEngine>>(null);

  return (
    <View>
      <Button
        onPress={() => {
          if (!running) {
            setRunning(true);
            gameRef.current!.swap(getEntities());
          } else {
            setRunning(false);
          }
        }}>
        {!running ? 'Start game' : 'Pause game'}
      </Button>
      <GameEngine
        ref={gameRef}
        systems={[Physics]}
        entities={getEntities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameRef.current!.stop();
              setPoints(0);
              break;
            case 'new_point':
              setPoints(points + 10);
              break;
          }
        }}
        style={styles.game}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  game: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default FemfitGame;
