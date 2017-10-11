import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API } from '../../core/api';
import { HttpService } from '../../core/http.service'

@Injectable()
export class CustomerService {
    constructor(private http: Http, private HttpService: HttpService) {

    };

    getCustomerList(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.getCustomerUrl,params)
            .catch(this.handleError);

    }
    
    exportExcelCustomer(params:any): Promise<any> {
        return this.HttpService.formPostRequest(API.exportExcelCustomerUrl,params)
            .catch(this.handleError);

    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }    
    
}

