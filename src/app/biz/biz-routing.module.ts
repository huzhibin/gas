import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { BizComponent } from './biz.component';

const routes: Routes = [
  {
    path: '',
    component: BizComponent,
    data: {
      title: 'Biz'
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
export class BizRoutingModule {}
