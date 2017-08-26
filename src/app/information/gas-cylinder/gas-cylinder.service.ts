// import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// // import { UserList } from '../data/user';

// @Injectable()
// export class GasTankService {

//   private headers = new Headers({ 'Content-Type': 'application/json' });
//   private userUrl = 'api/userlist';  // URL to web api

//   constructor(private http: Http) { 

//   };

//   getGasTankList(params: any): Promise<any> {
//     return this.http
//     .post(this.userUrl, JSON.stringify({name: name}), {headers: this.headers})
//     .toPromise()
//     .then(res => res.json().data)
//     .catch(this.handleError);

// }
// private handleError(error: any): Promise<any> {
//     console.error('An error occurred', error); // for demo purposes only
//     return Promise.reject(error.message || error);
//   }
// }