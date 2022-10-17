import React from 'react';
import Matter from 'matter-js';
import {Image} from 'react-native';

import CoinSprite from '~assets/femfit/gold.png';

import {EntityBase, Position} from '../interface';
import constants from '../constants';

import styles from './styles';

const {COIN_SIZE} = constants;

export type CoinEntity = EntityBase & {
  scored: boolean;
};

class Coin extends React.Component<CoinEntity> {
  render(): React.ReactNode {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    return (
      <Image
        style={[
          styles.entity,
          {
            left: x,
            top: y,
            width,
            height,
          },
        ]}
        resizeMode="stretch"
        source={CoinSprite}
      />
    );
  }
}

export default (world: Matter.World, pos: Position, label: string) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, COIN_SIZE, COIN_SIZE, {
    label,
    isSensor: true,
    isStatic: true,
  });
  Matter.World.add(world, body);
  return {body, scored: false, renderer: Coin};
};
