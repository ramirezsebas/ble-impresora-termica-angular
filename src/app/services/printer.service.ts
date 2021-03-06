import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { printer } from '../interfaces/IPrinter';
@Injectable({
  providedIn: 'root',
})
export class PrinterService implements printer {
  static GATT_CHARACTERISTIC_BATTERY_LEVEL =
    '49535343-fe7d-4ae5-8fa9-9fafd205e455';
  static GATT_PRIMARY_SERVICE = '49535343-8841-43f4-a8d4-ecbe34729bb3';

  constructor(private _ble: BluetoothCore) {}

  public searchPrinter(): Observable<void | BluetoothRemoteGATTServer> {
    // Buscamos los dispositivos disponible
    return this._ble.discover$({
      filters: [
        {
          name: 'SP120',
        },
      ],
    });
  }

  public getPrinter(): Observable<BluetoothDevice> {
    //Obtenemos el dispositivo
    return this._ble.getDevice$();
  }

  public disconnectPrinter(): void {
    //Desconectamos el DIspositivo
    this._ble.disconnectDevice();
  }

  //Utilizamos el servicio y caracteristica que deseamos utilizar(SOLO LECTURA)
  getOperation(
    device: BluetoothDevice,
    serviceUUID: BluetoothServiceUUID,
    characteristicUUID: BluetoothCharacteristicUUID,
    action = 'read',
    data?: string
  ): Observable<any> {
    switch (action) {
      case 'read':
        return this.readPrinterValue(device, serviceUUID, characteristicUUID);
      case 'write':
        return this.writePrinterValue(
          device,
          serviceUUID,
          characteristicUUID,
          data as string
        );

      default:
        return this.readPrinterValue(device, serviceUUID, characteristicUUID);
    }
  }

  private readPrinterValue(
    device: BluetoothDevice,
    serviceUUID: BluetoothServiceUUID,
    characteristicUUID: BluetoothCharacteristicUUID
  ) {
    return this._ble.connectDevice$(device).pipe(
      mergeMap((server: void | BluetoothRemoteGATTServer) => {
        return this._ble.getPrimaryService$(
          server as BluetoothRemoteGATTServer,
          serviceUUID
        );
      }),

      mergeMap((service: BluetoothRemoteGATTService) => {
        return this._ble.getCharacteristic$(service, characteristicUUID);
      }),

      mergeMap((characteristic: void | BluetoothRemoteGATTCharacteristic) => {
        return this._ble.readValue$(
          characteristic as BluetoothRemoteGATTCharacteristic
        );
      }),

      map((value: DataView) => {
        let enc = new TextDecoder('utf-8');

        let arr = new Uint8Array(value.buffer);

        return enc.decode(arr);
      })
    );
  }

  private writePrinterValue(
    device: BluetoothDevice,
    serviceUUID: BluetoothServiceUUID,
    characteristicUUID: BluetoothCharacteristicUUID,
    data: string
  ) {
    return this._ble.connectDevice$(device).pipe(
      mergeMap((server: void | BluetoothRemoteGATTServer) => {
        return this._ble.getPrimaryService$(
          server as BluetoothRemoteGATTServer,
          serviceUUID
        );
      }),

      mergeMap((service: BluetoothRemoteGATTService) => {
        return this._ble.getCharacteristic$(service, characteristicUUID);
      }),

      mergeMap((characteristic: void | BluetoothRemoteGATTCharacteristic) => {
        let encoded = new TextEncoder();

        //No podemos solo realizar un encode al string debe ser de cada caracter.
        //No puede pasar mas de 512 bytes - Recibe 300 bytes primero y asi sucesivamente
        //Para mobile tiene que estar en https

        let arrayBits: number[] = [];
        data.split('').forEach((caracter: string) => {
          arrayBits.push(encoded.encode(caracter)[0]);
        });
        return (characteristic as BluetoothRemoteGATTCharacteristic).writeValueWithResponse(
          new Uint8Array(arrayBits)
        );
      })
    );
  }
}
