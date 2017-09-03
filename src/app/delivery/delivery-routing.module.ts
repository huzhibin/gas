import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DeliveryComponent } from './delivery.component';
import { MapComponent } from './car-path/map.component';
import { OrderComponent } from './order/order.component';
// import { CustomerComponent } from './customer/customer.component';
// import { DeliverymanComponent } from './deliveryman/deliveryman.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'order',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: DeliveryComponent,
    data: {
      title: '配送业务监管管理'
    },
    children: [
      {
        path: 'order',
        component: OrderComponent,
        data: {
          title: '订单管理'
        },
      },
      {
        path: 'car-path',
        component: MapComponent,
        data: {
          title: '配送轨迹'
        },
      },
      // {
      //   path: 'gas-works',
      //   component: GasWorksComponent,
      //   data: {
      //     title: '气站管理'
      //   },
      // },
     
      // {
      //   path: 'diliveryman',
      //   component: DeliveryComponent,
      //   data: {
      //     title: '配送员管理'
      //   },
      // },
     
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule {}
