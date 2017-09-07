import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { CompanyService } from './company.service';
import 'rxjs/Rx';

import { API } from '../../service/api';
@Component({
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.scss'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
  totalItems: number;//总记录数
  operand: any;//操作对象
  currentStep: any;
  loading: Boolean;
  searchParams: {
    companyName: string,
    createUser: string,
    pageNumber: number,//当前显示页
    pageSize: number,//分页大小
  };//查询参数
  theads: Array<string>;//表头字段
  CompanyList: Array<{
    id: number,
    companyNumber: string,
    companyName: string,
    companyType: string,
    createUser: string,
    address: string,
    description: string,
    contactName: string,
    phone: string,
    email: string,
    fax: string,


    checked?: Boolean
  }>;//用户列表
  addForm: {
    companyNumber: string,
    companyName: string,
    companyType: string,
    createUser: string,
    address: string,
    description: string,
    contactName: string,
    phone: string,
    email: string,
    fax: string,
    isDelete: string,
  }
  editForm: {
    id: string,
    companyNumber: string,
    companyName: string,
    companyType: string,
    createUser: string,
    address: string,
    description: string,
    contactName: string,
    phone: string,
    email: string,
    fax: string,
  }
  deleteForm: {
    id: string,
    companyName: string,
  }

  exportParams: {
    companyName: string,
    createUser: string,
    exportUrl: string;
  }
  // // TODO:在提示消失的时候，将它从数组中清除
  alerts: any = [
  ];

  alertShift() {
    this.alerts.shift();
  }

  constructor(private CompanyService: CompanyService) { }

  changePage(event) {
    this.searchParams.pageSize = event.itemsPerPage;
    this.searchParams.pageNumber = event.page;
    this.getList();
  }

  changeSize(event) {
    this.searchParams.pageSize = event;
    this.searchParams.pageNumber = 1;
    this.getList();
  }

  selectAll(checkedAll) {
    for (let index = 0; index < this.CompanyList.length; index++) {
      this.CompanyList[index].checked = checkedAll ? true : false;
    }
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('number items per page: ' + event.itemsPerPage);
  }

  add(valid, modal) {
    if (valid) {
      this.CompanyService.AddCompany(this.addForm).then(data => {
        if (data.status == 0) {
          this.alerts.push({
            type: 'success',
            msg: '添加成功',
            timeout: 1000
          });
        } else {
          this.alerts.push({
            type: 'danger',
            msg: '添加失败',
            timeout: 1000
          });
          return false;
        }
      }).catch(data => {
        this.alerts.push({
          type: 'danger',
          msg: '服务器出错了',
          timeout: 1000
        });
      });
      modal.hide();
      this.getList();
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
      modal.hide();
      this.CompanyService.UpdateCompany(this.editForm).then(data => {

        this.alerts.push({
          type: 'success',
          msg: '编辑成功',
          timeout: 1000
        });
        this.getList();

      }).catch(data => {
        this.alerts.push({
          type: 'danger',
          msg: '服务器出错了',
          timeout: 1000
        });
        modal.hide();
      });;
    } else {
      this.alerts.push({
        type: 'danger',
        msg: '表单填写不正确',
        timeout: 1000
      });
    }
  }

  delete(modal) {
    this.CompanyService.DeleteCompany(this.deleteForm).then(data => {
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

  export(modal) {
    modal.hide();
    let params = {
      companyName: this.exportParams.companyName,
      createUser: this.exportParams.createUser,

    }
    this.CompanyService.exportExcelCompany(params).then(data => {
      if (data.status == 0) {
        this.exportParams.exportUrl = API.URL + data.data;
        window.location.href = this.exportParams.exportUrl;
      }
      else {
        this.alerts.push({
          type: 'danger',
          msg: '导出失败',
          timeout: 1000
        });
        return false;
      }
    }).catch(data => {
      this.alerts.push({
        type: 'danger',
        msg: '服务器出错了',
        timeout: 1000
      });
    });
  }
  import(modal) {
    this.alerts.push({
      type: 'success',
      msg: '导入成功',
      timeout: 1000
    });
    modal.hide();
    this.getList();
  }

  stepChange(count) {
    if (this.currentStep === 1 && count === -1)
      return;
    if (this.currentStep === 3 && count === 1)
      return;
    this.currentStep += count;
  }

  refresh() {
    this.getList();
    this.initSearchParams();
  }
  search() {
    this.getList();
    this.initSearchParams();
  }

  getList() {
    this.loading = true;
    let params = {
      companyName: this.searchParams.companyName,
      createUser: this.searchParams.createUser,
      pageNumber: this.searchParams.pageNumber,//当前显示页
      pageSize: this.searchParams.pageSize,//分页大小
    };
    // console.log('查询后台--getList:' + JSON.stringify(params));
    this.CompanyService.getCompanyList(params).then(data => {
      if (data.status == 0) {
        this.CompanyList = data.data.list;
        this.totalItems = data.data.total;

      } else {
        // this.alerts.push({
        //     type: 'danger',
        //     msg: data.msg,
        //     timeout: 1000
        // });
        // return false;
        this.CompanyList = [];
      }
      this.loading = false;
    }).catch(data => {
      this.alerts.push({
        type: 'danger',
        msg: '服务器出错了',
        timeout: 1000
      });
    });
  }

  // //获取选中的第一个对象
  getChecked() {
    for (let i = 0; i < this.CompanyList.length; i++) {
      if (this.CompanyList[i].checked) {
        return this.CompanyList[i];
      }
    }
    return null;
  }
  // //检查并设置操作对象
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


  initSearchParams() {
    this.searchParams = {
      companyName: '',
      createUser: '',
      pageNumber: 1,
      pageSize: 10,
    }
  }
  initAddForm() {
    this.addForm = {
      companyNumber: '',
      companyName: '',
      companyType: '',
      createUser: '',
      address: '',
      description: '',
      contactName: '',
      phone: '',
      email: '',
      fax: '',
      isDelete: '',
    }
  }
  initEditForm() {
    this.editForm = {
      id: this.operand.id || '',
      companyNumber: this.operand.companyNumber || '',
      companyName: this.operand.companyName || '',
      companyType: this.operand.companyType || '',
      createUser: this.operand.createUser || '',
      address: this.operand.address || '',
      description: this.operand.description || '',
      contactName: this.operand.contactName || '',
      phone: this.operand.phone || '',
      email: this.operand.email || '',
      fax: this.operand.fax || '',
    }
  }
  initDeleteForm() {
    this.deleteForm = {
      id: this.operand.id || '',
      companyName: this.operand.companyName || '',
    }
  }

  initExportParams() {
    this.exportParams = {
      companyName: '',
      createUser: '',
      exportUrl: '',
    }
  }

  ngOnInit(): void {
    this.totalItems = 0;
    this.loading = false;
    this.operand = {};
    this.theads = [
      '公司编号',
      '公司名称',
      '公司类型',
      '创建人',
      '地址',
      '公司描述',
      '联系人名称',
      '联系电话',
      '联系邮件',
      '传真',
    ];
    this.CompanyList = [];
    this.initEditForm();
    this.initAddForm();
    this.initDeleteForm();
    this.initExportParams();
    this.initSearchParams();
    this.getList();
  }
}

