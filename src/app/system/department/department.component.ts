import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { DepartmentService } from "./department.service";
@Component({
  templateUrl: 'department.component.html'
})
export class DepartmentComponent implements OnInit {
  totalItems: Number;//总记录数
  currentPage: Number;//当前页号
  pageSize: Number;//分页大小

  searchParams: {
    departmentName: string
  };//查询参数
  theads: Array<string>;//表头字段
  departList: Array<{
    createTime: number,
    departmentName: string,
    departmentNumber: string,
    id: number,
    isDelete: number,
    parentNumber: string,
    parentName: string,
    updateTime: number,
    checked?: boolean
  }>;//获取的数据列表
  operand: any;//操作对象
  addForm: {
    departmentName: string,
    parentName: string,
    parentNumber: string
  };//添加对象表单
  editForm: {
    id: number,
    departmentName: string,
    departmentNumber: string,
    parentName?: string,
    parentNumber: string
  };//编辑对象表单
  deleteForm: {
    departmentName: string,
    departmentNumber: string
  }
  // authorization: {
  // }

  alerts: any = [
  ];

  constructor(private departmentService: DepartmentService) { }
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
      this.departmentService.addDepartment({
        departmentName: this.addForm.departmentName,
        parentNumber: this.addForm.parentNumber
      }).then(data => {
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
      this.departmentService.updateDepartment(this.editForm).then(data => {
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
    this.departmentService.deleteDepartment(this.deleteForm).then(data => {
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
  getList(departmentName?: string, pageSize?: Number, currentPage?: Number) {
    let params = {
      departmentName: this.searchParams.departmentName,
      pageSize: this.pageSize,
      currentPage: this.currentPage
    };
    this.departmentService.getDepartmentList(params).then(data => {
      console.log(data);
      if (data.status == 0) {
        this.departList = data.data.list;
        this.totalItems = data.data.total;
      }
    });
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
      departmentName: '',
      parentName: '',
      parentNumber: ''
    };
  }
  initEditForm(editObj?) {
    this.editForm = {
      id: this.operand.id || '',
      departmentName: this.operand.departmentName || '',
      departmentNumber: this.operand.departmentNumber || '',
      parentName: this.operand.parentName || '',
      parentNumber: this.operand.parentNumber || ''
    };
  }
  initDeleteForm(deleteObj?) {
    this.deleteForm = {
      departmentName: this.operand.departmentName || '',
      departmentNumber: this.operand.departmentNumber || ''
    };
  }
  ngOnInit(): void {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 10;

    this.searchParams = {
      departmentName: ''
    }
    this.operand = {};
    this.theads = [
      '部门名称',
      '上级部门',
      '创建时间',
      '操作'
    ];

    this.initAddForm();
    this.initEditForm();
    this.initDeleteForm();

    this.getList();
  }
}
