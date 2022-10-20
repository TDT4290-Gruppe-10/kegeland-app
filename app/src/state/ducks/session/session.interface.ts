import {DeviceType} from '~constants/bluetooth';

export type ExerciseSession = {
  device: DeviceType;
  data: number[][];
};

export interface SessionState {
  loading: boolean;
  error?: string;
  session: ExerciseSession | undefined;
}
