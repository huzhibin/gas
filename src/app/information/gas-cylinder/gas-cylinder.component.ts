
import { Component, OnInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
// import { GasCylinderList } from '../data/gas-tank';

import { GasCylinderService } from './gas-cylinder.service';

@Component({
    templateUrl: 'gas-cylinder.component.html',
    styleUrls: [],
    providers: [GasCylinderService]
})
export class GasCylinderComponent implements OnInit {
    totalItems: number;//总记录数
    // currentPage: number;//当前页号
    // pageSize: number;//分页大小
    // @Input() bsValue;
    // public bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
    // departList: any;//部门列表

    operand: any;//操作对象
    searchParams: {
        beginLandingDate: string,
        beginLastInspectionDate: string,
        beginNextInspectionDate: string,
        endLandingDate: string,
        endLastInspectionDate: string,
        endNextInspectionDate: string,
        cylinderBarcode: string,
        manufacturingUnit: string,
        ownNumber: string,
        timeType: number,
        startTime: string,
        endTime: string,
        pageNumber: number,
        pageSize: number,
    };//查询参数
    theads: Array<string>;//表头字段
    GasCylinderList: Array<{
        id: number,
        ownNumber: string,
        cylinderBarcode: string,
        propertyRights: string,
        propertyUnit: string,
        manufacturingUnit: string,
        landingDate: number,
        useTheRegistrationCode: string,
        serialNumber: string,
        yearOfManufacture: number,
        fillingMedia: string,
        cylinderModel: string,
        equipmentVariety: string,
        lastInspectionDate: number,
        nextInspectionDate: number,
        cylinderStatus: string,
        inspectionNumber: string,
        originalWeight: string,
        volume: number,
        designWallThickness: number,
        pressureTestPressure: number,
        nominalOperatingPressure: number,
        checked?: Boolean
    }>;//用户列表

   
    constructor(
        private GasCylinderService : GasCylinderService ,) { };

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
        for (let index = 0; index < this.GasCylinderList.length; index++) {
            this.GasCylinderList[index].checked = checkedAll ? true : false;
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
    };
    // }
    getList() {
       
        let params = {
            beginLandingDate: this.searchParams.beginLandingDate,
            beginLastInspectionDate: this.searchParams.beginLastInspectionDate,
            beginNextInspectionDate: this.searchParams.beginNextInspectionDate,
            endLandingDate: this.searchParams.endLandingDate,
            endLastInspectionDate: this.searchParams.endLastInspectionDate,
            endNextInspectionDate: this.searchParams.endNextInspectionDate,
            cylinderBarcode: this.searchParams.cylinderBarcode,
            manufacturingUnit: this.searchParams.manufacturingUnit,
            ownNumber:this.searchParams.ownNumber,
            pageSize: this.searchParams.pageSize,
            pageNumber: this.searchParams.pageNumber,
        };

        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.GasCylinderService.getGasCylinderList(params).then(data => {
            if (data.status == 0) {
                this.GasCylinderList = data.data.list;
                this.totalItems = data.data.total;
        
            }else {
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
        });
    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.GasCylinderList.length; i++) {
            if (this.GasCylinderList[i].checked) {
                return this.GasCylinderList[i];
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
            beginLandingDate: '',
            beginLastInspectionDate: '',
            beginNextInspectionDate: '',
            endLandingDate: '',
            endLastInspectionDate: '',
            endNextInspectionDate: '',
            cylinderBarcode: '',
            manufacturingUnit: '',
            ownNumber: '',
            timeType: 0,
            startTime: '',
            endTime: '',
            pageNumber: 1,
            pageSize: 10,
        }
    }
   
    ngOnInit(): void {
        this.totalItems = 0;
        // this.currentPage = 1;
        // this.pageSize = 20;


        this.operand = {};

        this.theads = [
            '自有编号',
            '气瓶条码',
            '产权性质',
            '产权单位',
            '制造单位',
            '进站日期',
            '使用登记代码',
            '出厂编号',
            '制造年月',
            '充装介质',
            '气瓶型号',
            '设备品种',
            '末次检查年月',
            '下次检查年月',
            '气瓶状态',
            '检验编号',
            '原始重量',
            '容积',
            '设计壁厚',
            '水压试验压力',
            '公称工作压力',
        ];
        this.initSearchParams();

        this.getList();
    }
}
