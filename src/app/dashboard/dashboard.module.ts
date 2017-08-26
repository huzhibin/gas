import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatepickerModule } from 'ngx-bootstrap';
// import { NgxAmapModule } from 'ngx-amap';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    BsDropdownModule,
    DatepickerModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
