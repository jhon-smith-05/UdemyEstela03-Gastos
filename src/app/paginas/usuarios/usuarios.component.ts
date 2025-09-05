import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  datos:any;
  constructor(
    private servicio: UsuariosService
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

  }

  editar(dato:any)
  {

  }

}
