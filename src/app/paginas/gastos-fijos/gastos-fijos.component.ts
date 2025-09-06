import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { DatePipe } from '@angular/common';
import { GastosFijosService } from '../../service/gastos-fijos.service';
import { FormatearFechaPipe } from '../../pipe/formatear-fecha.pipe';
import { FormatearNumeroPipe } from '../../pipe/formatear-numero.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../../service/proveedores.service';
import Swal from 'sweetalert2';
import { EstadosService } from '../../service/estados.service';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, DatePipe,FormatearFechaPipe, FormatearNumeroPipe, FormsModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit {
  
  fecha:any;
  datos!:Array<any>;
  modalTitle!: string;
  modelo:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  estados!:Array<any>;
  proveedores!:Array<any>;
  siPagados:any;
  noPagados:any;

  constructor(
    private servicio: GastosFijosService,
    private modalService: NgbModal,
    private servicioProveedores: ProveedoresService,
    private servicioEstados: EstadosService
  ){
    this.inciarFormulario();
  }

  ngOnInit(): void {
    this.fecha = new Date();
    this.hacerPeticion();
    this.getProveedores();
    this.getEstados();
  }

  getMesActual()
  {
    let date = new Date();
    dayjs.locale('es');
    return dayjs(date).format("MMMM");
  }

  inciarFormulario() {
    this.modelo =
    {
      id: "",
      nombre: "",
      monto: "",
      proveedores_id: "0"
    };
  }

  hacerPeticion()
  {
    this.servicio.getGastosFijos().subscribe({
      next: data => 
      {
        this.datos = data;
        let sumaSi = 0;
        let sumaNo = 0;
        for (let dato of this.datos) {
          if (dato.estados_id == 1) 
            {
              sumaSi=sumaSi+dato.monto
            }
          if (dato.estados_id == 2) 
            {
              sumaNo=sumaNo+dato.monto
            }
        }
        this.siPagados = sumaSi;
        this.noPagados = sumaNo;

      },
      error: error =>
      {
        console.log('Error', error.message)
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

  getProveedores()
  {
    this.servicioProveedores.getProveedores().subscribe({
      next:data=>
      {
        this.proveedores = data;
      },error:error=>
      {
        console.log('Error: ' + error.message);
      }
    });
  }

  getEstados() {

    this.servicioEstados.getEstadosGastos().subscribe(
      {
        next: data => {

          this.estados = data;
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      }
    );
  }

  enviar() {
    if (this.modalTitle == "Crear") {
      this.servicio.addGastosFijos({ nombre: this.modelo.nombre, monto: this.modelo.monto, proveedores_id: this.modelo.proveedores_id }).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-fijos";
          }, 2000);
        },
        error: error => {
          console.log('Error:', error.message);
        }
      });
    }

    if (this.modalTitle == "Editar") {
      this.servicio.editGastosFijos({
        nombre: this.modelo.nombre, 
        monto: this.modelo.monto, 
        proveedores_id: this.modelo.proveedores_id, 
        estados_id: this.modelo.estados_id }, this.modelo.id).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se modificó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-fijos";
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
      nombre: arreglo.nombre,
      monto: arreglo.monto,
      proveedores_id: arreglo.proveedores_id,
      estados_id: arreglo.estados_id
    };
  }

  eliminar(id:any)
  {
    Swal.fire({

      title: '¿Realmente desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.servicio.deleteGastosFijos(id).subscribe({
          next: data => {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: "Se eliminó el registro exitosamente"
            });
            setInterval(() => {
              window.location.href = "/gastos-fijos";
            }, 2000);
          }, error: error => {
            console.log('Error: ' + error.message);
          }
        });
      }
    });
  }


}
