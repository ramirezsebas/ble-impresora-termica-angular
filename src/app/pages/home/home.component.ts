import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrinterService } from 'src/app/services/printer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(
    private _printerService: PrinterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  buscarImpresora() {
    this._printerService.searchPrinter().subscribe(
      (gatt: void | BluetoothRemoteGATTServer) => {
        console.log(gatt);
        if (gatt as BluetoothRemoteGATTServer) {
          this._snackBar.open('Conexion Exitoso', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else {
          this._snackBar.open('Conexion Fallado', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error, '', {
          duration: 2000,
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
