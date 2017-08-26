import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FlowComponent } from './flow.component';
import { FlowRoutingModule } from './flow-routing.module';

@NgModule({
  imports: [
    FlowRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ FlowComponent ]
})
export class FlowModule { }
