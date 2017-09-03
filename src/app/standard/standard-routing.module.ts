import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { StandardComponent } from './standard.component';
// import { OrderComponent } from './order/order.component';
// import { MapComponent } from './map/map.component';
// import { CustomerComponent } from './customer/customer.component';
// import { DeliverymanComponent } from './deliveryman/deliveryman.component';
// import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
// import { CarComponent } from './car/car.component';
import { VideoComponent } from './video/video.component';
import { CodeComponent } from './company-code/code.component';

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
      // {
      //   path: 'map',
      //   component: MapComponent,
      //   data: {
      //     title: '位置追踪'
      //   },
      // },
      // {
      //   path: 'gas-works',
      //   component: GasWorksComponent,
      //   data: {
      //     title: '气站管理'
      //   },
      // },
      // {
      //   path: 'gas-cylinder',
      //   component: GasCylinderComponent,
      //   data: {
      //     title: '气瓶管理'
      //   },
      // },
      // {
      //   path: 'diliveryman',
      //   component: DeliverymanComponent,
      //   data: {
      //     title: '配送员管理'
      //   },
      // },
      // {
      //   path: 'customer',
      //   component: CustomerComponent,
      //   data: {
      //     title: '客户管理'
      //   },
      // },
      {
        path: 'video',
        component: VideoComponent,
        data: {
          title: '车辆管理'
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
