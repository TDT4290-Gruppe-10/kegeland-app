import React from 'react';

import useBluetooth from '~hooks/useBluetooth';
import useSilentRefresh from '~hooks/useSilentRefresh';

const withAppWrapper =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    useSilentRefresh();
    useBluetooth();
    return <Component {...props} />;
  };

export default withAppWrapper;
