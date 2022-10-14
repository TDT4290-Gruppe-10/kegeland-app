import Matter from 'matter-js';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import CoinSprite from '~assets/femfit/gold.png';

import constants from '../constants';
import {Position} from '../interface';

class Coin extends React.Component<any> {
  render(): React.ReactNode {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Animated.Image
        style={[styles.entity, {left: x, top: y, width, height}]}
        resizeMode="stretch"
        source={CoinSprite}
      />
    );
  }
}

const styles = StyleSheet.create({
  entity: {
    position: 'absolute',
    borderColor: 'green',
    borderWidth: 2,
  },
});

export default (world: Matter.World, pos: Position) => {
  const body = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    constants.COIN_WIDTH,
    constants.COIN_HEIGHT,
    {
      label: `Coin`,
      isStatic: false,
    },
  );
  Matter.World.add(world, body);

  return {body, scored: false, renderer: <Coin />};
};
