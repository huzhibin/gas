import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

// import { swal } from 'sweetalert/dist/sweetalert.min.js';


@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
  totalItems: Number;//总记录数
  currentPage: Number;//当前页号
  pageSize: Number;//分页大小

  departList: Array<{
    id: Number,
    name: String
  }>;//部门列表
  roleList: Array<{
    id: Number,
    name: String
  }>;//角色列表

  searchParams: {
    username: String,
    badge: String,
    depart: Number,
    role: Number
  } = {
    username: '',
    badge: '',
    depart: null,
    role: null
  };//查询参数
  theads: Array<String>;//表头字段
  userList: Array<{
    username: String,
    badge: String,
    name: String,
    email: String,
    mobilePhone: String,
    tel: String,
    createTime: String,
    loginCount: String,
    department: Number,
    role: Number,
    remark: String,
    checked?: Boolean
  }>;//用户列表

  addUserForm: {
    username: String,
    password: String,
    confirmPwd: String,
    badge: String,
    name: String,
    email: String,
    mobilePhone: String,
    tel: String,
    department: Number,
    role: Number,
    remark: String,
  };//添加用户表单
  editUserForm: {
    username: String,
    badge: String,
    name: String,
    email: String,
    mobilePhone: String,
    tel: String,
    department: Number,
    role: Number,
    remark: String
  };//编辑用户表单
  deleteUserForm: {
    username: String
  }
  resetPwdForm: {
    username: String,
    password: String,
    confirmPwd: String
  }

  // TODO:在提示消失的时候，将它从数组中清除
  alerts: any = [
  ];

  changePage(event) {
    this.pageSize = event.itemsPerPage;
    this.currentPage = event.page;
    this.getUserList(
      this.searchParams.username,
      this.searchParams.badge,
      this.searchParams.depart,
      this.searchParams.role,
      this.pageSize,
      this.currentPage
    );
  }

  changeSize(event) {
    this.pageSize = event;
    this.currentPage = 1;
    this.getUserList(
      this.searchParams.username,
      this.searchParams.badge,
      this.searchParams.depart,
      this.searchParams.role,
      this.pageSize,
      this.currentPage
    );
  }

  selectAll(checkedAll) {
    for (let index = 0; index < this.userList.length; index++) {
      this.userList[index].checked = checkedAll ? true : false;
    }
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  addUser(valid, modal) {
    if (valid) {
      this.alerts.push({
        type: 'success',
        msg: '添加成功',
        timeout: 1000
      });
      this.getUserList(
      this.searchParams.username,
      this.searchParams.badge,
      this.searchParams.depart,
      this.searchParams.role,
      this.pageSize,
      this.currentPage
    );
      modal.hide();
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }
  editUser(valid, modal) {
    if (valid) {
      this.alerts.push({
        type: 'success',
        msg: '编辑成功',
        timeout: 1000
      });

      this.getUserList(
        this.searchParams.username,
        this.searchParams.badge,
        this.searchParams.depart,
        this.searchParams.role,
        this.pageSize,
        this.currentPage
      );
      modal.hide();
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }
  deleteUser(modal) {
    this.alerts.push({
      type: 'success',
      msg: '删除成功',
      timeout: 1000
    });
    modal.hide();
    this.getUserList(
      this.searchParams.username,
      this.searchParams.badge,
      this.searchParams.depart,
      this.searchParams.role,
      this.pageSize,
      this.currentPage
    );
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
    // this.userList = Object.assign({}, this.userList);
    this.getUserList(
      this.searchParams.username,
      this.searchParams.badge,
      this.searchParams.depart,
      this.searchParams.role,
      this.pageSize,
      this.currentPage
    );
    this.userList = [
      {
        username: 'sg',
        badge: '00001',
        name: '嘎斯',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: 3,
        role: 2,
        remark: ''
      }
    ]
  }
  export() {

  }
  search() {
    this.getUserList(
      this.searchParams.username,
      this.searchParams.badge,
      this.searchParams.depart,
      this.searchParams.role,
      this.pageSize,
      this.currentPage
    );
  }
  getUserList(username: String, badge: String, depart: Number, role: Number, pageSize: Number, currentPage: Number) {
    console.log('查询后台--getUserList:' + JSON.stringify([
      { 'username': username },
      { 'badge': badge },
      { 'depart': depart },
      { 'role': role },
      { 'pageSize': pageSize },
      { 'currentPage': currentPage }
    ]));
  }

  getChecked() {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].checked) {
        return this.userList[i];
      }
    }
    return null;
  }
  editUserFormChecked(user) {
    if ((user && user.username) || this.getChecked()) {
      let temp = user || this.getChecked();
      this.initEditUserForm(temp);
      return true;
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '请先选择要编辑的用户',
        timeout: 1000
      });
      return false;
    }
  }
  deleteUserFormChecked(user) {
    if ((user && user.username) || this.getChecked()) {
      let temp = user || this.getChecked();
      this.initDeleteUserForm(temp);
      return true;
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '请先选择要删除的用户',
        timeout: 1000
      });
      return false;
    }
  }
  // resetPwdFormChecked(user) {
  //   if ((user && user.username) || this.getChecked()) {
  //     let temp = user || this.getChecked();
  //     this.initResetPwdForm(temp);
  //     return true;
  //   } else {
  //     this.alerts.push({
  //       type: 'danger',
  //       msg: '请先选择要删除的用户',
  //       timeout: 1000
  //     });
  //     return false;
  //   }
  // }
  initAddUserForm() {
    this.addUserForm = {
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
  initEditUserForm(editUser?) {
    editUser = Object.assign({}, editUser);
    this.editUserForm = {
      username: editUser.username || '',
      badge: editUser.badge || '',
      name: editUser.name || '',
      email: editUser.email || '',
      mobilePhone: editUser.mobilePhone || '',
      tel: editUser.tel || '',
      department: editUser.department || null,
      role: editUser.role || null,
      remark: editUser.remark || ''
    };
  }
  initDeleteUserForm(deleteUser?) {
    deleteUser = Object.assign({}, deleteUser);
    this.deleteUserForm = {
      username: deleteUser.username || '',
    };
  }
  initResetPwdForm(resetUser) {
    resetUser = Object.assign({}, resetUser);
    this.resetPwdForm = {
      username: resetUser.username || '',
      password: resetUser.password || '',
      confirmPwd: resetUser.confirmPwd || '',
    };
  }
  ngOnInit(): void {
    this.totalItems = 22;
    this.currentPage = 2;

    this.departList = [
      { id: 1, name: '研发部' },
      { id: 2, name: '投资部' },
      { id: 3, name: '销售部' }
    ];
    this.roleList = [
      { id: 1, name: '员工' },
      { id: 2, name: '项目经理' },
      { id: 3, name: '总经理' },
      { id: 4, name: '董事长' },
      { id: 5, name: '人事经理' }
    ];

    this.initAddUserForm();
    this.initEditUserForm();
    this.initDeleteUserForm();
    this.initResetPwdForm(null);
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
    this.userList = [
      {
        username: 'hecf',
        badge: '00001',
        name: '啊哈',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: 3,
        role: 2,
        remark: ''
      },
      {
        username: 'eas',
        badge: '00001',
        name: '主打歌',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: 3,
        role: 1,
        remark: ''
      },
      {
        username: 'edsg',
        badge: '00001',
        name: '凡人',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: 3,
        role: 4,
        remark: ''
      },

    ];
  }
}
