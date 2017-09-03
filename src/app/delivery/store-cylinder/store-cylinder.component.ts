
import { Component, OnInit, Input } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { StoreCylinderService } from './store-cylinder.service'

@Component({
    templateUrl: 'store-cylinder.component.html',
    styleUrls: [],
    providers: [StoreCylinderService]
})
export class StoreCylinderComponent implements OnInit {
    totalItems: number;//总记录数
    operand: any;//操作对象

    // public bsValue: any ;
    searchParams: {
        beginDate: string,
        cylinderBarcode: string,
        endDate: string,
        pageNumber: number,
        pageSize: number,
    };//查询参数
    theads: Array<string>;//表头字段
    StoreCylinderList: Array<{
        id: number,
        storeDate: string,
        processName: string,
        emptyType: string,
        cylinderBarcode: string,
        cylinderSpecifications: string,
        unit: string,
        carNumber: string,
        operator: string,
        manufacturingUnit: string,
        propertyUnit: string,
        serialNumber: string,
        useTheRegistrationCode: string,
        fillingMedia: string,
        lastInspectionDate: string,
        nextInspectionDate: string,
        checked?: Boolean
    }>;//用户列表


    constructor(
        private StoreCylinderService: StoreCylinderService) { };

    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }
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
        for (let index = 0; index < this.StoreCylinderList.length; index++) {
            this.StoreCylinderList[index].checked = checkedAll ? true : false;
        }
    }
    pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('number items per page: ' + event.itemsPerPage);
    }
    refresh() {
        this.getList();
    }
    search() {
        this.getList();
    };

    trim(string) {
        return string.replace(/\s+/g, "");
    }
    TypeDate(date) {
        if (!date) {
            return null;
        }
        else {
            date = new Date(date);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var s = date.getDate();
            return y + '-' + (m < 10 ? '0' + m : m) + '-' + (s < 10 ? ('0' + s) : s);
        }

    }
    getList() {

        let params = {
            beginDate: this.TypeDate(this.searchParams.beginDate) ? this.TypeDate(this.searchParams.beginDate) : '',
            cylinderBarcode: this.trim(this.searchParams.cylinderBarcode),
            endDate: this.TypeDate(this.searchParams.endDate) ? this.TypeDate(this.searchParams.endDate) : '',
            pageNumber: this.searchParams.pageNumber,
            pageSize: this.searchParams.pageSize,
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.StoreCylinderService.getStoreCylinderList(params).then(data => {
            if (data.status == 0) {
                this.StoreCylinderList = data.data.list;
                this.totalItems = data.data.total;
                this.searchParams.beginDate = '';
                this.searchParams.endDate = '';
            }
            else {
                this.alerts.push({
                    type: 'danger',
                    msg: '查询失败可能是输入的对象不准确',
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
        })
    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.StoreCylinderList.length; i++) {
            if (this.StoreCylinderList[i].checked) {
                return this.StoreCylinderList[i];
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
            beginDate: '',
            cylinderBarcode: '',
            endDate: '',
            pageNumber: 1,
            pageSize: 20,
        }
    }

    ngOnInit(): void {
        this.totalItems = 0;
        // this.currentPage = 1;
        // this.pageSize = 10;


        this.operand = {};

        this.theads = [
            '日期',
            '工序名称',
            '空满类型',
            '气瓶条码',
            '气瓶规格',
            '单位',
            '车号',
            '操作工',
            '制造单位',
            '产权单位',
            '出厂编号',
            '使用登记代码',
            '充装介质',
            '末次检验年月',
            '下次检验年月',


        ];
        this.initSearchParams()
        this.getList();
    }
}
