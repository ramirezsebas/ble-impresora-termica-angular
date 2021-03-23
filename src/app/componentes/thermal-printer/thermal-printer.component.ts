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
  readFuncionalities: string[] = [];
  writeFuncionalities: string[] = [];
  constructor(
    private _router: Router,
    private _printerService: PrinterService
  ) {}

  ngOnInit(): void {
    console.log(this.printerDevice);
    this.readFunc();
    this.writeFunc();
  }

  readFunc() {
    this.readFuncionalities = [
      'Nombre de la Impresora',
      'Revision del Software de la Impresora Termica',
      'Revision del Hardware de la Impresora Termica',
      'Numero de Modelo de la Impresora Termica',
      'Nombre del Fabricante de la Impresora Termica',
    ];
  }
  writeFunc() {
    this.writeFuncionalities = ['Imprimir Texto', 'Imprimir Ticket'];
  }
}
