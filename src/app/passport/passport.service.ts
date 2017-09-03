import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../service/api';
import { HttpService } from "../service/http.service";

@Injectable()
export class PassportService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService) { }

  login(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.login, params)
      .catch(this.handleError);
  }

  register(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.register, params)
    .catch(this.handleError);
  }

  findPwd(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.findPwd, params)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}