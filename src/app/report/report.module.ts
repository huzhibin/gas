import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  imports: [
    ReportRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ ReportComponent ]
})
export class ReportModule { }
