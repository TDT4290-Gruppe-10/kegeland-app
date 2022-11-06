import React from 'react';

import {render} from '~utils/test-utils';

import SettingsRoutes from '../SettingsRoutes';

describe('Test SettingsRoutes-component', () => {
  it('should render correctly', () => {
    const component = <SettingsRoutes />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
