import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GasCommonModule } from '../component/gas-common.module';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent} from './delivery.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    ModalModule,
    AlertModule,
    TabsModule,
    DeliveryRoutingModule,
    BsDropdownModule,
    GasCommonModule
  ],
  declarations: [
    DeliveryComponent,
//     OrderComponent,
//     MapComponent,
//     CustomerComponent ,
//     DeliverymanComponent,
//     GasCylinderComponent,
//     CarComponent ,
//     GasWorksComponent
  ]
})
export class DeliveryModule { }
