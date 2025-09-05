import { Component, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  styles: ``
})
export class UsuariosComponent implements OnInit {

  datos:any;
  modalTitle!: string;
  modelo:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;

  constructor(
    private servicio: UsuariosService,
    private modalService: NgbModal
  ){
    this.inciarFormulario();
  }

  ngOnInit(): void {
    this.hacerPeticion();
  }

  inciarFormulario()
  {
    this.modelo =
    {
      id:"",
      nombre: "",
      correo:"",
      password:""
    };
  }

  hacerPeticion()
  {
    this.servicio.getUsuarios().subscribe({
      next: data => 
        {
          this.datos = data;
          console.log(this.datos);
      },
      error: error => 
        {
          console.log('Error', error.message);
      }
    });

  }

  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle = 'Crear';
    this.inciarFormulario();
  }

  cerrar()
  {
    this.modalService.dismissAll();

  }

  assemblerRequest(){
    const modelo = {
      nombre: this.modelo.nombre,
      correo: this.modelo.correo,
      password: this.modelo.password
    }

  }

  enviar()
  {
    if (this.modalTitle = "Crear") {
      this.servicio.addUsuarios({nombre:this.modelo.nombre, correo:this.modelo.correo, password:this.modelo.password}).subscribe({
        next: data =>
        {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/usuarios";
          }, 2000);
        },
        error: error => 
        {
          console.log('Error:', error.message);
        }
      });
    }
  }

  editar(dato:any)
  {
    if (this.modalTitle = "Editar") {
      
    }
  }

}
