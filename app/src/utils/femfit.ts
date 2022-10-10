import {chain, clamp, mean, round, zipObject} from 'lodash';

import {
  ACTIVATION_THRESHOLD,
  PRESSURE_SENSOR_MAX_VAL,
  PRESSURE_SENSOR_MIN_VAL,
} from '~constants/bluetooth/peripherals/femfit';
import {CharacteristicValue} from '~state/ducks/bluetooth/bluetooth.interface';

const range = PRESSURE_SENSOR_MAX_VAL - PRESSURE_SENSOR_MIN_VAL;

export const pressurePercent = (value: number) =>
  (value - PRESSURE_SENSOR_MIN_VAL) / range;

export const getMovement = (values: CharacteristicValue[]) => {
  const data = chain(values.slice(1, 5))
    .map((val) => val.slice(0, 2))
    .flatten()
    .chunk(4)
    .map((val) => pressurePercent(mean(val)) > ACTIVATION_THRESHOLD)
    .value();
  return zipObject(['lower', 'upper'], data) as {
    lower: boolean;
    upper: boolean;
  };
};

const convertPressure = (b1: number, b2: number) => {
  return clamp(
    // eslint-disable-next-line no-bitwise
    ((((b1 & 255) << 8) | (b2 & 255)) + 65536) * 0.00750063755,
    PRESSURE_SENSOR_MIN_VAL,
    PRESSURE_SENSOR_MAX_VAL,
  );
};

const convertSensorTemperature = (b: number) => {
  return b * 0.16 + 10.0;
};

export const readSensorCharacteristic = (bytes: number[]) => {
  return [
    round(
      mean([
        convertPressure(bytes[2], bytes[3]),
        convertPressure(bytes[5], bytes[6]),
        convertPressure(bytes[8], bytes[9]),
      ]),
      2,
    ),
    round(
      mean([
        convertPressure(bytes[11], bytes[12]),
        convertPressure(bytes[14], bytes[15]),
        convertPressure(bytes[17], bytes[18]),
      ]),
      2,
    ),
    round(
      mean([
        convertSensorTemperature(bytes[4]),
        convertSensorTemperature(bytes[7]),
        convertSensorTemperature(bytes[10]),
      ]),
      2,
    ),
    round(
      mean([
        convertSensorTemperature(bytes[13]),
        convertSensorTemperature(bytes[16]),
        convertSensorTemperature(bytes[19]),
      ]),
      2,
    ),
  ];
};
