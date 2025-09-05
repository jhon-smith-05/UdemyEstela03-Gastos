import { Component } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  datos:any;

  crear()
  {

  }

  editar(dato:any)
  {

  }

}
