import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { CustomerService } from './customer.service';
import 'rxjs/Rx' ;

@Component({
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss'],
    providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
    totalItems: number;//总记录数
    operand: any;//操作对象
    currentStep: any;
    
    searchParams: {
        clientName: string,
        gas: string,
        onSite: string,
        pageNumber: number,//当前显示页
        pageSize: number,//分页大小
    };//查询参数
    theads: Array<string>;//表头字段
    CustomerList: Array<{
        id: number,
        gas: string,
        onSite: string,
        customerCode: string,
        clientName: string,
        gender: string,
        customerType: string,
        contactNumber: string,
        contactAddress: string,
        contactPerson: string,
        businessLicenseNumber: string,
        manager: string,
        main: string,
        itsAdministrativeArea: string,
        idNumber: string,
        contactTelephone2: string,
        contactTelephone3: string,
        checked?: Boolean
    }>;//用户列表
    exportParams: {
        clientName: string,
        gas: string,
        onSite: string,
        exportUrl:string;
    }

    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }

    constructor(private CustomerService: CustomerService) { }

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
        for (let index = 0; index < this.CustomerList.length; index++) {
            this.CustomerList[index].checked = checkedAll ? true : false;
        }
    }

    pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('number items per page: ' + event.itemsPerPage);
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


    export(modal) {
        modal.hide();
        let params = {
            clientName:this.exportParams.clientName,
            gas:this.exportParams.gas,
            onSite:this.exportParams.onSite,
        }
        this.CustomerService.exportExcelCustomer(params).then(data=>{
            if(data.status==0){
                this.exportParams.exportUrl="http://192.168.1.113:8080"+data.data;
                window.location.href=this.exportParams.exportUrl;
            }
            else{
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


    refresh() {
        this.getList();
    }
    search() {
        this.getList();
    }
    trim(string) {
        return string.replace(/\s+/g, "");
    }
    getList() {
        let params = {
            clientName: this.trim(this.searchParams.clientName),
            gas: this.trim(this.searchParams.gas),
            onSite: this.trim(this.searchParams.onSite),
            pageSize: this.searchParams.pageSize,
            pageNumber: this.searchParams.pageNumber,
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.CustomerService.getCustomerList(params).then(data => {
            if (data.status == 0) {
                this.CustomerList = data.data.list;
                this.totalItems = data.data.total;
            } else {
                this.alerts.push({
                    type: 'danger',
                    msg: data.msg,
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

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.CustomerList.length; i++) {
            if (this.CustomerList[i].checked) {
                return this.CustomerList[i];
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
            clientName: '',
            gas: '',
            onSite: '',
            pageNumber: 1,//当前显示页
            pageSize: 10,
        }
    }
    initExportParams(){
        this.exportParams={
            clientName:'',
            gas:'',
            onSite:'',
            exportUrl:'',
        }
    }

    ngOnInit(): void {
        this.totalItems = 0;
        this.operand = {};
        this.theads = [
            '所属气站',
            '站点',
            '客户代码',
            '客户名称',
            '性别',
            '客户类型',
            '联系电话',
            '联系地址',
            '联系人',
            '营业执照编号',
            '经办人',
            '负责人',
            '所属行政区域',
            '身份证号',
            '联系电话2',
            '联系电话3',
        ];
        this.initExportParams();
        this.initSearchParams();
        this.getList();
    }
}

