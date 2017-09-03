import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { AlarmComponent } from './alarm/alarm.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
  imports: [
    ReportRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [
    ReportComponent,
    GasCylinderComponent,
    AlarmComponent,
    DeliveryComponent,
  ]
})
export class ReportModule { }
