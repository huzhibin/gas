import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { AlarmComponent } from './alarm/alarm.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { EnforceComponent } from './enforce/enforce.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';

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
    EnforceComponent,
    FeedbackComponent,
    UserComponent,
  ]
})
export class ReportModule { }
