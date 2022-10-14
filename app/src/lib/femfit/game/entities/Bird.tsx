import React from 'react';
import Matter from 'matter-js';
import {StyleSheet} from 'react-native';

import BirdSpriteSheet from '~assets/femfit/bird.png';

import constants from '../constants';
import {Position} from '../interface';
import {SpriteSheet} from '../SpriteSheet';

// type BirdProps = {
//   body: Matter.Body;
// };

class Bird extends React.Component<any> {
  render(): React.ReactNode {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <SpriteSheet
        src={BirdSpriteSheet}
        rows={1}
        cols={3}
        anims={[{name: 'default', row: 0, frames: 3}]}
        defaultAnim="default"
        style={[styles.entity, {left: x, top: y, width, height}]}
      />
    );
  }
}

const styles = StyleSheet.create({
  entity: {
    position: 'absolute',
    aspectRatio: 1,
    borderColor: 'green',
    borderWidth: 2,
  },
});

export default (world: Matter.World, pos: Position) => {
  const body = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    constants.BIRD_WIDTH,
    constants.BIRD_WIDTH,
    {
      label: 'Bird',
      frictionAir: 0,
      friction: 0,
      restitution: 0,
      inertia: Infinity,
    },
  );
  Matter.World.add(world, body);

  return {body, renderer: <Bird />};
};
