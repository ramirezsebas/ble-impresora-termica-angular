import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThermalPrinterComponent } from './componentes/thermal-printer/thermal-printer.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'printer',
    component: ThermalPrinterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
