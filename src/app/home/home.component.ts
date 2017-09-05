import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // template: '<router-outlet></router-outlet>'
  templateUrl: 'home.component.html',
  styleUrls:['home.css']
})
export class HomeComponent implements AfterViewInit {
  curTime:any ;
  DateTime:any ;


  ngAfterViewInit(): void {
    setInterval(() => {
      this.curTime= new Date().toLocaleTimeString();
      this.DateTime=new Date().toLocaleDateString();
           }, 1000);
   
  }
}
