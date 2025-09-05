import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _http: HttpClient,
    private auth: AuthService

  ) { }

  getUsuarios(): Observable<any>
  {
    return this._http.get(`${environment.api }usuarios`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
  }
}
