import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { PassportComponent } from './passport.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FindPwdComponent } from './find-pwd/find-pwd.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    // component: PassportComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'find-pwd',
        component: FindPwdComponent,
      }   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
