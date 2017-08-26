import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './pages/full-layout.component';
import { P404Component } from './pages/404.component';

import { AuthGuard } from './service/auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'report',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'information',
        loadChildren: './information/information.module#InformationModule'
      },
      {
        path: 'report',
        loadChildren: './report/report.module#ReportModule'
      },
      {
        path: 'flow',
        loadChildren: './flow/flow.module#FlowModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: './passport/passport.module#PassportModule'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
