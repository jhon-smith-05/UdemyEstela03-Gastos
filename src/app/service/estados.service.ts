import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(
    private _http: HttpClient, 
    private authService: AuthService) { }

  getEstadosGastos():  Observable<any> {

    return this._http.get(`${environment.api }estados`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} });
  }
}
