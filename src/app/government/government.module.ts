import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GasCommonModule } from '../component/gas-common.module';

import { GovernmentRoutingModule } from './government-routing.module';
import { GovernmentComponent } from './government.component';
import { FlowComponent } from './flow/flow.component';
import { AffairComponent } from './affair/affair.component';

@NgModule({
  imports: [
    GovernmentRoutingModule,
    FormsModule,
    CommonModule,
    AlertModule,
    TabsModule,
    ModalModule,
    GasCommonModule
  ],
  declarations: [ 
    GovernmentComponent,
    FlowComponent,
    AffairComponent
  ]
})
export class GovernmentModule { }
