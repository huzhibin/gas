import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API } from '../../service/api';
import { HttpService } from "../../service/http.service";

@Injectable()
export class MapService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(private http: Http, private httpService: HttpService) { }

  getCarPosition(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getCarPosition, params)
      .catch(this.handleError);
  }

  getCarPath(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.getCarPath, params)
    .catch(this.handleError);
  }

  getDeliveryManPosition(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getDelieveryManPosition, params)
      .catch(this.handleError);
  }

  getDeliveryManPath(params: any): Promise<any> {
    return this.httpService
    .withCredentialsPostRequest(API.getDelieveryManPath, params)
    .catch(this.handleError);
  }

  getGasPosition(params: any): Promise<any> {
    return this.httpService
      .withCredentialsPostRequest(API.getCarPosition, params)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}