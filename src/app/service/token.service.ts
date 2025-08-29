import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private _http: HttpClient,
  ) { }

  getToken(modelo: Login):Observable<any>
  {
    return this._http.post(`${environment.api}login`, modelo, {'headers': {'content-type': 'application/json'}});
  }
}
