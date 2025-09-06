import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, DatePipe],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit {
  
  fecha:any;

  ngOnInit(): void {
    this.fecha = new Date();
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


}
