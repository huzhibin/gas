import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { DepartList } from "../data/depart";
import { UserService } from './user-list.service';

import { UserList } from '../data/user'

@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  totalItems: number;//总记录数
  currentPage: number;//当前页号
  pageSize: number;//分页大小

  departList: any;//部门列表
  roleList: Array<{
    id: number,
    name: string
  }>;//角色列表

  operand: any;//操作对象
  searchParams: {
    username: string,
    badge: string,
    depart: number,
    role: number
  } = {
    username: '',
    badge: '',
    depart: null,
    role: null
  };//查询参数
  theads: Array<string>;//表头字段
  userList: Array<{
    id: number,
    username: string,
    badge: string,
    name: string,
    email: string,
    mobilePhone: string,
    tel: string,
    createTime: string,
    loginCount: string,
    department: number,
    role: number,
    remark: string,
    checked?: Boolean
  }>;//用户列表

  addForm: {
    username: string,
    password: string,
    confirmPwd: string,
    badge: string,
    name: string,
    email: string,
    mobilePhone: string,
    tel: string,
    department: number,
    role: number,
    remark: string,
  };//添加用户表单
  editForm: {
    id: number,
    username: string,
    badge: string,
    name: string,
    email: string,
    mobilePhone: string,
    tel: string,
    department: number,
    role: number,
    remark: string
  };//编辑用户表单
  deleteForm: {
    id: number,
    username: string
  }
  resetPwdForm: {
    username: string,
    password: string,
    confirmPwd: string
  }

  // TODO:在提示消失的时候，将它从数组中清除
  alerts: any = [
  ];

  alertShift() {
    this.alerts.shift();
  }

  constructor(private userService: UserService) { }

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
    for (let index = 0; index < this.userList.length; index++) {
      this.userList[index].checked = checkedAll ? true : false;
    }
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('number items per page: ' + event.itemsPerPage);
  }

  add(valid, modal) {
    if (valid) {
      this.userService.addUser(this.addForm).then(data => {
        console.dir(data);
        this.alerts.push({
          type: 'success',
          msg: '添加成功',
          timeout: 1000
        });
        this.getList();
        modal.hide();
      });
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
      this.userService.updateUser(this.editForm).then(data => {
        console.dir(data);
        this.alerts.push({
          type: 'success',
          msg: '编辑成功',
          timeout: 1000
        });
        this.getList();
        modal.hide();
      });
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }
  delete(modal) {
    this.userService.updateUser(this.deleteForm).then(data => {
      console.dir(data);
      this.alerts.push({
        type: 'success',
        msg: '删除成功',
        timeout: 1000
      });
      this.getList();
      modal.hide();
    });
  }
  resetPwd(valid, modal) {
    if (valid) {
      this.alerts.push({
        type: 'success',
        msg: '密码重置成功',
        timeout: 1000
      });
      modal.hide();
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }

  refresh() {
    this.getList();
  }
  export() {

  }
  search() {
    this.getList();
  }
  getList(username?: string, badge?: string, depart?: number, role?: number, pageSize?: number, currentPage?: number) {

    let params = {
      username: this.searchParams.username,
      badge: this.searchParams.badge,
      depart: this.searchParams.depart,
      role: this.searchParams.role,
      pageSize: this.pageSize,
      currentPage: this.currentPage
    };
    console.log('查询后台--getList:' + JSON.stringify(params));
    this.userService.getUserList(params).then(data => {
      console.log(data);
      this.userList = data;
      this.totalItems = data.length;
    });
  }

  //获取选中的第一个对象
  getChecked() {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].checked) {
        return this.userList[i];
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
      username: '',
      password: '',
      confirmPwd: '',
      badge: '',
      name: '',
      email: '',
      mobilePhone: '',
      tel: '',
      department: null,
      role: null,
      remark: ''
    };
  }
  initEditForm(editObj?) {
    // editObj = Object.assign({}, editObj);
    this.editForm = {
      id: this.operand.id || '',
      username: this.operand.username || '',
      badge: this.operand.badge || '',
      name: this.operand.name || '',
      email: this.operand.email || '',
      mobilePhone: this.operand.mobilePhone || '',
      tel: this.operand.tel || '',
      department: this.operand.department || null,
      role: this.operand.role || null,
      remark: this.operand.remark || ''
    };
  }
  initDeleteForm(deleteObj?) {
    // deleteObj = Object.assign({}, deleteObj);
    this.deleteForm = {
      id: this.operand.id || '',
      username: this.operand.username || '',
    };
  }
  initResetPwdForm(resetUser?) {
    // resetUser = Object.assign({}, resetUser);
    this.resetPwdForm = {
      username: this.operand.username || '',
      password: this.operand.password || '',
      confirmPwd: this.operand.confirmPwd || '',
    };
  }
  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 20;

    this.departList = DepartList;
    this.roleList = [
      { id: 1, name: '员工' },
      { id: 2, name: '项目经理' },
      { id: 3, name: '总经理' },
      { id: 4, name: '董事长' },
      { id: 5, name: '人事经理' }
    ];
    this.operand = {};

    this.theads = [
      '用户名',
      '工号',
      '真名',
      '邮箱',
      '手机',
      '固定电话',
      '创建时间',
      '登录次数',
      '部门',
      '角色',
      '备注',
      '操作'
    ];

    this.initAddForm();
    this.initEditForm();
    this.initDeleteForm();
    this.initResetPwdForm();

    this.getList();
  }
}
