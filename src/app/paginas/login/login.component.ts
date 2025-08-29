import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../service/token.service';
import Swal from 'sweetalert2';


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
  ){
    this.inciarFomulario();
  }

  inciarFomulario()
  {
    this.usuario={
      correo:"",
      password:""
    };
  }

  enviar()
  {
    if (this.usuario.correo == 0 || this.usuario.correo == '') 
      {
        Swal.fire({
        icon:'error',
        timer:2000,
        title:'Ups',
        text:'El campo correo es obligatorio'
        });
        return false;
    } 
    if (this.usuario.password == 0 || this.usuario.password == '') 
      {
        Swal.fire({
        icon:'error',
        timer:2000,
        title:'Ups',
        text:'El campo password es obligatorio'
        });
      return false;
    }
    return true;
  }

}
