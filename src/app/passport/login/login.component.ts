import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PassportService } from "../passport.service";
@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;

  constructor(
    private passportService: PassportService,
    private router:Router
  ) { }
  login() {
    this.passportService.login({
      mobile: this.userName,
      password: this.password
    }).then(data => {
      if(data.status == 0){
        sessionStorage.setItem("user", this.userName);
        this.router.navigateByUrl('/home');
      }else{
        alert(data.msg);
      }
    }).catch(error => alert(error));
  }
  ngOnInit(): void {

  }
}