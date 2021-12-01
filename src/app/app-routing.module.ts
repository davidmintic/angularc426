import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin-usuarios',
    component: AdminUsuariosComponent
  },  
  {
    path: 'programas-en-oferta',
    component: ProgramasEnOfertaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
