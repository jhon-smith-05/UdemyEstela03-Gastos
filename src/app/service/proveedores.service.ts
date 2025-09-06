import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proveedores } from '../interfaces/proveedores';
import { ProveedoresRequest } from '../interfaces/proveedores-request';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private _http: HttpClient,
    private auth: AuthService
  ) { }

  getProveedores(): Observable<any>
    {
      return this._http.get(`${environment.api }proveedores`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
    }
  
    addProveedores(modelo: ProveedoresRequest):Observable<any>
    {
      return this._http.post(`${environment.api }proveedores`, modelo, { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
    }
  
    editProveedores(modelo: Proveedores):Observable<any>
    {
      return this._http.put(`${environment.api }proveedores/${modelo.id}`, modelo, { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
    }
  
    deleteProveedores(id: any):Observable<any>
    {
      console.log('servicio id',id)
      return this._http.delete(`${environment.api }proveedores/${id}`, { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.auth.getToken()}`} });
    }
}
