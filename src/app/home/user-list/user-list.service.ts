// import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';

// import { UserList } from '../data/user';

// @Injectable()
// export class UserService {

//   private headers = new Headers({ 'Content-Type': 'application/json' });
//   private userUrl = 'api/userlist';  // URL to web api

//   constructor(private http: Http) { };

//   getUserList(params: any): Promise<any> {
//     let res = {
//       status: 0,
//       msg: '成功',
//       data: {
//         list: UserList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage),
//         totalItems: UserList.length
//       }
//     }
//     return Promise.resolve(UserList);
//   }

//   deleteUser(params: any): Promise<any> {
//     let res = {
//       status: 0,
//       msg: '成功',
//       data: {
//         list: UserList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage),
//         totalItems: UserList.length
//       }
//     }
//     return Promise.resolve(UserList);
//   }

//   editUser(params: any): Promise<any> {
//     let res = {
//       status: 0,
//       msg: '成功',
//       data: {
//         list: UserList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage),
//         totalItems: UserList.length
//       }
//     }
//     return Promise.resolve(UserList);
//   }

//   private handleError(error: any): Promise<any> {
//     console.error('An error occurred', error); // for demo purposes only
//     return Promise.reject(error.message || error);
//   }
// }