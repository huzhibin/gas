import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { GasCommonModule } from '../component/gas-common.module';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent} from './delivery.component';
import { OrderComponent } from './order/order.component';
import { MapComponent } from './car-path/map.component';
import { StoreCylinderComponent} from './store-cylinder/store-cylinder.component';
import { DeliverymanComponent } from './deliveryman/deliveryman.component';

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
    DatepickerModule,
    GasCommonModule
  ],
  declarations: [
    DeliveryComponent,
    OrderComponent,
    MapComponent,
    StoreCylinderComponent,
    DeliverymanComponent
  ]
})
export class DeliveryModule { }
