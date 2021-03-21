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
  device!: BluetoothDevice;
  isDeviceConnected: boolean;
  constructor(
    private _printerService: PrinterService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.isDeviceConnected = false;
  }

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
          this.isDeviceConnected = true;
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
