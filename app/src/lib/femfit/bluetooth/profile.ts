import {BluetoothProfile} from '~constants/bluetooth/interface';

import {HOUSEKEEPING_SERVICE, SENSOR_SERVICE} from './constants';
import {readBattery} from './utils';

export default {
  services: [HOUSEKEEPING_SERVICE.uuid, SENSOR_SERVICE.uuid],
  batteryService: {
    service: HOUSEKEEPING_SERVICE,
    fn: readBattery,
  },
} as BluetoothProfile;
