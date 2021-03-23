import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrinterService } from 'src/app/services/printer.service';
import {
  GENERIC_ACCESS_SERVICE,
  DEVICE_INFO_SERVICE,
} from 'src/app/utils/config_printer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-bluetooth',
  templateUrl: './services-bluetooth.component.html',
  styles: [],
})
export class ServicesBluetoothComponent implements OnInit {
  @Input()
  printerDevice!: BluetoothDevice;
  @Input() functionalities: string[];
  @Input() type: string = '';
  constructor(
    private _router: Router,
    private _printerService: PrinterService
  ) {
    this.functionalities = [];
  }

  ngOnInit(): void {
    console.log(this.printerDevice);
  }

  selectFunc(item: string) {
    switch (item.toLowerCase()) {
      case 'nombre de la impresora':
        return this.getDeviceName();

      case 'revision del software de la impresora termica':
        return this.getSoftwareRevision();

      case 'revision del hardware de la impresora termica':
        return this.getHardwareRevision();

      case 'numero de modelo de la impresora termica':
        return this.getNumeroModelo();

      case 'nombre del fabricante de la impresora termica':
        return this.getNombreFabrica();

      default:
        console.log('Todavia no se ha implementado');
        break;
    }
  }

  //Read Operations
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

  //Write Operations

  imprimir(text: string) {
    if (text.length > 0) {
      console.log(text);
    }
  }
}
