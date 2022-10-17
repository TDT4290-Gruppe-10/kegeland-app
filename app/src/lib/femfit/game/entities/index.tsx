import Matter from 'matter-js';

import constants from '../constants';
import {ExerciseScheme} from '../interface';

import Boundary from './Boundary';
import Player from './Player';

const {BASELINE, PLAYER_SIZE, MAX_WIDTH, BOUNDARY_HEIGHT} = constants;

const spawnEntities = (exerciseScheme: ExerciseScheme): any => {
  const engine = Matter.Engine.create({enableSleeping: true});
  const world = engine.world;
  engine.gravity.y = 0;

  return {
    physics: {engine, world},
    exercise: {...exerciseScheme, currRep: 0, currStep: 0},
    player: Player(world, {x: 40, y: BASELINE - PLAYER_SIZE / 2}),
    ceil: Boundary(
      world,
      {x: MAX_WIDTH / 2, y: -BOUNDARY_HEIGHT / 2},
      'Ceiling',
    ),
    floor: Boundary(
      world,
      {x: MAX_WIDTH / 2, y: BASELINE + BOUNDARY_HEIGHT / 2},
      'Floor',
    ),
  };
};

export default spawnEntities;
