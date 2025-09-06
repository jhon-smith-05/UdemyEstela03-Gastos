import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import dayjs from 'dayjs';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatearNumeroPipe } from "../../pipe/formatear-numero.pipe";
import { GastosFijosService } from '../../service/gastos-fijos.service';
import { GastosPorDiaService } from '../../service/gastos-por-dia.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, DatePipe, RouterLink, FormatearNumeroPipe],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{
  
  fecha:any;
  gastosPorDiaTotal:any;
  gastosFIjosTotal:any;

  constructor(
    private servicioGastosFijos: GastosFijosService,
    private ServicioGastosPorDia: GastosPorDiaService
  ) {}

  ngOnInit(): void {
    this.fecha = new Date();
    this.getPeticion();
  }

  getMesActual()
    {
      let date = new Date();
      dayjs.locale('es');
      return dayjs(date).format("MMMM");
    }

  getPeticion() {
    this.servicioGastosFijos.getGastosFijos().subscribe({
      next: data => {
        let sumaSi = 0;
        let sumaNo = 0;
        for (let dato of data) {
          if (dato.estados_id == 1) {
            sumaSi = sumaSi + dato.monto;
          }
          if (dato.estados_id == 2) {
            sumaNo = sumaNo + dato.monto;
          }
        }
        this.gastosFIjosTotal = sumaSi - sumaNo;
      }, error: error => {
        console.log('Error: ' + error.message);
      }
    });
    this.ServicioGastosPorDia.getGastosPorDia().subscribe(
      {
        next: data => {
          let sum = 0;
          for (let dato of data) {
            sum = sum + dato.total;
          }
          this.gastosPorDiaTotal = sum;
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      }
    );
  }

}
