import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../../core/api';
import { HttpService } from "../../core/http.service";

@Injectable()
export class AffairService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService, @Inject("API") private API) { }

  startProcess(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.startProcess, params)
      .catch(this.handleError);
  }
  getStartProcessList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.getStartProcessList, params)
      .catch(this.handleError);
  }
  submitPlan(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.submitPlan, params)
      .catch(this.handleError);
  }
  getPlanList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.getPlanList, params)
      .catch(this.handleError);
  }
  submitVerifyResult(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.submitVerifyResult, params)
      .catch(this.handleError);
  }
  getVerifyList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.getVerifyList, params)
      .catch(this.handleError);
  }
  submitActionResult(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.submitActionResult, params)
      .catch(this.handleError);
  }
  getActionList(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.getActionList, params)
      .catch(this.handleError);
  }
  submitFinishResult(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(this.API.submitFinishResult, params)
      .catch(this.handleError);
  }


  getMyStartProcess(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getMyStartProcess, params)
      .catch(this.handleError);
  }
  getMyParticipateProcess(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getMyParticipateProcess, params)
      .catch(this.handleError);
  }
  getMyFinishProcess(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getMyFinishProcess, params)
      .catch(this.handleError);
  }
  getFinishProcessDetail(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getFinishProcessDetail, params)
      .catch(this.handleError);
  }
  getProcessStateDiagram(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPost(API.getProcessStateDiagram, params)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}