import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FinanceComponent } from './finance.component';
import { FinanceRoutingModule } from './finance-routing.module';

@NgModule({
  imports: [
    FinanceRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ FinanceComponent ]
})
export class FinanceModule { }
