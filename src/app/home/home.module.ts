import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { DepartListComponent } from './depart-list/depart-list.component';
import { ResourceComponent } from './resource/resource.component';
import { PowerComponent } from './power/power.component';
import { SNComponent } from './sn/sn.component';
import { HomeRoutingModule } from './home-routing.module';

import { PaginationComponent } from '../component/pagination-comp.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    PaginationModule,
    ModalModule,
    NgxDatatableModule
  ],
  declarations: [ 
    HomeComponent,
    UserListComponent,
    RoleListComponent,
    DepartListComponent,
    ResourceComponent,
    PowerComponent,
    SNComponent,
    PaginationComponent
   ]
})
export class HomeModule { }
