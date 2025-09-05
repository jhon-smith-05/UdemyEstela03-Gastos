import { inject, Injectable } from '@angular/core';
import { Proveedores } from '../interfaces/proveedores';
import { ProveedoresRequest } from '../interfaces/proveedores-request';
import { ProveedoresService } from './proveedores.service';
import { signalSlice } from 'ngxtension/signal-slice';
import { catchError, map, Observable, of, switchMap } from 'rxjs';


interface State {
  datos: Proveedores[];
  status: 'loading' | 'success' | 'error';
}

interface StateSend {
  datos: ProveedoresRequest | null;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProveedoresStateService {

private proveedoresService = inject(ProveedoresService);

//listar
private initialState: State = 
{
  datos: [],
  status: 'loading' as const
};

state = signalSlice({
  initialState: this.initialState,
  sources: [
    this.proveedoresService.getProveedores().pipe(
      map((datos) => ({datos, status: 'success' as const})),
      catchError(() => 
        {
          return of({
            datos: [],
            status: 'error' as const
          })
        })
    ),
  ]
});

//crear
private initialStateSend: StateSend = 
{
  datos: null,
  loaded: false
};

stateEnviar = signalSlice({
  initialState: this.initialStateSend,
  actionSources:
  {
    add: (state, action$: Observable<ProveedoresRequest>) =>
        action$.pipe(
          switchMap((data) => this.proveedoresService.addProveedores(data)),
          map((datos) => ({datos: datos, status: 'success' as const})),
          catchError(()=>
          {
            return of({
            datos: null,
            status: 'error' as const
          });
        })
      )
  }
});

//editar
}
