import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from './http.service';
import { AuthGuard } from './auth-guard.service';
import { API } from './api';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    HttpService,
    {
      provide: "API",
      useValue: API
    }
  ]
})
export class CoreModule { }
