import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API } from '../../core/api';
import { HttpService } from '../../core/http.service'

@Injectable()
export class GasCylinderService {
    constructor(private http: Http, private HttpService: HttpService) {

    };

    getGasCylinderList(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.getGasCylinderUrl,params)
            .catch(this.handleError);

    }
    exportExcelGasCylinder(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.exportExcelGasCylinderUrl,params)
            .catch(this.handleError);

    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }    
    
}