import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { HomeComponent } from './home/home.component';
import { BigDataComponent } from './big-data/big-data.component';
import { BasicLayoutComponent } from './pages/basic-layout.component';

import { AuthGuard } from './service/auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    // redirectTo: '',
    component: BasicLayoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'big-data',
    component: BigDataComponent
  },
  {
    path: '',
    component: BasicLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: '首页'
    },
    children: [
      {
        path: 'information',
        loadChildren: './information/information.module#InformationModule'
      },
      // {
      //   path: 'delivery',
      //   loadChildren: './delivery/delivery.module#DeliveryModule'
      // },
      // {
      //   path: 'standard',
      //   loadChildren: './standard/standard.module#StandardModule'
      // },
      // {
      //   path: 'flow',
      //   loadChildren: './flow/flow.module#FlowModule'
      // },
      // {
      //   path: 'report',
      //   loadChildren: './report/report.module#ReportModule'
      // },
      // {
      //   path: 'system',
      //   loadChildren: './system/system.module#SystemModule'
      // },
      // {
      //   path: 'big-data',
      //   loadChildren: './big-data/big-data.module#BigDataModule'
      // }
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
