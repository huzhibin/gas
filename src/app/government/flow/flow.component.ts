import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlowService } from "./flow.service";
import { UserService } from "../../system/user/user.service";
import { DepartmentService } from "../../system/department/department.service";
@Component({
  // template: '<router-outlet></router-outlet>'
  templateUrl: 'flow.component.html',
  styleUrls: [],
  providers: [
    FlowService,
    UserService,
    DepartmentService
  ]
})
export class FlowComponent implements OnInit {


  totalItems: number;//总记录数
  currentPage: number;//当前页号
  pageSize: number;//分页大小

  userList: any;
  departmentList: any;//部门列表

  operand: any;//操作对象
  searchParams: {
    name: string,//流程名称
    founder: string,//创建人姓名
    parties: string,//参与人
  };//查询参数
  theads: Array<string>;//表头字段
  flowList: Array<{
    id: number,
    name: string,//名称
    founder: string,//创建人姓名
    founderId: number,//创建人id
    createTime: string,//创建时间
    parties: string,//关系人列表
    details: string,//详情
    describe: string,//描述
    checked?: Boolean
  }>;//用户列表
  operateTypeList: Array<string>;
  addForm: {
    founderId: number,//发起人
    name: string,//流程名称
    describe: string,//流程描述
    party: string,//关系人
    details: Array<{
      id: number,
      parentID: string,//父节点id
      department: string,//部门
      transactor: string,//办理人
      operateType: string//操作类型
    }>
  }
  editForm: {
    id: number,
    founderId: number,//发起人
    name: string,//流程名称
    describe: string,//流程描述
    party: string,//关系人
    details: Array<{
      id: number,
      parentID: string,//父节点id
      department: string,//部门
      transactor: string,//办理人
      operateType: string//操作类型
    }>
  };//编辑用户表单
  deleteForm: {
    id: number,
    name: string
  }
  alerts: any = [];

  constructor(
    private flowService: FlowService,
    private userService: UserService,
    private departmentService: DepartmentService,
  ) {

  }

  addTask(details) {
    let length = details.length;
    details.push({
      id: details[length - 1].id + 1,
      parentID: '0',
      department: '',
      transactor: '',
      operateType: ''
    })
  }
  deleteTask(task, details) {
    for (let i = 0; i < details.length; i++) {
      if (task === details[i] && details.length > 1) {
        details.splice(i, 1);
        break;
      }
    }
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
    for (let index = 0; index < this.flowList.length; index++) {
      this.flowList[index].checked = checkedAll ? true : false;
    }
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('number items per page: ' + event.itemsPerPage);
  }

  add(valid, modal) {
    console.dir(arguments);
    if (valid) {

      let temp = '';
      for (let j = 0; j < this.addForm.details.length; j++) {
        if(this.addForm.details[j].transactor)
        temp += this.addForm.details[j].transactor + ',';
      }

      this.flowService.addFlow({
        name: this.addForm.name,
        founderId: this.addForm.founderId || 1,
        describe: this.addForm.describe,
        party: temp,
        details: JSON.stringify(this.addForm.details),
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
      let temp = '';
      for (let j = 0; j < this.editForm .details.length; j++) {
        if(this.editForm .details[j].transactor)
        temp += this.editForm .details[j].transactor + ',';
      }
      this.flowService.updateFlow({
        id: this.editForm.id,
        name: this.editForm.name,
        founderId: this.editForm.founderId,
        describe: this.editForm.describe,
        party: temp,
        details: JSON.stringify(this.editForm.details),
      }).then(data => {
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
    this.flowService.deleteFlow({
      id: this.deleteForm.id
    }).then(data => {
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

  refresh() {
    this.getList();
  }
  export() {

  }
  search() {
    this.currentPage = 1;
    this.getList();
  }
  getList() {

    let params = {
      pageSize: this.pageSize,
      pageNumber: this.currentPage,
      name: this.searchParams.name,
      founderId: this.searchParams.founder,
      parties: this.searchParams.parties
    };
    console.log('查询后台--getList:' + JSON.stringify(params));
    this.flowService.getFlowList(params).then(data => {
      console.log(data);
      if (data.status == 0) {
        this.flowList = data.data;
        this.totalItems = data.data.length;
      }
    });
  }

  //获取选中的第一个对象
  getChecked() {
    for (let i = 0; i < this.flowList.length; i++) {
      if (this.flowList[i].checked) {
        return this.flowList[i];
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
      founderId: null,
      name: '',
      describe: '',
      party: '',
      details: [
        {
          id: 1,
          parentID: '0',
          department: '',
          transactor: '',
          operateType: ''
        }
      ],
    };
  }
  initEditForm(editObj?) {
    console.dir(JSON.parse(this.operand.details))
    this.editForm = {
      id: this.operand.id || null,
      founderId: this.operand.founderId || null,
      name: this.operand.name || '',
      describe: this.operand.describe || '',
      party: this.operand.party || '',
      details: JSON.parse(this.operand.details) || [
        {
          id: 1,
          parentID: '0',
          department: '',
          transactor: '',
          operateType: ''
        }
      ],
    };
    console.dir(this.editForm);
  }
  initDeleteForm(deleteObj?) {
    this.deleteForm = {
      id: this.operand.id || '',
      name: this.operand.name || '',
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
    }).then(data => {
      if (data.status == 0) {
        this.departmentList = data.data.list;
      } else {

      }
    });
    this.userService.getUserList({
      pageNumber: 1,
      pageSize: 999999
    }).then(data => {
      if (data.status == 0) {
        this.userList = data.data.list;
      } else {

      }
    });

    this.operateTypeList = [
      "审批",
      "阅读",
      "协同",
      "知会",
    ];
    this.flowList = [{
      id: null,
      name: '',
      founder: '',
      founderId: null,
      createTime: '',
      parties: '',
      details: '',
      describe: ''
    }];

    this.searchParams = {
      name: '',
      founder: '',
      parties: ''
    }
    this.operand = {
      details: 'null'
    };

    this.theads = [
      '流程名称',
      '创建人',
      '描述',
      '创建时间',
      '关系人',
      '操作'
    ];

    this.initAddForm();
    this.initEditForm();
    this.initDeleteForm();

    this.getList();
  }
}

