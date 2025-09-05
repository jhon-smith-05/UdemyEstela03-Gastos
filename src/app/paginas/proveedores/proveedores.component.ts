import { Component } from '@angular/core';
import { FooterComponent } from "../../componentes/footer/footer.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { MenuComponent } from "../../componentes/menu/menu.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent, RouterLink],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  datos:any;


  crear()
  {

  }

  enviar()
  {

  }

  editar(data: any)
  {

  }

  eliminar(id: any)
  {

  }

}
