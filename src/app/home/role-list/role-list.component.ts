import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { RoleList } from '../data/role'

@Component({
  templateUrl: 'role-list.component.html'
})
export class RoleListComponent implements OnInit {
  totalItems: number;//总记录数
  currentPage: number;//当前页号
  pageSize: number;//分页大小

  searchParams: {
    rolename: string,
    remark: string
  };//查询参数
  theads: Array<string>;//表头字段
  roleList: Array<{
    companyId: string,
    createTime: string,
    createUser: string,
    id: number,
    isDelete: number,
    remark: string,
    rolename: string,
    roleNum: string,
    snNum: string,
    checked?: Boolean
  }>;//角色列表

  operand: any;//操作对象
  addForm: {
    rolename: string,
    remark: string,
  };//添加对象表单
  editForm: {
    id: number,
    rolename: string,
    remark: string,
  };//编辑对象表单
  deleteForm: {
    id: number,
    rolename: string
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
    for (let index = 0; index < this.roleList.length; index++) {
      this.roleList[index].checked = checkedAll ? true : false;
    }
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('number items per page: ' + event.itemsPerPage);
  }

  add(valid, modal) {
    if (valid) {
      this.alerts.push({
        type: 'success',
        msg: '添加成功',
        timeout: 1000
      });
      let role = {
        companyId: "60E3A1791E2944B1812184E16C02ADFE",
        createTime: new Date() + '',
        createUser: "",
        id: Math.random(),
        isDelete: 0,
        remark: this.addForm.remark,
        rolename: this.addForm.rolename,
        roleNum: "00023",
        snNum: "6A0754C93E9E4ECD84AD6E888188D8C9"
      }
      RoleList.push(role);
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
      for (let index = 0; index < RoleList.length; index++) {
        if (RoleList[index].id == this.editForm.id) {
          RoleList[index].rolename = this.editForm.rolename;
          RoleList[index].remark = this.editForm.remark;
        }
      }
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
    for (let index = 0; index < RoleList.length; index++) {
      if (RoleList[index].id == this.deleteForm.id) {
        RoleList.splice(index, 1);
      }
    }
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
  getList(rolename?: string, remark?: string, pageSize?: number, currentPage?: number) {
    this.totalItems = RoleList.length;
    this.roleList = RoleList.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
    console.log('查询后台--getList:' + JSON.stringify([
      { 'rolename': this.searchParams.rolename },
      { 'remark': this.searchParams.remark },
      { 'pageSize': this.pageSize },
      { 'currentPage': this.currentPage }
    ]));
  }

  //获取选中的第一个对象
  getChecked() {
    for (let i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].checked) {
        return this.roleList[i];
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
      rolename: '',
      remark: ''
    };
  }
  initEditForm(editObj?) {
    this.editForm = {
      id: this.operand.id || '',
      rolename: this.operand.rolename || '',
      remark: this.operand.remark || ''
    };
  }
  initDeleteForm(deleteObj?) {
    this.deleteForm = {
      id: this.operand.id || '',
      rolename: this.operand.rolename || ''
    };
  }
  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 20;

    this.searchParams = {
      rolename: '',
      remark: ''
    }
    this.operand = {};
    this.theads = [
      '角色名',
      '创建时间',
      '备注',
      '操作'
    ];

    this.initAddForm();
    this.initEditForm();
    this.initDeleteForm();

    this.getList();
  }
}
