import { inject, Injectable } from '@angular/core';
import { Proveedores } from '../interfaces/proveedores';
import { ProveedoresRequest } from '../interfaces/proveedores-request';
import { ProveedoresService } from './proveedores.service';
import { signalSlice } from 'ngxtension/signal-slice';
import { catchError, map, of } from 'rxjs';


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


//editar
}
