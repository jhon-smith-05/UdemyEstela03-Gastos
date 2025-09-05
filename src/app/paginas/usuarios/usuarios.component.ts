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

  enviar()
  {
    if (this.modalTitle == "Crear") {
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
    
    if (this.modalTitle == "Editar") {
      this.servicio.editUsuarios({nombre:this.modelo.nombre, correo:this.modelo.correo, password:this.modelo.password}, this.modelo.id).subscribe({
        next: data =>
        {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se modificó el registro exitosamente"
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

  editar(datos:any)
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle = 'Editar';
    this.modelo =
    {
      id: datos.id,
      nombre: datos.nombre,
      correo: datos.correo,
      password:""
    };
  }

  eliminar(id:any)
  {
    Swal.fire({
      title: "Estas seguro?",
      text: "se eliminara este resgistro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.deleteUsuarios(id).subscribe(
          {
            next: data => {
                Swal.fire({
                  title: "OK",
                  icon: "success",
                  timer: 5000,
                  text: "Se eliminó el registro exitos"
              });            
              setInterval(() => {
                window.location.href = "/usuarios";
              }, 2000);
            },
            error: error => {
              console.log('Error:' + error.message)
            }
          });
      }
    });
  }

}
