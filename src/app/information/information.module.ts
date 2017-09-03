import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GasCommonModule } from '../component/gas-common.module';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';
import { OrderComponent } from './order/order.component';
import { MapComponent } from './map/map.component';

import { CustomerComponent } from './customer/customer.component';

import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { CarComponent } from './car/car.component';
import { GasWorksComponent } from './gas-works/gas-works.component';
import { CompanyComponent } from './company/company.component';

import { CodeComponent} from './Code/code.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    ModalModule,
    AlertModule,
    TabsModule,
    InformationRoutingModule,
    BsDropdownModule,
    GasCommonModule
  ],
  declarations: [
    InformationComponent,
    OrderComponent,
    MapComponent,
    CustomerComponent ,
    CodeComponent,
    GasCylinderComponent,
    CarComponent ,
    GasWorksComponent,
    CompanyComponent
  ]
})
export class InformationModule { }
