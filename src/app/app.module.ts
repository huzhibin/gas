import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { UEditorModule } from 'ngx-ueditor';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// pages
import { HomeComponent } from './home/home.component';
import { BigDataComponent } from './big-data/big-data.component';
// import { BasicLayoutComponent } from './shared/basic-layout/basic-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    UEditorModule.forRoot({
      path: './assets/ueditor/',
      options: {
        themePath: './assets/ueditor/themes/'
      }
    }),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BigDataComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
