import React from 'react';

import {render} from '~utils/test-utils';

import ThemeSwitch from '../ThemeSwitch';

describe('Test ThemeSwitch-component', () => {
  it('should render correctly', () => {
    const component = <ThemeSwitch />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
