import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { UEditorModule } from 'ngx-ueditor';

// Routing Module
import { AppRoutingModule } from './app.routing';

// pages
import { HomeComponent } from './home/home.component';
import { BigDataComponent } from './big-data/big-data.component';
import { BasicLayoutComponent } from './pages/basic-layout.component';

import { AuthGuard } from './service/auth-guard.service';
import { HttpService } from './service/http.service';
import { API } from './service/api';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    UEditorModule.forRoot({
      path: './assets/ueditor/',
      options: {
          themePath: './assets/ueditor/themes/'
      }
  })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BigDataComponent,
    BasicLayoutComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuard,
    HttpService,
    {
      provide: "API",
      useValue: API
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
