export type ConnectionStates = 'available' | 'connecting' | 'connected';

export type BluetoothDevice = {
  id: string;
  name: string;
  rssi: number;
  state: ConnectionStates;
};

export interface BluetoothState {
  isReady: boolean;
  isScanning: boolean;
  isConnecting: boolean;
  devices: Record<string, BluetoothDevice>;
  error: string | null;
}
