import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { RoleService } from './role.service';

@Component({
  templateUrl: 'role.component.html'
})
export class RoleComponent implements OnInit {
  totalItems: number;//总记录数
  currentPage: number;//当前页号
  pageSize: number;//分页大小

  searchParams: {
    roleName: string,
    remark: string
  };//查询参数
  theads: Array<string>;//表头字段
  roleList: Array<{
    companyNumber: string,
    createTime: number,
    id: number,
    isDelete: number,
    remark: string,
    roleName: string,
    roleNumber: string,
    updateTime: number,
    checked?: Boolean
  }>;//角色列表

  operand: any;//操作对象
  addForm: {
    roleName: string,
    remark: string,
  };//添加对象表单
  editForm: {
    id: number,
    roleName: string,
    remark: string,
    roleNumber?: string
  };//编辑对象表单
  deleteForm: {
    roleNumber: string,
    roleName: string
  }
  // authorization: {
  // }

  // TODO:在提示消失的时候，将它从数组中清除
  alerts: any = [
  ];

  constructor(private roleService: RoleService) {

  }
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
      this.roleService.addRole(this.addForm).then(data => {
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
      })
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
      this.roleService.updateRole(this.editForm).then(data => {
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
      })
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }
  delete(modal) {
    this.roleService.deleteRole(this.deleteForm).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '删除成功',
          timeout: 1000
        });
        modal.hide();
        this.getList();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
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
  getList(roleName?: string, remark?: string, pageSize?: number, currentPage?: number) {
    let params = {
      roleName: this.searchParams.roleName,
      remark: this.searchParams.remark,
      pageSize: this.pageSize,
      pageNumber: this.currentPage
    };

    this.roleService.getRoleList(params).then(data => {
      console.log(data);
      if (data.status == 0) {
        this.roleList = data.data.list;
        this.totalItems = data.data.total;
      }
    });
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
      roleName: '',
      remark: ''
    };
  }
  initEditForm(editObj?) {
    this.editForm = {
      id: this.operand.id || '',
      roleName: this.operand.roleName || '',
      remark: this.operand.remark || ''
    };
  }
  initDeleteForm(deleteObj?) {
    this.deleteForm = {
      roleNumber: this.operand.roleNumber || '',
      roleName: this.operand.roleName || ''
    };
  }
  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 20;

    this.searchParams = {
      roleName: '',
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
