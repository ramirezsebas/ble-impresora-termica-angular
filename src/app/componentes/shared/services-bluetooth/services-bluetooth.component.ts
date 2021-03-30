import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { PrinterService } from 'src/app/services/printer.service';

import {
  GENERIC_ACCESS_SERVICE,
  DEVICE_INFO_SERVICE,
  PRINTER_SERVICE_1,
} from 'src/app/utils/config_printer';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-bluetooth',
  templateUrl: './services-bluetooth.component.html',
  styles: [],
})
export class ServicesBluetoothComponent implements OnInit {
  private _MAX_BYTE: number = 300;
  @Input()
  printerDevice!: BluetoothDevice;
  @Input() functionalities: string[];
  @Input() type: string = '';
  @Input() esInput: boolean = true;
  private _ticket: String[] = [];
  private _textTicket: String = '';

  @ViewChild('myTicket') el?: ElementRef;

  constructor(
    private _router: Router,
    private _printerService: PrinterService
  ) {
    this.functionalities = [];
  }

  ngAfterViewInit() {
    if (this.el) {
      let DOMelements = this.el?.nativeElement?.children;

      for (let index = 1; index < DOMelements.length; index++) {
        const element = DOMelements[index];
        this._textTicket += element.innerText + '\n';

        this._ticket.push(element.innerText);
        this._ticket.push('\n');
      }
    }
    console.log(this._ticket);
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

  async imprimirTexto(text: string) {
    try {
      let tempText = '';

      for (let index = 0; index < text.length; index += this._MAX_BYTE) {
        tempText = text.substr(index, this._MAX_BYTE);
        console.log(tempText);
        //Manipular substring
        await this.sendPrinter(tempText);
        tempText = '';
      }
      await this.sendPrinter('\n\n\n');
    } catch (error) {
      Swal.fire({
        title: error,
        icon: 'error',
      });
    }
  }

  async imprimirTicket() {
    try {
      let tempText = '';
      //Recorremos todas las oraciones
      for (const sentence of this._ticket) {
        if (sentence === '\n') {
          // console.log('Salto de Linea');
          // console.log(tempText);
          tempText += '\n';
        } else {
          //Contador de letras de cada letra
          let totalLetters = 0;

          //Recorrer lista de palbras
          let words = sentence.split(' ');
          for (let index = 0; index < words.length; index++) {
            let word = words[index];
            totalLetters += word.length + 1;

            //Si la cantidad letras supera 30 caracteres realizar un salto de linea + la palabra
            if (totalLetters > 30) {
              //Salto de linea + palabra
              //Reiniciar Conteo de letras
              if (tempText.charAt(tempText.length - 1) === ' ')
                tempText = tempText.substring(0, tempText.length - 1);

              tempText += '\n' + word + ' ';
              totalLetters = 0;
            } else {
              //Sino solo agregar la palabra mas un espacio
              tempText += word;
              if (index < words.length - 1) tempText += ' ';
            }
          }
          // console.log('Oracion');
          // console.log(Array.from(tempText));
        }
      }
      //-----------------------------------------------------------
      let newTempText = '';

      for (let index = 0; index < tempText.length; index += this._MAX_BYTE) {
        newTempText = tempText.substr(index, this._MAX_BYTE);
        //Manipular substring
        await this.sendPrinter(newTempText);
        console.log(Array.from(newTempText));
        newTempText = '';
      }
      await this.sendPrinter('\n\n\n');
    } catch (error) {
      Swal.fire({
        title: error,
        icon: 'error',
      });
    }
  }

  private sendPrinter(tempText: string) {
    return this._printerService
      .getOperation(
        this.printerDevice,
        PRINTER_SERVICE_1.uuid,
        PRINTER_SERVICE_1.characteristics[1].uuid,
        'write',
        tempText
      )
      .toPromise();
  }
}
