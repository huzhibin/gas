import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../../core/api';
import { HttpService } from "../../core/http.service";

@Injectable()
export class DepartmentService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService) { }

  getDepartmentList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getDepartmentList, params)
      .catch(this.handleError);
  }

  addDepartment(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.addDepartment, params)
    .catch(this.handleError);
  }

  deleteDepartment(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.deleteDepartment, params)
    .catch(this.handleError);
  }

  updateDepartment(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.updateDepartment, params)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}