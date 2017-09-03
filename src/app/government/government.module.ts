import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GasCommonModule } from '../component/gas-common.module';

import { GovernmentRoutingModule } from './government-routing.module';
import { GovernmentComponent } from './government.component';
import { FlowProcessingComponent } from './flow/flow-processing.component';

@NgModule({
  imports: [
    GovernmentRoutingModule,
    FormsModule,
    CommonModule,
    AlertModule,
    TabsModule,
    GasCommonModule
  ],
  declarations: [ 
    GovernmentComponent,
    FlowProcessingComponent,
  ]
})
export class GovernmentModule { }
