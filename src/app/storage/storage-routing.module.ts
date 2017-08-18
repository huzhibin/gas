import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { StorageComponent } from './storage.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    data: {
      title: 'Storage'
    },
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule'
      // },
      // {
      //   path: 'dashboard',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule'
      // },
      // {
      //   path: 'dashboard',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule'
      // },
      // {
      //   path: 'dashboard',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule'
      // },
      // {
      //   path: 'dashboard',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule {}
