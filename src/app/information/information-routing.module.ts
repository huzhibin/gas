import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { InformationComponent } from './information.component';
import { OrderComponent } from './order/order.component';
import { MapComponent } from './map/map.component';
import { CustomerComponent } from './customer/customer.component';
import { DeliverymanComponent } from './deliveryman/deliveryman.component';
import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { CarComponent } from './car/car.component';
import { GasWorksComponent } from './gas-works/gas-works.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full',
  },
  {
    path: '',
    component: InformationComponent,
    data: {
      title: '信息管理'
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
        path: 'map',
        component: MapComponent,
        data: {
          title: '位置追踪'
        },
      },
      {
        path: 'gas-works',
        component: GasWorksComponent,
        data: {
          title: '气站管理'
        },
      },
      {
        path: 'gas-cylinder',
        component: GasCylinderComponent,
        data: {
          title: '气瓶管理'
        },
      },
      {
        path: 'diliveryman',
        component: DeliverymanComponent,
        data: {
          title: '配送员管理'
        },
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: '客户管理'
        },
      },
      {
        path: 'car',
        component: CarComponent,
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
export class InformationRoutingModule {}
