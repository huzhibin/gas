import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { BizComponent } from './biz.component';
import { BizRoutingModule } from './biz-routing.module';

@NgModule({
  imports: [
    BizRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ BizComponent ]
})
export class BizModule { }
