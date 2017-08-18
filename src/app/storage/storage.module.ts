import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { StorageComponent } from './storage.component';
import { StorageRoutingModule } from './storage-routing.module';

@NgModule({
  imports: [
    StorageRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ StorageComponent ]
})
export class StorageModule { }
