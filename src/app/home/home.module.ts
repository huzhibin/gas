import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GasCommonModule } from '../component/gas-common.module';

import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { DepartListComponent } from './depart-list/depart-list.component';
import { ResourceComponent } from './resource/resource.component';
import { PowerComponent } from './power/power.component';
import { SNComponent } from './sn/sn.component';
import { HomeRoutingModule } from './home-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryUserService } from './service/in-memory-user.service';
import { InMemoryDepartService } from './service/in-memory-depart.service';
import { InMemoryRoleService } from './service/in-memory-role.service';
import { InMemoryResourceService } from './service/in-memory-resource.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ModalModule,
    AlertModule,
    TabsModule,
    GasCommonModule,
    InMemoryWebApiModule.forRoot(InMemoryUserService)
  ],
  declarations: [
    HomeComponent,
    UserListComponent,
    RoleListComponent,
    DepartListComponent,
    ResourceComponent,
    PowerComponent,
    SNComponent
  ],
  providers: [
    InMemoryUserService,
    // InMemoryRoleService,
    // InMemoryDepartService,
    // InMemoryResourceService
  ]
})
export class HomeModule { }
