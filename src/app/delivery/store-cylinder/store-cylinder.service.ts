import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API } from '../../service/api';
import { HttpService } from '../../service/http.service'

@Injectable()
export class StoreCylinderService {
    constructor(private http: Http, private HttpService: HttpService) {

    };

    getStoreCylinderList(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.getGasStationleUrl,params)
            .catch(this.handleError);

    }
    
    AddStore(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.AddStoreUrl,params)
            .catch(this.handleError);

    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }    
    
}