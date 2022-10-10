import {Engine} from 'matter-js';
import {Dimensions} from 'react-native';
import {Entities} from 'react-native-game-engine';

import {getPipeSizePosPair} from '../utils';

import Bird from './Bird';
import Floor from './Floor';
import Obstacle from './Obstacle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getEntities = (): Entities => {
  const engine = Engine.create({enableSleeping: false});
  const world = engine.world;
  engine.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);
  return {
    physics: {engine, world},
    Bird: Bird(world, 'green', {x: 200, y: 200}, {width: 40, height: 40}),
    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'red',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'red',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'red',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),
    Floor: Floor(
      world,
      'green',
      {x: windowWidth / 2, y: windowHeight - 150},
      {width: windowWidth, height: 40},
    ),
  };
};

export default getEntities;
