import { Component, OnInit } from '@angular/core';
import { PrinterService } from 'src/app/services/printer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor(private _printerService: PrinterService) {}

  ngOnInit(): void {}
}
