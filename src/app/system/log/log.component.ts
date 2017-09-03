import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { LogService } from "./log.service";
@Component({
  templateUrl: 'log.component.html',
  providers: [LogService]
})
export class LogComponent implements OnInit {
  totalItems: Number;//总记录数
  currentPage: Number;//当前页号
  pageSize: Number;//分页大小

  searchParams: {
    searchType: string,
    keyWord: string
  };//查询参数
  searchTypeList: Array<{
    type: string,
    name: string
  }>;//查询类型
  logList: Array<{
    id: number,
    user: string,
    methodName: string,
    requestIp: string,
    accessTime: number,
  }>;//获取的数据列表

  // authorization: {
  // }

  alerts: any = [
  ];

  constructor(private logService: LogService) { }
  alertShift() {
    this.alerts.shift();
  }

  changePage(event) {
    this.pageSize = event.itemsPerPage;
    this.currentPage = event.page;
    this.getList();
  }

  changeSize(event) {
    this.pageSize = event;
    this.currentPage = 1;
    this.getList();
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  refresh() {
    // this.userList = Object.assign({}, this.userList);
    this.getList();
  }
  export() {

  }
  search() {
    this.getList();
  }
  getList(departmentName?: string, pageSize?: Number, currentPage?: Number) {
    let params = {
      pageNum: this.currentPage,
      pageSize: this.pageSize,
      searchType: this.searchParams.searchType,
      keyWord: this.searchParams.keyWord
    };
    this.logService.searchLog(params).then(data => {
      console.log(data);
      if (data.status == 0) {
        this.logList = data.data.list;
        this.totalItems = data.data.total;
      }
    });
  }
  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 20;

    this.searchTypeList = [
      {
        type: 'searchAll',
        name: '查询所有'
      },
      {
        type: 'searchByIp',
        name: '查询ip'
      },
      {
        type: 'searchMethodName',
        name: '查询访问方法'
      },
      {
        type: 'searchByUser',
        name: '查询用户'
      },
    ]
    this.searchParams = {
      searchType: 'searchAll',
      keyWord: ''
    }

    this.getList();
  }
}
