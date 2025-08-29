import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  hora:any;
  fecha:any;
  ngOnInit(): void {
    this.getHoraActual();
    this.fecha = Date();
   
  }

  getHoraActual()
  {
    this.hora = new Date();
    setInterval(() => {
      this.hora = new Date();
      }, 1000
    );
  }

  getFechaActual()
  {
    dayjs.locale('es');
    let fecha = new Date();
    return `${dayjs(fecha).format("dddd")} ${dayjs(fecha).format("DD")} de ${dayjs(fecha).format("MMMM")} de ${dayjs(fecha).format("YYYY")}`
    //return dayjs(fecha).format("dddd")
  }

}
