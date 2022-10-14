import {round} from 'lodash';
import Matter from 'matter-js';
import {GameEngineSystem} from 'react-native-game-engine';

// import Coin from './entities/Coin';

import constants from './constants';

const center = constants.MAX_HEIGHT / 2;
let tick = 0;
let coinPose = 0;
// let coins = 0;
let prevTime: number | null;

// const spawnCoins = (
//   entities: any,
//   engine: Matter.Engine,
//   nCoins: number,
//   yPos: number,
// ) => {
//   const x = constants.MAX_WIDTH / 2;
//   for (let i = 0; i < nCoins; i++) {
//     coins++;
//     const xOffset = i * 40;
//     entities[`Coin${coins}`] = Coin(engine.world, {x: x + xOffset, y: yPos});
//   }
// };

const Physics: GameEngineSystem = (entities, {time, events}) => {
  const engine = entities.physics.engine;
  const player = entities.Bird;

  if (!prevTime) {
    prevTime = time.current;
  }

  events.forEach((event) => {
    switch (event.type) {
      case 'move_up':
        // eslint-disable-next-line no-case-declarations
        const yCoeff = (center - player.body.position.y) / center;
        // eslint-disable-next-line no-case-declarations
        const yForce = round(
          -constants.PLAYER_VELOCITY_Y * (event.value - yCoeff),
          0,
        );
        console.log(yForce);
        Matter.Body.setVelocity(player.body, {x: 0, y: yForce});

        break;
    }
  });

  Object.keys(entities).forEach((key) => {
    if (key.indexOf('Coin') === 0) {
      if (entities[key].scored || entities[key].body.position.x < 0) {
        delete entities[key];
      } else {
        Matter.Body.translate(entities[key].body, {x: -3, y: 0});
      }
    }
  });

  Matter.Engine.update(engine, time.delta);

  // Update sprites
  tick += 1;
  if (tick % 5 === 0) {
    coinPose = (coinPose + 1) % 10;
  }

  // if (prevTime && time.current - prevTime >= 10000) {
  //   prevTime = time.current;
  //   spawnCoins(
  //     entities,
  //     engine,
  //     5,
  //     constants.MAX_HEIGHT / 2 - constants.COIN_HEIGHT,
  //   );

  //   console.log(Object.keys(entities));
  // }

  const playerY = (player.body.bounds.min.y + player.body.bounds.max.y) / 2;

  if (
    playerY > constants.MAX_HEIGHT / 2 - constants.BIRD_HEIGHT / 2 &&
    playerY < constants.MAX_HEIGHT / 2 + constants.BIRD_HEIGHT / 2
  ) {
    engine.gravity.y = 0;
    Matter.Body.setVelocity(player.body, {x: 0, y: 0});
  } else if (playerY < constants.MAX_HEIGHT / 2) {
    engine.gravity.y = 0.3;
  } else {
    engine.gravity.y = -0.3;
  }
  Matter.Events.on(engine, 'collisionStart', (e) => {
    for (const pair of e.pairs) {
      const {bodyA, bodyB} = pair;
      if (!bodyA.isSensor && !bodyB.isSensor) continue;
      console.log(bodyB.label);
      if (bodyB.label in entities) {
        entities[bodyB.label].scored = true;
      }
    }
  });

  return entities;
};

export default Physics;
