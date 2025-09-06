import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormatearNumeroPipe } from "../../pipe/formatear-numero.pipe";
import { FormatearFechaPipe } from "../../pipe/formatear-fecha.pipe";
import { GastosPorDiaService } from '../../service/gastos-por-dia.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, DatePipe, FormatearNumeroPipe, FormatearFechaPipe],
  templateUrl: './gastos-por-dia.component.html',
  styleUrl: './gastos-por-dia.component.css'
})
export class GastosPorDiaComponent implements OnInit{

  fecha: any;
  datos!:Array<any>;
  modalTitle!: string;
  modelo:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;

  constructor(
    private servicio: GastosPorDiaService,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.fecha = new Date();
    this.getMesActual();
    this.getListGastosPorDia();
  }
 
  getMesActual()
  {
    let date=new Date();
    dayjs.locale('es') ;
    return dayjs(date).format("MMMM");
  }

  getListGastosPorDia()
  {
    this.servicio.getGastosPorDia().subscribe({
      next: dato => 
      {
        this.datos = dato;
      },
      error: error => 
      {
        console.log('Error', error);
      }
    });
    
  }

  cerrar()
  {
    this.modalService.dismissAll();
  }

  crear()
  {

  }

  editar(arreglo:any)
  {

  }

  eliminar(id:any)
  {

  }

}
