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
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../../service/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, DatePipe, FormatearNumeroPipe, FormatearFechaPipe, FormsModule],
  templateUrl: './gastos-por-dia.component.html',
  styleUrl: './gastos-por-dia.component.css'
})
export class GastosPorDiaComponent implements OnInit{

  fecha: any;
  datos!:Array<any>;
  modalTitle!: string;
  modelo:any;
  proveedores!:Array<any>;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;

  constructor(
    private servicio: GastosPorDiaService,
    private modalService: NgbModal,
    private servicioProveedores: ProveedoresService
  ){
    this.inciarFormulario();
  }

  ngOnInit(): void {
    this.fecha = new Date();
    this.getMesActual();
    this.getListGastosPorDia();
    this.getProveedores();
  }

  inciarFormulario() {
    this.modelo =
    {
      id: "",
      neto: "",
      iva: "",
      total:"",
      glosa:"",
      proveedores_id: "0"
    };
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

  getProveedores() {
    this.servicioProveedores.getProveedores().subscribe({
      next: data => {
        this.proveedores = data;
      }, error: error => {
        console.log('Error: ' + error.message);
      }
    });
  }
  
  cerrar()
  {
    this.modalService.dismissAll();
  }

  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle = 'Crear';
    this.inciarFormulario();
  }

  enviar()
  {
    if (this.modalTitle == "Crear") {
      this.servicio.addGastosPorDia({
        neto: this.modelo.neto,
        iva: this.modelo.iva,
        total: this.modelo.total,
        glosa: this.modelo.glosa,
        proveedores_id: this.modelo.proveedores_id
      }).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-por-dia";
          }, 2000);
        },
        error: error => {
          console.log('Error:', error.message);
        }
      });
    }

    if (this.modalTitle == "Editar") {
      this.servicio.editGastosPorDia({
        neto: this.modelo.neto,
        iva: this.modelo.iva,
        total: this.modelo.total,
        glosa: this.modelo.glosa,
        proveedores_id: this.modelo.proveedores_id
      }, this.modelo.id).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se modificó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-por-dia";
          }, 2000);
        },
        error: error => {
          console.log('Error:', error.message);
        }
      });
    }

  }

  editar(arreglo:any)
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle = 'Editar';
    this.modelo =
    {
      id: arreglo.id,
      neto: arreglo.neto,
      iva: arreglo.iva,
      total: arreglo.total,
      glosa: arreglo.glosa,
      proveedores_id: arreglo.proveedores_id
    };
  }

  eliminar(id:any)
  {

  }

}
