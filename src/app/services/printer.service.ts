import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_PRIMARY_SERVICE = 'battery_service';

  constructor(public ble: BluetoothCore) {}

  searchDevice() {
    // Buscamos los dispositivos disponible
    return this.ble.discover$({
      acceptAllDevices: true,
    });
  }

  getDevice() {
    //Obtenemos el dispositivo
    return this.ble.getDevice$();
  }

  disconnectDevice() {
    //Desconectamos el DIspositivo
    this.ble.disconnectDevice();
  }
}
