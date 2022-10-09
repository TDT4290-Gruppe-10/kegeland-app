import React from 'react';

import useBluetooth from '~hooks/useBluetooth';

const withBluetooth =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    useBluetooth();
    return <Component {...props} />;
  };

export default withBluetooth;
