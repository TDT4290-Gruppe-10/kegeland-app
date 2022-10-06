export type BluetoothProfile = {
  notifyChannels: Record<string, string[]>;
  handlers: Record<string, (bytes: number[]) => any>;
  characteristics: string[];
};
