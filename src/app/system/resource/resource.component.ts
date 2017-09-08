import { Component, OnInit } from '@angular/core';

import { ResourceService } from './resource.service'

@Component({
  templateUrl: 'resource.component.html'
})
export class ResourceComponent implements OnInit {
  totalItems: Number;//总记录数
  currentPage: Number;//当前页号
  pageSize: Number;//分页大小

  searchParams: {
    resourceName: String,
    resourceNumber: String
  };//查询参数
  theads: Array<String>;//表头字段
  resourceList: Array<{
    resourceNumber: string,
    resourceName: string,
    parentNum: string,
    parentName: string,
    sort: string,
    url: string,
    createTime: string,
    resouceType: string,
    remark: string
    checked?: Boolean
  }>;//获取的数据列表

  constructor(private resourceService: ResourceService) { }

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

  selectAll(checkedAll) {
    for (let index = 0; index < this.resourceList.length; index++) {
      this.resourceList[index].checked = checkedAll ? true : false;
    }
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
  getList(resourceName?: String, resourceNumber?: String, pageSize?: Number, currentPage?: Number) {
    let params = {
      'resourceName': this.searchParams.resourceName,
      'resourceNumber': this.searchParams.resourceNumber,
      'pageSize': this.pageSize,
      'pageNumber': this.currentPage
    }
    this.resourceService.getResourceList(params).then(data=>{
      if(data.status == 0){
        this.resourceList = data.data.list;
        this.totalItems = data.data.total;
      }
    })
  }

  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 10;
    this.searchParams = {
      resourceName: '',
      resourceNumber: ''
    }
    this.theads = [
      '编号',
      '菜单名称',
      '父级菜单',
      '类型',
      '排序',
      '路径',
      '创建时间',
      '备注'
    ];

    this.getList();
  }
}
