import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { UserService } from './user.service';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';

@Component({
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  totalItems: number;//总记录数
  currentPage: number;//当前页号
  pageSize: number;//分页大小

  departList: any;//部门列表
  roleList: any;//角色列表

  operand: any;//操作对象
  searchParams: {
    userName: string,
    department: string,
    roleNumber: string
  };//查询参数
  theads: Array<string>;//表头字段
  userList: Array<{
    id: number,
    userCode: string,
    userName: string,
    realName: string,
    email: string,
    mobile: string,
    phone: string,
    createTime: string,
    department: string,
    departmentName: string,
    roleNumber: string,
    roleName: string,
    remark: string,
    resources?: Array<any>,
    // loginCount: string,
    checked?: Boolean
  }>;//用户列表

  addForm: {
    userName: string,
    password: string,
    confirmPwd: string,
    realName: string,
    email: string,
    mobile: string,
    phone: string,
    department: string,
    roleNumber: string,
    remark: string,
  };//添加用户表单
  editForm: {
    id: number,
    userCode: string,
    userName: string,
    realName: string,
    email: string,
    mobile: string,
    phone: string,
    department: string,
    roleNumber: string,
    remark: string,
  };//编辑用户表单
  deleteForm: {
    id: number,
    userName: string
  }
  resetPwdForm: {
    userName: string,
    password: string,
    confirmPwd: string
  }
  alerts: any = [];

  alertShift() {
    this.alerts.shift();
  }

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private roleService: RoleService,
  ) { }

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
        if (data.status == 0) {
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
            msg: data.msg,
            timeout: 1000
          });
        }
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
        if (data.status == 0) {
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
            msg: data.msg,
            timeout: 1000
          });
        }
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
    this.userService.deleteUser(this.deleteForm).then(data => {
      console.dir(data);
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '删除成功',
          timeout: 1000
        });
        this.getList();
        modal.hide();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
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
    this.currentPage = 1;
    this.getList();
  }
  getList(userName?: string, department?: number, roleNumber?: number, pageSize?: number, currentPage?: number) {

    let params = {
      pageSize: this.pageSize,
      pageNumber: this.currentPage,
      userName: this.searchParams.userName,
      department: this.searchParams.department,
      roleNumber: this.searchParams.roleNumber
    };
    console.log('查询后台--getList:' + JSON.stringify(params));
    this.userService.getUserList(params).then(data => {
      console.log(data);
      if (data.status == 0) {
        this.userList = data.data.list;
        this.totalItems = data.data.total;
      }
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
      userName: '',
      password: '',
      confirmPwd: '',
      realName: '',
      email: '',
      mobile: '',
      phone: '',
      department: '',
      roleNumber: null,
      remark: ''
    };
  }
  initEditForm(editObj?) {
    // editObj = Object.assign({}, editObj);
    this.editForm = {
      id: this.operand.id || '',
      userCode: this.operand.userCode || '',
      userName: this.operand.userName || '',
      realName: this.operand.realName || '',
      email: this.operand.email || '',
      mobile: this.operand.mobile || '',
      phone: this.operand.phone || '',
      department: this.operand.department || null,
      roleNumber: this.operand.roleNumber || null,
      remark: this.operand.remark || ''
    };
  }
  initDeleteForm(deleteObj?) {
    // deleteObj = Object.assign({}, deleteObj);
    this.deleteForm = {
      id: this.operand.id || '',
      userName: this.operand.userName || '',
    };
  }
  initResetPwdForm(resetUser?) {
    // resetUser = Object.assign({}, resetUser);
    this.resetPwdForm = {
      userName: this.operand.userName || '',
      password: this.operand.password || '',
      confirmPwd: this.operand.confirmPwd || '',
    };
  }
  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 20;

    this.departmentService.getDepartmentList({
      pageNumber: 1,
      pageSize: 999999,
      departmentName: ''
    }).then(data=>{
      if(data.status == 0){
        this.departList = data.data.list;
      }else{

      }
    });
    this.roleService.getRoleList({
      pageNumber: 1,
      pageSize: 999999,
      roleName: '',
      remark: ''
    }).then(data=>{
      if(data.status == 0){
        this.roleList = data.data.list;
      }else{

      }
    })
   
    this.searchParams = {
      userName: '',
      department: '',
      roleNumber: ''
    }
    this.operand = {};

    this.theads = [
      '用户名',
      '真名',
      '邮箱',
      '手机',
      '固定电话',
      '创建时间',
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
