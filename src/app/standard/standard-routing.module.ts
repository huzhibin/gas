import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { StandardComponent } from './standard.component';
import { VideoComponent } from './video/video.component';
import { CodeComponent } from './company-code/code.component';
import { CylinderCodeComponent} from './cylinderCode/cylinderCode.component';
import { StationCodeComponent} from './stationCode/stationCode.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'order',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: StandardComponent,
    data: {
      title: '数据标准规范'
    },
    children: [
      {
        path: 'company-code',
        component: CodeComponent,
        data: {
          title: '企业编码'
        },
      },
      {
        path: 'video',
        component: VideoComponent,
        data: {
          title: '车辆管理'
        },
      },
      {
        path: 'cylinder-code',
        component: CylinderCodeComponent,
        data: {
          title: '气瓶编码'
        },
      },
      {
        path: 'station-code',
        component: StationCodeComponent,
        data: {
          title: '车辆编码'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule {}
