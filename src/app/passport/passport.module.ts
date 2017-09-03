import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { PassportComponent } from './passport.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FindPwdComponent } from './find-pwd/find-pwd.component';

import { PassportService } from "./passport.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PassportRoutingModule
  ],
  declarations: [
    PassportComponent,
    LoginComponent,
    RegisterComponent,
    FindPwdComponent
  ],
  providers: [
    PassportService
  ]
})
export class PassportModule { }
