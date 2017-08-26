import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { FlowComponent } from './flow.component';

const routes: Routes = [
  {
    path: '',
    component: FlowComponent,
    data: {
      title: '流程管理'
    },
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRoutingModule {}
