import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuariosComponent } from '../admin-usuarios/admin-usuarios.component';
import { AutorizacionGuard } from '../guards/autorizacion.guard';

const routes: Routes = [

  {
    path: 'admin-usuarios',
    canActivate: [AutorizacionGuard],
    component: AdminUsuariosComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
