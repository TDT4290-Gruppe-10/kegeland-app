import Matter from 'matter-js';

import Coin, {CoinProps} from './entities/Coin.entity';

import constants from './constants';
import {ExerciseScheme, GameEntities, Position} from './interface';

const {MAX_WIDTH, BASELINE, COIN_SIZE, PLAYER_SIZE, COINS_PER_SEC} = constants;

export const getMaxExerciseScore = (exercise: ExerciseScheme) => {
  const {data, repetitions} = exercise;
  const denominator = 1000 / COINS_PER_SEC;
  return (
    (data.reduce((prev, curr) => prev + curr[1], 0) / denominator) * repetitions
  );
};

export const getEstimatedExerciseDuration = (exercise: ExerciseScheme) => {
  const {data, repetitions} = exercise;
  return (data.reduce((prev, curr) => prev + curr[1], 0) / 1000) * repetitions;
};

export const isCoinBody = (body: Matter.Body) => {
  return body.isSensor && body.label.startsWith('coin_');
};

export const shouldDeleteCoin = (coin: CoinProps) =>
  coin.scored || coin.body.position.x < 0;

export const spawnCoins = (
  engine: Matter.Engine,
  entities: GameEntities,
  pointer: number,
  data: [number, number],
) => {
  const [level, ms] = data;
  const denominator = 1000 / COINS_PER_SEC;
  const numCoins = Math.trunc(ms / denominator);
  for (let i = 0; i < numCoins; i++) {
    pointer++;
    const label = `coin_${pointer}`;
    const pos: Position = {
      x: MAX_WIDTH + COIN_SIZE * 2 * i,
      y: BASELINE - BASELINE * level - PLAYER_SIZE / 2,
    };
    entities[label] = Coin(engine.world, pos, label);
  }
  return pointer;
};
