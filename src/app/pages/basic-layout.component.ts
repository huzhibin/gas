import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'basic-layout',
  templateUrl: './basic-layout.component.html',
  // styleUrls: ['./module.component.css']
})
export class BasicLayoutComponent implements AfterViewInit{
   curTime:any ;
   DateTime:any ;

  

  ngAfterViewInit(): void {
  setInterval(() => {
     this.curTime= new Date().toLocaleTimeString();
     this.DateTime=new Date().toLocaleDateString();
          }, 1000);
  }
}
