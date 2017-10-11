import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router';


import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DataTableModule, SharedModule as PrimeSharedModule } from 'primeng/primeng';

import { PaginationComponent } from './pagination/gas-pagination.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    PaginationModule.forRoot(),
    DataTableModule,
    PrimeSharedModule
  ],
  declarations: [
    PaginationComponent,
    PageNotFoundComponent,
    BasicLayoutComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,

    PaginationComponent,
    PageNotFoundComponent,
    BasicLayoutComponent,

    DataTableModule,
    PrimeSharedModule
  ]
})
export class SharedModule { }
