import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { DataScreenComponent } from './data-screen/data-screen.component';

@NgModule({
  imports: [
    ReportRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [
    ReportComponent,
    DataScreenComponent
  ]
})
export class ReportModule { }
