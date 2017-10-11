import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { HomeComponent } from './home/home.component';
import { BigDataComponent } from './big-data/big-data.component';
import { BasicLayoutComponent } from './shared/basic-layout/basic-layout.component';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { AuthGuard } from './core/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'big-data',
    component: BigDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: '首页'
    },
  },
  {
    path: '',
    component: BasicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'information',
        loadChildren: './information/information.module#InformationModule'
      },
      {
        path: 'delivery',
        loadChildren: './delivery/delivery.module#DeliveryModule'
      },
      {
        path: 'standard',
        loadChildren: './standard/standard.module#StandardModule'
      },
      {
        path: 'government',
        loadChildren: './government/government.module#GovernmentModule'
      },
      {
        path: 'report',
        loadChildren: './report/report.module#ReportModule'
      },
      {
        path: 'system',
        loadChildren: './system/system.module#SystemModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: './passport/passport.module#PassportModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
