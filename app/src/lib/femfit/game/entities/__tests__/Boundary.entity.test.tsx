import React from 'react';
import Matter from 'matter-js';

import {render} from '~utils/test-utils';

import {BoundaryRenderer, BoundaryProps} from '../Boundary.entity';
import constants from '../../constants';
import {Position} from '../../interface';

const {MAX_WIDTH, BOUNDARY_HEIGHT} = constants;
describe('Test Boundary-entity', () => {
  it('should render correctly', () => {
    const pos: Position = {x: 100, y: 100};
    const props: BoundaryProps = {
      body: Matter.Bodies.rectangle(pos.x, pos.y, MAX_WIDTH, BOUNDARY_HEIGHT, {
        label: 'Test Boundary',
        isStatic: true,
        density: 1,
      }),
    };
    const component = <BoundaryRenderer {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
