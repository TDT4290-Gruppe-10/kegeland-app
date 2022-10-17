import Matter from 'matter-js';

import {CoinEntity} from './entities/Coin';

import constants from './constants';
import {IGameEngineSystem} from './interface';
import {isCoinBody, shouldDeleteCoin, spawnCoins} from './utils';

let coinPointer = 0;
let canSpawn = true;
let finished = false;

const {MAX_WIDTH, GRAVITY, BASELINE, PLAYER_SIZE} = constants;

const Physics: IGameEngineSystem = (entities, {time, events, dispatch}) => {
  const engine = entities.physics.engine;
  const player = entities.player.body;
  const exercise = entities.exercise;

  Object.keys(entities).forEach((key) => {
    if (key.indexOf('coin_') === 0) {
      if (shouldDeleteCoin(entities[key] as CoinEntity)) {
        Matter.World.remove(engine.world, entities[key].body);
        delete entities[key];
      } else {
        Matter.Body.translate(entities[key].body, {x: -3, y: 0});
        if (!canSpawn) {
          if (
            key === `coin_${coinPointer}` &&
            entities[key].body.position.x < MAX_WIDTH / 2
          ) {
            if (exercise.currRep === exercise.repetitions) {
              finished = true;
            } else {
              canSpawn = true;
            }
          }
        }
      }
    }
  });

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'beforeUpdate', () => {
    events
      .filter((event) => event.type === 'move_up')
      .forEach((event) => {
        const yCoeff = (BASELINE - player.position.y) / BASELINE;
        const force = -25 * (event.value - yCoeff);
        Matter.Body.setVelocity(player, {x: 0, y: force});
      });
  });

  Matter.Events.on(engine, 'afterUpdate', () => {
    // Set gravity
    switch (true) {
      // Player is at baseline
      case player.position.y > BASELINE - 3 && player.position.y < BASELINE + 3:
        Matter.Body.setVelocity(player, {x: 0, y: 0});
        engine.gravity.y = 0;
        break;
      // Player is above baseline
      case player.position.y < BASELINE:
        engine.gravity.y = GRAVITY;
        break;
      // Player is below baseline
      default:
        Matter.Body.setPosition(player, {
          x: player.position.x,
          y: BASELINE - PLAYER_SIZE / 2,
        });
    }

    // Dispatch 'game over'-event when the number of repetitions is reached
    if (finished && !(`coin_${coinPointer}` in entities)) {
      dispatch({type: 'game_over'});
    }

    if (canSpawn) {
      canSpawn = false;

      coinPointer = spawnCoins(
        engine,
        entities,
        coinPointer,
        exercise.data[exercise.currStep],
      );

      // Increment exercise step index
      exercise.currStep = (exercise.currStep + 1) % exercise.data.length;

      // If next index is the first step, increment repetition counter
      if (exercise.currStep === 0) {
        exercise.currRep++;
      }
    }
  });

  Matter.Events.on(engine, 'collisionStart', (e) => {
    for (const pair of e.pairs) {
      const {bodyA, bodyB} = pair;
      if (!bodyA.isSensor && !bodyB.isSensor) {
        continue;
      }
      const coin = isCoinBody(bodyB) ? bodyB : bodyA;
      if (coin.label in entities) {
        if (!entities[coin.label].scored) {
          dispatch({type: 'score'});
          entities[coin.label].scored = true;
        }
      }
    }
  });

  return entities;
};

export default Physics;
