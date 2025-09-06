import { Component } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent {


  crear()
  {

  }


}
