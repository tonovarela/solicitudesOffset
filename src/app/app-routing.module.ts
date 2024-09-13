import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { SurtirComponent } from './pages/surtir/surtir.component';

const routes: Routes = [
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'surtir', component:SurtirComponent },
  { path: '**', redirectTo: 'solicitudes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
