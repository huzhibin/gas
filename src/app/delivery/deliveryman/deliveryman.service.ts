import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API } from '../../service/api';
import { HttpService } from '../../service/http.service'

@Injectable()
export class DeliverService {
    constructor(private http: Http, private HttpService: HttpService) {

    };

    getDeliverList(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.getDeliverUrl,params)
            .catch(this.handleError);

    }
    // exportExcelGasCylinder(params:any): Promise<any> {
    //     return this.HttpService.formPostRequest(API.exportExcelGasCylinderUrl,params)
    //         .catch(this.handleError);

    // }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }    
    
}
