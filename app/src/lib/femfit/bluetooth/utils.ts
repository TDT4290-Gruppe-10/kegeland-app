import {clamp, mean, round} from 'lodash';

import {PRESSURE_SENSOR_MAX_VAL, PRESSURE_SENSOR_MIN_VAL} from './constants';

const range = PRESSURE_SENSOR_MAX_VAL - PRESSURE_SENSOR_MIN_VAL;

export const pressurePercent = (value: number) =>
  (value - PRESSURE_SENSOR_MIN_VAL) / range;

// export const getMovement = (values: SensorData[]) => {
//   const data = chain(values)
//     .map((val) => val.slice(0, 2))
//     .flatten()
//     .chunk(4)
//     .map((val) => pressurePercent(mean(val)) > ACTIVATION_THRESHOLD)
//     .value();
//   return zipObject(['lower', 'upper'], data) as {
//     lower: boolean;
//     upper: boolean;
//   };
// };

export const readBattery = (bytes: number[]) => {
  const voltage =
    // eslint-disable-next-line no-bitwise
    (((((bytes[4] & 255) << 8) | (bytes[5] & 255)) * 1.2) / 1024 / 220000) *
    1220000;

  return clamp(round(voltage / 6.1, 2), 0, 1);
};

const convertPressure = (byte1: number, byte2: number) => {
  return clamp(
    // eslint-disable-next-line no-bitwise
    ((((byte1 & 255) << 8) | (byte2 & 255)) + 65536) * 0.00750063755,
    PRESSURE_SENSOR_MIN_VAL,
    PRESSURE_SENSOR_MAX_VAL,
  );
};

const convertSensorTemperature = (byte: number) => {
  return byte * 0.16 + 10.0;
};

export const readSensorBytes = (data: number[][]) => {
  const pressures: number[] = [];
  const temps: number[] = [];
  for (const bytes of data) {
    pressures.push(
      ...[
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
      ],
    );
    temps.push(
      ...[
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
      ],
    );
  }
  return {pressures, temperatures: temps};
};

// export const readSensorBytes = (bytes: number[]): SensorData => {
//   return [
//     round(
//       mean([
//         convertPressure(bytes[2], bytes[3]),
//         convertPressure(bytes[5], bytes[6]),
//         convertPressure(bytes[8], bytes[9]),
//       ]),
//       2,
//     ),
//     round(
//       mean([
//         convertPressure(bytes[11], bytes[12]),
//         convertPressure(bytes[14], bytes[15]),
//         convertPressure(bytes[17], bytes[18]),
//       ]),
//       2,
//     ),
//     round(
//       mean([
//         convertSensorTemperature(bytes[4]),
//         convertSensorTemperature(bytes[7]),
//         convertSensorTemperature(bytes[10]),
//       ]),
//       2,
//     ),
//     round(
//       mean([
//         convertSensorTemperature(bytes[13]),
//         convertSensorTemperature(bytes[16]),
//         convertSensorTemperature(bytes[19]),
//       ]),
//       2,
//     ),
//   ];
// };
