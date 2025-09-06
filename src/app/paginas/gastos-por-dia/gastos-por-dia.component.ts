import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, DatePipe],
  templateUrl: './gastos-por-dia.component.html',
  styleUrl: './gastos-por-dia.component.css'
})
export class GastosPorDiaComponent implements OnInit{

  fecha: any;

  constructor(
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.fecha = new Date();
    this.getMesActual();
  }
 
  getMesActual()
  {
    let date=new Date();
    dayjs.locale('es') ;
    return dayjs(date).format("MMMM");
  }

  cerrar()
  {
    this.modalService.dismissAll();
  }

  crear()
  {

  }

}
