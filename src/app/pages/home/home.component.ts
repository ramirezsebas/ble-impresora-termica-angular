import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrinterService } from 'src/app/services/printer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  device!: null | BluetoothDevice;

  constructor(
    private _printerService: PrinterService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  buscarImpresora() {
    this._printerService.searchPrinter().subscribe(
      (gatt: void | BluetoothRemoteGATTServer) => {
        console.log(gatt);
        if (gatt as BluetoothRemoteGATTServer) {
          this._snackBar.open('Conexion Exitoso', '', {
            duration: 1500,
            verticalPosition: 'top',
          });
          this.device = (gatt as BluetoothRemoteGATTServer).device;

          this.device.addEventListener('gattserverdisconnected', () => {
            this._snackBar.open('Se ha Desconectado', '', {
              duration: 2000,
              verticalPosition: 'top',
            });

            this.device = null;
          });
        } else {
          this._snackBar.open('Conexion Fallado', '', {
            duration: 1500,
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error, '', {
          duration: 1500,
          verticalPosition: 'top',
        });
      },
      () => {
        console.log(
          'Subscripcion de conectarse a una impresora ha Finalizado '
        );
      }
    );
  }
}
