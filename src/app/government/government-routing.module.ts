import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GovernmentComponent } from './government.component';
import { FlowComponent } from './flow/flow.component';
import { AffairComponent } from './affair/affair.component';

const routes: Routes = [
  {
    path: '',
    component: GovernmentComponent,
    data: {
      title: '政府监管事务'
    },
    children: [
      {
        path: 'flow',
        component: FlowComponent,
        data: {
          title: '自定义流程'
        },
      },
      {
        path: 'affair',
        component: AffairComponent,
        data: {
          title: '事务管理'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernmentRoutingModule { }
