import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const routes: Routes = [
  {
    path: 'estadisticas',
    component: EstadisticasComponent
  },
  {
    path: '**', redirectTo: 'estadisticas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
