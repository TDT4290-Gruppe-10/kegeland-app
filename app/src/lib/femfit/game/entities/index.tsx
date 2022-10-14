import Matter from 'matter-js';

import constants from '../constants';

import Bird from './Bird';

export default () => {
  const engine = Matter.Engine.create({enableSleeping: true});
  const world = engine.world;
  engine.gravity.y = constants.GRAVITY_Y;

  return {
    physics: {engine, world},
    Bird: Bird(world, {
      x: constants.BIRD_WIDTH,
      y: constants.MAX_HEIGHT / 2 - constants.BIRD_HEIGHT / 2,
    }),
  };
};
