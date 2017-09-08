import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { AlarmComponent } from './alarm/alarm.component';
import { EnforceComponent } from './enforce/enforce.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      title: '统计查询'
    },
    children: [
      {
        path: 'gas-cylinder',
        component: GasCylinderComponent,
        data: {
          title: '气瓶数据统计'
        },
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        data: {
          title: '配送数据统计'
        },
      },
      {
        path: 'alarm',
        component: AlarmComponent,
        data: {
          title: '预警数据统计'
        },
      },
      {
        path: 'enforce',
        component: EnforceComponent,
        data: {
          title: '执法数据统计'
        },
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: '用户数据统计'
        },
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        data: {
          title: '投诉建议和反馈率统计'
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
