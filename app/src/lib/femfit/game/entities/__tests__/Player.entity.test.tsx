import React from 'react';
import Matter from 'matter-js';

import {render} from '~utils/test-utils';

import {PlayerRenderer, PlayerProps} from '../Player.entity';
import constants from '../../constants';
import {Position} from '../../interface';

const {PLAYER_SIZE} = constants;
describe('Test Player-entity', () => {
  it('should render correctly', () => {
    const pos: Position = {x: 100, y: 100};
    const props: PlayerProps = {
      body: Matter.Bodies.rectangle(pos.x, pos.y, PLAYER_SIZE, PLAYER_SIZE, {
        label: 'Player',
        restitution: 0,
        density: 0.0025,
        frictionAir: 0.015,
      }),
    };
    const component = <PlayerRenderer {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
