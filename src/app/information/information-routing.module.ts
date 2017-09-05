import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { InformationComponent } from './information.component';
import { OrderComponent } from './order/order.component';
import { MapComponent } from './map/map.component';
import { CustomerComponent } from './customer/customer.component';
import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { CarComponent } from './car/car.component';
import { CompanyComponent } from './company/company.component';
import { CodeComponent} from './Code/code.component';
import { CylinderCodeComponent} from './cylinderCode/cylinderCode.component';
import { StationCodeComponent} from './stationCode/stationCode.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'company ',
    pathMatch: 'full',
  },
  {
    path: '',
    component: InformationComponent,
    data: {
      title: '基础信息监管管理'
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
        path: 'gas-cylinder',
        component: GasCylinderComponent,
        data: {
          title: '气瓶管理'
        },
      },
      {
        path: 'company',
        component: CompanyComponent,
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
      {
        path: 'code',
        component: CodeComponent,
        data: {
          title: '编码标准'
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
export class InformationRoutingModule {}
