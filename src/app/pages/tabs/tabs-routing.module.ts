import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'acciones',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../acciones/acciones.module').then(m => m.AccionesPageModule)
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../eventos/eventos.module').then(m => m.EventosPageModule)
          }
        ]
      },
      {
        path: 'datos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../datos/datos.module').then(m => m.DatosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'acciones',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'acciones',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
