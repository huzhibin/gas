import { Component, OnInit } from '@angular/core';
import { ResourceList } from "../data/resource";

@Component({
  templateUrl: 'resource.component.html'
})
export class ResourceComponent implements OnInit {
  totalItems: Number;//总记录数
  currentPage: Number;//当前页号
  pageSize: Number;//分页大小

  searchParams: {
    resName: String,
    resNum: String
  };//查询参数
  theads: Array<String>;//表头字段
  resourceList: Array<{
    childCount: Number,
    children: Number,
    createIp: String,
    createTime: String,
    createUser: String,
    cssName: String,
    depart: Number,
    depth: Number,
    id: Number,
    isDelete: Number,
    isHide: Number,
    parent: Number,
    parentName: String,
    parentNum: String,
    parentPath: String,
    remark: String,
    resName: String,
    resNum: String,
    resType: Number,
    resouceType: String,
    sort: Number,
    updateIp: String,
    updateTime: String,
    updateUser: String,
    url: String,
    checked?: Boolean
  }>;//获取的数据列表
  operand: any;//操作对象
  addForm: {
    departName: String,
    parentName: String,
    parentNum: String
  };//添加对象表单
  editForm: {
    departName: String,
    parentName: String,
    parentNum: String
  };//编辑对象表单
  deleteForm: {
    departName: String
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
  getList(resName?: String, resNum?: String, pageSize?: Number, currentPage?: Number) {
    this.resourceList = ResourceList.slice(Number(this.pageSize) * (Number(this.currentPage) - 1), Number(this.pageSize) * Number(this.currentPage));
    console.log('查询后台--getList:' + JSON.stringify([
      { 'resName': this.searchParams.resName },
      { 'resNum': this.searchParams.resNum },
      { 'pageSize': this.pageSize },
      { 'currentPage': this.currentPage }
    ]));
  }

  ngOnInit(): void {
    this.totalItems = ResourceList.length;
    this.currentPage = 1;
    this.pageSize = 20;
    this.searchParams = {
      resName: '',
      resNum: ''
    }
    this.operand = {};
    this.theads = [
      '编号',
      '菜单名称',
      '父级菜单',
      '类型',
      '样式',
      '排序',
      '路径',
      '创建时间'
    ];

    this.getList();
  }
}
