import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';

import { StandardRoutingModule } from './standard-routing.module';
import { StandardComponent } from './standard.component';
// import { OrderComponent } from './order/order.component';
// import { MapComponent } from './map/map.component';

// import { CustomerComponent } from './customer/customer.component';
// import { DeliverymanComponent } from './deliveryman/deliveryman.component';
// import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
// import { CarComponent } from './car/car.component';
// import { VideoComponent } from './video/video.component';
import { CodeComponent } from './company-code/code.component';
import { CylinderCodeComponent } from './cylinderCode/cylinderCode.component';
import { StationCodeComponent } from './stationCode/stationCode.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    ModalModule,
    AlertModule,
    TabsModule,
    StandardRoutingModule,
    BsDropdownModule,
    SharedModule

  ],
  declarations: [
    StandardComponent,
    // VideoComponent,
    CodeComponent,
    StationCodeComponent,
    CylinderCodeComponent
  ]
})
export class StandardModule { }
