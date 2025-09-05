import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FooterComponent } from "../../componentes/footer/footer.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { MenuComponent } from "../../componentes/menu/menu.component";
import { RouterLink } from '@angular/router';
import { ProveedoresStateService } from '../../service/proveedores-state.service';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent, RouterLink, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit{

  datos = inject(ProveedoresStateService);
  modalTitle!:string;
  modelo:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;

  constructor(
      //private servicio: ,
      private modalService: NgbModal
    ){
      this.inciarFormulario();
    }
  
    ngOnInit(): void {
    }
  
    inciarFormulario()
    {
      this.modelo =
      {
        id:"",
        nombre: ""
      };
    }

  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle = 'Crear';
    this.inciarFormulario();
  }

  enviar()
  {
    if (this.modalTitle == "Crear") 
      {
        this.datos.stateEnviar.add(this.modelo);
        Swal.fire({
          icon: 'success',
          timer: 2000,
          title: 'OK',
          text: "Se modificó el registro exitosamente"
        });
        setInterval(() => {
          window.location.href = "/proveedores";
        }, 2000);
      }
    if (this.modalTitle == "Editar") 
      {

    }

  }

  cerrar()
  {
    this.modalService.dismissAll();
  }

  editar(dato: any)
  {

  }

  eliminar(id: any)
  {

  }

}
