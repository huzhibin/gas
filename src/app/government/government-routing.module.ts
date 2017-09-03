import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GovernmentComponent } from './government.component';
import { FlowProcessingComponent } from './flow/flow-processing.component';

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
        component: FlowProcessingComponent,
        data: {
          title: '自定义流程'
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
