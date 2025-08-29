import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../service/token.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';


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
    private cookieService: CookieService
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

    this.service.getToken({correo:this.usuario.correo, password:this.usuario.password}).subscribe(
      {
        next: data => 
          {
            this.cookieService.set('jhon_gastos_token', data.token, 1);
            this.cookieService.set('jhon_gastos_nombre', data.nombre, 1);
            this.cookieService.set('jhon_gastos_id', data.id, 1);
            window.location.href="/";
          },
        error(err)
          {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: "Las credenciales ingresadas no son válidas "
            });
            setInterval(()=>
            {
              window.location.href="/login";
            }, 3000);
          }
      });
    return true;
  }



}
