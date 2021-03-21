import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrinterService } from 'src/app/services/printer.service';
import {
  DEVICE_INFO_SERVICE,
  GENERIC_ACCESS_SERVICE,
  PRINTER_SERVICE_1,
} from 'src/app/utils/config_printer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-thermal-printer',
  templateUrl: './thermal-printer.component.html',
  styles: [],
})
export class ThermalPrinterComponent implements OnInit {
  @Input()
  printerDevice!: BluetoothDevice;
  connected: boolean = true;
  constructor(
    private _router: Router,
    private _printerService: PrinterService
  ) {}

  ngOnInit(): void {
    console.log(this.printerDevice);
  }

  getDeviceName() {
    this._printerService
      .getOperation(
        this.printerDevice,
        GENERIC_ACCESS_SERVICE.uuid,
        GENERIC_ACCESS_SERVICE.characteristics[0].uuid
      )
      .subscribe((nombreDispositivo: string) => {
        Swal.fire({
          title: `Nombre de la Impresora es ${nombreDispositivo}`,
          icon: 'info',
        });
      });
  }

  getSoftwareRevision() {
    this._printerService
      .getOperation(
        this.printerDevice,
        DEVICE_INFO_SERVICE.uuid,
        DEVICE_INFO_SERVICE.characteristics[0].uuid
      )
      .subscribe((revisionSoftware: string) => {
        Swal.fire({
          title: `Revision de Software de la Impresora Termica es ${revisionSoftware}`,
          icon: 'info',
        });
      });
  }

  getHardwareRevision() {
    this._printerService
      .getOperation(
        this.printerDevice,
        DEVICE_INFO_SERVICE.uuid,
        DEVICE_INFO_SERVICE.characteristics[1].uuid
      )
      .subscribe((revisionHardware: string) => {
        Swal.fire({
          title: `Revision de Hardware de la Impresora Termica es ${revisionHardware}`,
          icon: 'info',
        });
      });
  }

  getNombreFabrica() {
    this._printerService
      .getOperation(
        this.printerDevice,
        DEVICE_INFO_SERVICE.uuid,
        DEVICE_INFO_SERVICE.characteristics[2].uuid
      )
      .subscribe((nombreFabrica: string) => {
        Swal.fire({
          title: `Nombre del Fabricante de la Impresora Termica es ${nombreFabrica}`,
          icon: 'info',
        });
      });
  }

  getNumeroModelo() {
    this._printerService
      .getOperation(
        this.printerDevice,
        DEVICE_INFO_SERVICE.uuid,
        DEVICE_INFO_SERVICE.characteristics[3].uuid
      )
      .subscribe((numeroModelo: string) => {
        Swal.fire({
          title: `Numero de Modelo de la Impresora Termica es ${numeroModelo}`,
          icon: 'info',
        });
      });
  }
}
