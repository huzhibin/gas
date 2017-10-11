import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../../core/api';
import { HttpService } from "../../core/http.service";

@Injectable()
export class FlowService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService) { }

  addFlow(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.addFlow, params)
      .catch(this.handleError);
  }
  deleteFlow(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.deleteFlow, params)
      .catch(this.handleError);
  }
  updateFlow(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.updateFlow, params)
      .catch(this.handleError);
  }
  getFlowList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getFlowList, params)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}