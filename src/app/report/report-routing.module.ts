import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { DataScreenComponent } from './data-screen/data-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-screen',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ReportComponent,
    data: {
      title: '报表管理'
    },
    children: [
      {
        path: 'gas-cylinder',
        component: DataScreenComponent,
        data: {
          title: '气瓶报表'
        },
      },
      {
        path: 'diliveryman',
        component: DataScreenComponent,
        data: {
          title: '配送员报表'
        },
      },
      {
        path: 'data-screen',
        component: DataScreenComponent,
        data: {
          title: '数据大屏'
        },
      },
      {
        path: 'car',
        component: DataScreenComponent,
        data: {
          title: '车辆报表'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
