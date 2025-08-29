import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  
  usuario:any;
  constructor(
    private service: TokenService,
    //private cookieService: CookieService
  ){}

  inciarFomulario()
  {
    this.usuario={
      correo:"",
      password:""
    };
  }

  enviar()
  {

  }

}
