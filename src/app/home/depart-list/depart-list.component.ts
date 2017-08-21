import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  templateUrl: 'depart-list.component.html'
})
export class DepartListComponent implements OnInit {
  totalItems: Number;//总记录数
  currentPage: Number;//当前页号
  pageSize: Number;//分页大小

  searchParams: {
    departName: String
  };//查询参数
  theads: Array<String>;//表头字段
  departList: Array<{
    childCount: Number,
    companyID: String,
    createTime: String,
    createUser: String,
    departName: String,
    departNum: String,
    depth: Number,
    id: Number,
    isDelete: Number,
    left: Number,
    parentName: String,
    parentNum: String,
    right: Number,
    snNum: String,
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
  // authorization: {
  // }

  // TODO:在提示消失的时候，将它从数组中清除
  alerts: any = [
  ];

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

  selectAll(checkedAll) {
    for (let index = 0; index < this.departList.length; index++) {
      this.departList[index].checked = checkedAll ? true : false;
    }
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  add(valid, modal) {
    if (valid) {
      this.alerts.push({
        type: 'success',
        msg: '添加成功',
        timeout: 1000
      });
      this.getList();
      modal.hide();
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }
  edit(valid, modal) {
    if (valid) {
      this.alerts.push({
        type: 'success',
        msg: '编辑成功',
        timeout: 1000
      });

      this.getList();
      modal.hide();
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }
  delete(modal) {
    this.alerts.push({
      type: 'success',
      msg: '删除成功',
      timeout: 1000
    });
    modal.hide();
    this.getList();
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
  getList(departName?: String, pageSize?: Number, currentPage?: Number) {
    console.log('查询后台--getList:' + JSON.stringify([
      { 'rolename': this.searchParams.departName },
      { 'pageSize': this.pageSize },
      { 'currentPage': this.currentPage }
    ]));
  }

  //获取选中的第一个对象
  getChecked() {
    for (let i = 0; i < this.departList.length; i++) {
      if (this.departList[i].checked) {
        return this.departList[i];
      }
    }
    return null;
  }
  //检查并设置操作对象
  checkOperand(obj) {
    if (obj || this.getChecked()) {
      this.operand = obj || this.getChecked();
      return true;
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '请先选择要操作的对象',
        timeout: 1000
      });
      return false;
    }
  }

  initAddForm() {
    this.addForm = {
      departName: '',
      parentName: '',
      parentNum:''
    };
  }
  initEditForm(editObj?) {
    this.editForm = {
      departName: this.operand.departName || '',
      parentName: this.operand.parentName || '',
      parentNum: this.operand.parentNum || ''
    };
  }
  initDeleteForm(deleteObj?) {
    this.deleteForm = {
      departName: this.operand.departName || ''
    };
  }
  ngOnInit(): void {
    this.totalItems = 22;
    this.currentPage = 2;

    this.searchParams = {
      departName: ''
    }
    this.operand = {};
    this.theads = [
      '部门名称',
      '上级部门',
      '创建时间',
      '操作'
    ];
    this.departList = [
      {
        childCount: 0,
        companyID: "60E3A1791E2944B1812184E16C02ADFE",
        createTime: "2017-08-05",
        createUser: "",
        departName: "ssdf",
        departNum: "00017",
        depth: 2,
        id: 1017,
        isDelete: 0,
        left: 2,
        parentName: "ssdf",
        parentNum: "00017",
        right: 3,
        snNum: "CBB032B8F98647AF934A613BDD0EDF94",
      },
      {
        childCount: 0,
        companyID: "60E3A1791E2944B1812184E16C02ADFE",
        createTime: "2017-08-05",
        createUser: "",
        departName: "232",
        departNum: "00018",
        depth: 2,
        id: 1017,
        isDelete: 0,
        left: 2,
        parentName: "ssdf",
        parentNum: "00017",
        right: 3,
        snNum: "CBB032B8F98647AF934A613BDD0EDF94",
      }
    ];

    this.initAddForm();
    this.initEditForm();
    this.initDeleteForm();
  }
}
