import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../../service/api';
import { HttpService } from "../../service/http.service";

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService) { }

  getUserList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getUserList, params)
      .catch(this.handleError);
  }

  addUser(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.addUser, params)
    .catch(this.handleError);
  }

  deleteUser(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.deleteUser, params)
    .catch(this.handleError);
  }

  updateUser(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.updateUser, params)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}