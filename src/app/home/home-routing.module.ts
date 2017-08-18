import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { DepartListComponent } from './depart-list/depart-list.component';
import { ResourceComponent } from './resource/resource.component';
import { PowerComponent } from './power/power.component';
import { SNComponent } from './sn/sn.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: '系统设置'
    },
    children: [
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: '员工管理'
        },
      },
      {
        path: 'role-list',
        component: RoleListComponent,
        data: {
          title: '角色管理'
        },
      },
      {
        path: 'depart-list',
        component: DepartListComponent,
        data: {
          title: '部门管理'
        },
      },
      {
        path: 'resource',
        component: ResourceComponent,
        data: {
          title: '资源管理'
        },
      },
      {
        path: 'power',
        component: PowerComponent,
        data: {
          title: '权限管理'
        },
      },
      {
        path: 'sn',
        component: SNComponent,
        data: {
          title: '标签管理'
        },
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
