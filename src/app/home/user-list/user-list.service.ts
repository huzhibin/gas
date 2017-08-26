import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserList } from '../data/user';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userUrl = 'api/UserList';  // URL to web api

  constructor(private http: Http) { }

  getUserList(params: any): Promise<any> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(response => {
        return response.json().data.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage);
      })
      .catch(this.handleError);
  }

  addUser(params: any): Promise<any> {
    return this.http
      .post(this.userUrl, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  deleteUser(params: any): Promise<any> {
    const url = `${this.userUrl}/${params.id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updateUser(params: any): Promise<any> {
    const url = `${this.userUrl}/${params.id}`;
    return this.http.put(url, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response);
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}