import {find} from 'lodash';
import {Engine, Body, Events} from 'matter-js';
import {Dimensions} from 'react-native';
import {GameEngineSystem} from 'react-native-game-engine';

import {getPipeSizePosPair} from './utils';

const windowWidth = Dimensions.get('window').width;

const Physics: GameEngineSystem = (entities, {touches, time, dispatch}) => {
  const engine = entities.physics.engine;
  if (find(touches, (t) => t.type === 'press')) {
    Body.setVelocity(entities.Bird.body, {
      x: 0,
      y: -8,
    });
  }

  Engine.update(engine, time.delta);
  for (let i = 1; i <= 2; i++) {
    if (
      entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${i}`].point
    ) {
      entities[`ObstacleTop${i}`].point = true;
      dispatch({type: 'new_point'});
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const {pipeTop, pipeBottom} = getPipeSizePosPair(windowWidth * 0.9);
      Body.setPosition(entities[`ObstacleTop${i}`].body, pipeTop.pos);
      Body.setPosition(entities[`ObstacleBottom${i}`].body, pipeBottom.pos);
    }

    Body.translate(entities[`ObstacleTop${i}`].body, {x: -3, y: 0});
    Body.translate(entities[`ObstacleBottom${i}`].body, {x: -3, y: 0});
  }

  Events.on(engine, 'collisionStart', () => {
    dispatch({type: 'game_over'});
  });

  return entities;
};

export default Physics;
