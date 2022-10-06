import React from 'react';

import useBluetooth from '~hooks/useBluetooth';

export type WithBluetoothProps = {
  children: React.ReactNode;
} & any;

/**
 * Higher-order component for wrapping sub-components with bluetooth functionality
 * @param param0 any params
 * @returns children component wrapped with bluetooth functionality
 */
const WithBluetooth: React.FC<WithBluetoothProps> = ({children}) =>
  useBluetooth() && children;

export default WithBluetooth;
