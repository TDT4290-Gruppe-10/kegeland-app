import {mean} from 'lodash';

const convertPressure = (b1: number, b2: number) => {
  // eslint-disable-next-line no-bitwise
  return ((((b1 & 255) << 8) | (b2 & 255)) + 65536) * 0.00750063755;
};

const convertSensorTemperature = (b: number) => {
  return b * 0.16 + 10.0;
};

export const readSensorCharacteristic = (bytes: number[]) => {
  return [
    mean([
      convertPressure(bytes[2], bytes[3]),
      convertPressure(bytes[5], bytes[6]),
      convertPressure(bytes[8], bytes[9]),
    ]).toFixed(2),
    mean([
      convertPressure(bytes[11], bytes[12]),
      convertPressure(bytes[14], bytes[15]),
      convertPressure(bytes[17], bytes[18]),
    ]).toFixed(2),
    mean([
      convertSensorTemperature(bytes[4]),
      convertSensorTemperature(bytes[7]),
      convertSensorTemperature(bytes[10]),
    ]).toFixed(2),
    mean([
      convertSensorTemperature(bytes[13]),
      convertSensorTemperature(bytes[16]),
      convertSensorTemperature(bytes[19]),
    ]).toFixed(2),
  ];
};
