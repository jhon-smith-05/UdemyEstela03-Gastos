import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { GastosPorDiaComponent } from './paginas/gastos-por-dia/gastos-por-dia.component';
import { GastosFijosComponent } from './paginas/gastos-fijos/gastos-fijos.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { ErrorComponent } from './paginas/error/error.component';
import { LoginComponent } from './paginas/login/login.component';
import { AuthGuard } from './guard/auth.guards';

export const routes: Routes = 
[
    {path:"", component: HomeComponent, canActivate: [AuthGuard]},
    {path:"usuarios", component: UsuariosComponent, canActivate: [AuthGuard]},
    {path:"proveedores", component: ProveedoresComponent, canActivate: [AuthGuard]},
    {path:"gastos-por-dia", component: GastosPorDiaComponent, canActivate: [AuthGuard]},
    {path:"gastos-fijos", component: GastosFijosComponent, canActivate: [AuthGuard]},
    {path:"login", component: LoginComponent},

    {path:"**", component: ErrorComponent},

];
