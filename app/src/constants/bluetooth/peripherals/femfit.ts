import {readSensorCharacteristic} from '~utils/femfit';

import {BluetoothProfile} from '../interface';

export const SERVICES = {
  HOUSEKEEPING_SERVICE: 'b92a0001-4bf9-4870-8aa1-881b3a20ada4',
  SENSOR_SERVICE: '0d9e0001-c111-49cd-bba3-85c7471cb6fa',
};

export const CHARACTERISTICS = {
  HOUSEKEEPING_CHAR: 'b92a0002-4bf9-4870-8aa1-881b3a20ada4',
  SENSOR_1_2: '0d9e0002-c111-49cd-bba3-85c7471cb6fa',
  SENSOR_3_4: '0d9e0003-c111-49cd-bba3-85c7471cb6fa',
  SENSOR_5_6: '0d9e0004-c111-49cd-bba3-85c7471cb6fa',
  SENSOR_7_8: '0d9e0005-c111-49cd-bba3-85c7471cb6fa',
  SENSOR: '0d9e0006-c111-49cd-bba3-85c7471cb6fa',
};

export const FEMFIT_PROFILE: BluetoothProfile = {
  notifyChannels: {
    [SERVICES.HOUSEKEEPING_SERVICE]: [],
    [SERVICES.SENSOR_SERVICE]: [
      CHARACTERISTICS.SENSOR_1_2,
      CHARACTERISTICS.SENSOR_3_4,
      CHARACTERISTICS.SENSOR_5_6,
      CHARACTERISTICS.SENSOR_7_8,
    ],
  },
  handlers: {
    [CHARACTERISTICS.SENSOR_1_2]: readSensorCharacteristic,
    [CHARACTERISTICS.SENSOR_3_4]: readSensorCharacteristic,
    [CHARACTERISTICS.SENSOR_5_6]: readSensorCharacteristic,
    [CHARACTERISTICS.SENSOR_7_8]: readSensorCharacteristic,
  },
  characteristics: Object.values(CHARACTERISTICS),
};
