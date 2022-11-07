import React from 'react';
import Matter from 'matter-js';

import {render} from '~utils/test-utils';

import {CoinRenderer, CoinProps} from '../Coin.entity';
import constants from '../../constants';
import {Position} from '../../interface';

const {COIN_SIZE} = constants;

describe('Test Coin-entity', () => {
  it('should render correctly', () => {
    const pos: Position = {x: 100, y: 100};
    const props: CoinProps = {
      body: Matter.Bodies.rectangle(pos.x, pos.y, COIN_SIZE, COIN_SIZE, {
        label: 'Coin_1',
        isSensor: true,
        isStatic: true,
      }),
      scored: false,
    };
    const component = <CoinRenderer {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
