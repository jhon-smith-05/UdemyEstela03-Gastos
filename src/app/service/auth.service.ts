import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService
  ) { }

  metodoCerrarSesion()
  {
    Swal.fire({
      position: 'top-end',
      title: '¿Realmente desea cerrar su sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.cookieService.deleteAll();
        window.location.href="/login";
      }

    });
  }

  getId()
  {
    return this.cookieService.get('jhon_gastos_id');
  }

  getNombre()
  {
    return this.cookieService.get('jhon_gastos_nombre');
  }

  getToken()
  {
    return this.cookieService.get('jhon_gastos_token');
  }


}
