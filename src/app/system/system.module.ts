import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GasCommonModule } from '../component/gas-common.module';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PowerComponent } from './power/power.component';
import { ResourceComponent } from './resource/resource.component';
import { DepartmentComponent } from './department/department.component';
import { LogComponent } from './log/log.component';

import { UserService } from "./user/user.service";
import { PowerService } from "./power/power.service";
import { ResourceService } from "./resource/resource.service";
import { DepartmentService } from "./department/department.service";
import { RoleService } from "./role/role.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    ModalModule,
    AlertModule,
    TabsModule,
    GasCommonModule
  ],
  declarations: [
    SystemComponent,
    UserComponent,
    PowerComponent,
    DepartmentComponent,
    ResourceComponent,
    LogComponent,
    RoleComponent
  ],
  providers: [
    UserService,
    PowerService,
    ResourceService,
    DepartmentService,
    RoleService,
  ]
})
export class SystemModule { }
