
import { Component, OnInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';


import { GasWorksService} from './gas-works.service'

@Component({
    templateUrl: 'gas-works.component.html',
    styleUrls: [],
    providers: [GasWorksService]
})
export class GasWorksComponent implements OnInit {
    totalItems: number;//总记录数
    currentPage: number;//当前页号
    pageSize: number;//分页大小
  
    operand: any;//操作对象
    searchParams: {
        chipNum: string,
        cylinderNum : string,
    } = {
        chipNum: '',
        cylinderNum: '',
    };//查询参数
    theads: Array<string>;//表头字段
    companyList: Array<{
        id: number,
        companyName: string,
        companyNumber: string,
        companyType: string,
        contactName: string,
        phone: string,
        address: string,
        email: string,
        description: string,
        fax: string,
        checked?: Boolean
    }>;//用户列表

    constructor(
        private GasWorksService: GasWorksService,) { };

    // // TODO:在提示消失的时候，将它从数组中清除
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
        for (let index = 0; index < this.companyList.length; index++) {
            this.companyList[index].checked = checkedAll ? true : false;
        }
    }

    pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('number items per page: ' + event.itemsPerPage);
    }


    refresh() {
        this.getList();
    }
    export() {

    }
    search() {
        this.getList();
    }
    getList() {
        let params = {
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.GasWorksService.getCompanyList(params).then(data => {
          this.companyList = data.data.list.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage);;
          this.totalItems = data.data.totalItems
        });
    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.companyList.length; i++) {
            if (this.companyList[i].checked) {
                return this.companyList[i];
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

    ngOnInit(): void {
        this.totalItems = 0;
        this.currentPage = 1;
        this.pageSize = 20;


        this.operand = {};

        this.theads = [
            '公司名称',
            '公司编号',
            '公司类型',
            '联系人名称',
            '联系电话',
            '地址',
            '公司描述',
            '邮件',
            '传真fax'
            
        ];



        this.getList();
    }
}
