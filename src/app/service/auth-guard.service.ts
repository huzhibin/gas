import { Injectable } from '@angular/core';
import { Router, Route, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate() {
    console.log('AuthGuard#canActivate called');
    // this.router.navigate(['/login']);
    return true;
  }
  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    console.log(route);
    return this.checkLogin(url);
  }

  checkLogin(url): boolean {
    return false;
  }
}