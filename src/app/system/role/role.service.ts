import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../../service/api';
import { HttpService } from "../../service/http.service";

@Injectable()
export class RoleService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService) { }

  getRoleList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getRoleList, params)
      .catch(this.handleError);
  }

  addRole(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.addRole, params)
    .catch(this.handleError);
  }

  deleteRole(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.deleteRole, params)
    .catch(this.handleError);
  }

  updateRole(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.updateRole, params)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}