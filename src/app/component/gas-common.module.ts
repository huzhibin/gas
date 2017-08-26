import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PaginationComponent } from './pagination-comp.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ],
})
export class GasCommonModule { }
