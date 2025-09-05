import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuarios } from '../interfaces/usuarios';

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

  addUsuarios(modelo: Usuarios):Observable<any>
  {
    return this._http.post(`${environment.api }usuarios`, modelo, { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
  }

  editUsuarios(modelo: Usuarios, id: any):Observable<any>
  {
    return this._http.put(`${environment.api }usuarios/${id}`, modelo, { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
  }

  deleteUsuarios(id: any):Observable<any>
  {
    return this._http.delete(`${environment.api }usuarios/${id}`, { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
  }
}
