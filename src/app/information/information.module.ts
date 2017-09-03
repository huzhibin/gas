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

import { CustomerComponent } from './customer/customer.component';

import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { CarComponent } from './car/car.component';
import { CompanyComponent } from './company/company.component';

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
    CustomerComponent ,
    GasCylinderComponent,
    CarComponent ,
    CompanyComponent
  ]
})
export class InformationModule { }
