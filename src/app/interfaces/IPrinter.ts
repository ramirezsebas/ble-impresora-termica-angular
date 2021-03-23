import { Observable } from 'rxjs';

export interface printer {
  searchPrinter(): Observable<void | BluetoothRemoteGATTServer>;
  getPrinter(): Observable<BluetoothDevice>;
  disconnectPrinter(): void;
  getOperation(
    device: BluetoothDevice,
    serviceUUID: BluetoothServiceUUID,
    characteristicUUID: BluetoothCharacteristicUUID,
    action: string
  ): Observable<string>;
}

interface ReadOperations {}

interface WriteOperations {}
