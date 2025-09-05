import { Component, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  datos:any;
  modalTitle!: string;

   @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;

  constructor(
    private servicio: UsuariosService,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.hacerPeticion();
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
  }

  cerrar()
  {
    this.modalService.dismissAll();

  }

  enviar()
  {

  }

  editar(dato:any)
  {

  }

  

}
