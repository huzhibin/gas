import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    OrderRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ OrderComponent ]
})
export class OrderModule { }
