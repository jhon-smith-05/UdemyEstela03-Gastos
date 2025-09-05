import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../componentes/footer/footer.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { MenuComponent } from "../../componentes/menu/menu.component";
import { RouterLink } from '@angular/router';
import { ProveedoresStateService } from '../../service/proveedores-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent, RouterLink, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  datos = inject(ProveedoresStateService);

  crear()
  {

  }

  editar(dato: any)
  {

  }

  eliminar(id: any)
  {

  }

}
