import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { GastosPorDiaComponent } from './paginas/gastos-por-dia/gastos-por-dia.component';
import { GastosFijosComponent } from './paginas/gastos-fijos/gastos-fijos.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { ErrorComponent } from './paginas/error/error.component';
import { LoginComponent } from './paginas/login/login.component';

export const routes: Routes = 
[
    {path:"", component: HomeComponent},
    {path:"login", component: LoginComponent},
    {path:"usuarios", component: UsuariosComponent},
    {path:"proveedores", component: ProveedoresComponent},
    {path:"gastos-por-dia", component: GastosPorDiaComponent},
    {path:"gastos-fijos", component: GastosFijosComponent},

    {path:"**", component: ErrorComponent},

];
