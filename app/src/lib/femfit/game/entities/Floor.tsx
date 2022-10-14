import React from 'react';
import Matter from 'matter-js';
import {StyleSheet, View} from 'react-native';

import {Position} from '../interface';
import constants from '../constants';

class Floor extends React.Component<any> {
  render(): React.ReactNode {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    return <View style={[styles.entity, {left: x, top: y, width, height}]} />;
  }
}

const styles = StyleSheet.create({
  entity: {
    position: 'absolute',
    backgroundColor: 'red',
  },
});

export default (world: Matter.World, pos: Position) => {
  const body = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    constants.MAX_WIDTH,
    constants.MAX_HEIGHT / 2 - constants.BIRD_HEIGHT,
    {
      label: `Floor`,
      isStatic: true,
      friction: 0,
      restitution: 1,
      density: 1,
      frictionAir: 0,
    },
  );
  Matter.World.add(world, body);

  return {body, renderer: <Floor />};
};
