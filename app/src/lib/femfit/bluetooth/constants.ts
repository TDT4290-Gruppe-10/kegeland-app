import {BluetoothService} from '~constants/bluetooth/interface';

export const PRESSURE_SENSOR_MIN_VAL = 760;
export const PRESSURE_SENSOR_MAX_VAL = 970;
export const ACTIVATION_THRESHOLD = 0.15;

export const SERVICES = {
  HOUSEKEEPING_SERVICE: 'b92a0001-4bf9-4870-8aa1-881b3a20ada4',
  SENSOR_SERVICE: '0d9e0001-c111-49cd-bba3-85c7471cb6fa',
};

export const HOUSEKEEPING_SERVICE: BluetoothService = {
  uuid: 'b92a0001-4bf9-4870-8aa1-881b3a20ada4',
  characteristics: ['b92a0002-4bf9-4870-8aa1-881b3a20ada4'],
};

export const SENSOR_SERVICE: BluetoothService = {
  uuid: '0d9e0001-c111-49cd-bba3-85c7471cb6fa',
  characteristics: [
    '0d9e0002-c111-49cd-bba3-85c7471cb6fa',
    // '0d9e0003-c111-49cd-bba3-85c7471cb6fa',
    '0d9e0004-c111-49cd-bba3-85c7471cb6fa',
    '0d9e0005-c111-49cd-bba3-85c7471cb6fa',
  ],
};
