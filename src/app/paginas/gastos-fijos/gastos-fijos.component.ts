import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { DatePipe, formatNumber } from '@angular/common';
import { GastosFijosService } from '../../service/gastos-fijos.service';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, DatePipe],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit {
  
  fecha:any;
  datos!:Array<any>;

  constructor(
    private service: GastosFijosService
  ){}

  ngOnInit(): void {
    this.fecha = new Date();
    this.hacerPeticion();
  }

  hacerPeticion()
  {
    this.service.getGastosFijos().subscribe({
      next: data => 
      {
        this.datos = data;
      },
      error: error =>
      {
        console.log('Error', error.message)
      }
    });
  }

  crear()
  {

  }

  getMesActual()
  {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format("MMMM");
  }

  eliminar(id:any)
  {

  }


}
