import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { UserComponent } from './user/user.component';
// import { RoleComponent } from './role/role.component';
import { PowerComponent } from './power/power.component';
import { ResourceComponent } from './resource/resource.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    data: {
      title: '系统配置'
    },
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: '账号分配'
        },
      },
      {
        path: 'power',
        component: PowerComponent,
        data: {
          title: '权限分配'
        },
      },
      {
        path: 'resource',
        component: ResourceComponent,
        data: {
          title: '模块权限'
        },
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: {
          title: '组织架构'
        },
      },
      // {
      //   path: 'log',
      //   component: DeliverymanComponent,
      //   data: {
      //     title: '系统日志'
      //   },
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
