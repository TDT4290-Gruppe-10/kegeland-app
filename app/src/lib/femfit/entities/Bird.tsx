import React from 'react';
import {World, Bodies} from 'matter-js';
import {StyleSheet, View} from 'react-native';
import {Entity, EntityProps} from 'react-native-game-engine';

import {EntitySize, Position} from '../interface';

interface BirdEntityProps extends EntityProps {
  color: string;
}

const Bird: React.FC<BirdEntityProps> = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={[
        styles.entity,
        {
          borderColor: color,
          left: xBody,
          top: yBody,
          width: widthBody,
          height: heightBody,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  entity: {
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
  },
});

export default (
  world: World,
  color: string,
  pos: Position,
  size: EntitySize,
): Entity<BirdEntityProps> => {
  const initialEntity = Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Bird'},
  );
  World.add(world, initialEntity);

  return {
    body: initialEntity,
    color,
    pos,
    renderer: Bird,
  };
};
