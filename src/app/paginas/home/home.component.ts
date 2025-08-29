import { Component } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { HeaderComponent } from "../../componentes/header/header.component";
import { FooterComponent } from "../../componentes/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
