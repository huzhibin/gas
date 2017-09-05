
import { Component, OnInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
// import { GasCylinderList } from '../data/gas-tank';

import { GasCylinderService } from './gas-cylinder.service';

@Component({
    templateUrl: 'gas-cylinder.component.html',
    styleUrls: ['gas-cylinder.component.css'],
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
    detail: Array<string>;
    GasCylinderList: Array<{
        id: number,

        ownNumber: string,
        cylinderBarcode: string,
        propertyRights: string,

        propertyUnit: string,
        manufacturingUnit: string,
        landingDate: string,

        useTheRegistrationCode: string,
        serialNumber: string,
        yearOfManufacture: string,

        fillingMedia: string,
        cylinderModel: string,
        equipmentVariety: string,

        lastInspectionDate: string,
        nextInspectionDate: string,
        cylinderStatus: string,

        inspectionNumber: string,
        originalWeight: string,
        volume: string,

        designWallThickness: string,
        pressureTestPressure: string,
        nominalOperatingPressure: string,

        checked?: Boolean
    }>;//用户列表

    detailList: {
        id: number,
        ownNumber: string,
        cylinderBarcode: string,
        propertyRights: string,

        propertyUnit: string,
        manufacturingUnit: string,
        landingDate: string,
        useTheRegistrationCode: string,

        serialNumber: string,
        yearOfManufacture: string,
        fillingMedia: string,

        cylinderModel: string,
        equipmentVariety: string,
        lastInspectionDate: string,

        nextInspectionDate: string,
        cylinderStatus: string,
        inspectionNumber: string,

        originalWeight: string,
        volume: string,
        designWallThickness: string,

        pressureTestPressure: string,
        nominalOperatingPressure: string,
       
    };//用户列表
    addForm:{
        ownNumber: string,
        cylinderBarcode: string,
        propertyRights: string,

        propertyUnit: string,
        manufacturingUnit: string,
        useTheRegistrationCode: string,
    }
    editForm:{
        id:string,
        ownNumber: string,
        cylinderBarcode: string,
        propertyRights: string,

        propertyUnit: string,
        manufacturingUnit: string,
        useTheRegistrationCode: string,
    }
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

    add(valid, modal) {
        if (valid) {
            this.alerts.push({
              type: 'success',
              msg: '添加成功',
              timeout: 1000
            });
            this.getList();
            modal.hide();
        
        }
      }
      edit(modal){
        this.alerts.push({
            type: 'success',
            msg: '编辑成功',
            timeout: 1000
          });
          modal.hide();
          this.getList();
          
      }
      delete(modal){
        this.alerts.push({
            type: 'success',
            msg: '删除成功',
            timeout: 1000
          });
          modal.hide();
          this.getList();
      }

      export(modal) {
        modal.hide();

                this.alerts.push({
                    type: 'danger',
                    msg: '导出失败',
                    timeout: 1000
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

    refresh() {
        this.getList();
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
   
    initDetailList(){
        this.detailList={
            id: this.operand.id || null,
            ownNumber: this.operand.ownNumber || '',
            cylinderBarcode: this.operand.cylinderBarcode || '',
            propertyRights:this.operand.propertyRights || '', 

            propertyUnit: this.operand.propertyUnit || '',
            manufacturingUnit:this.operand.manufacturingUnit || '' ,
            landingDate: this.operand.landingDate || '',

            useTheRegistrationCode: this.operand.useTheRegistrationCode || '',
            serialNumber: this.operand.serialNumber || '',
            yearOfManufacture: this.operand.yearOfManufacture || '',

            fillingMedia: this.operand.fillingMedia || '',
            cylinderModel: this.operand.cylinderModel || '',
            equipmentVariety: this.operand.equipmentVariety || '',

            lastInspectionDate: this.operand.lastInspectionDate || '',
            nextInspectionDate:this.operand.nextInspectionDate || '',
            cylinderStatus: this.operand.cylinderStatus || '',

            inspectionNumber:this.operand.inspectionNumber || '',
            originalWeight: this.operand.originalWeight || '',
            volume: this.operand.volume || '',

            designWallThickness: this.operand.designWallThickness || '',
            pressureTestPressure:this.operand.pressureTestPressure || '',
            nominalOperatingPressure: this.operand.nominalOperatingPressure || '',
        }
    }

    initAddForm(){
        this.addForm={
            ownNumber: '',
            cylinderBarcode:'',
            propertyRights: '',
    
            propertyUnit: '',
            manufacturingUnit: '',
            useTheRegistrationCode: '',
        }
    }
    initEditForm(){
        this.editForm={
            id: this.operand.id || '',
            ownNumber: this.operand.ownNumber || '',
            cylinderBarcode: this.operand.cylinderBarcode || '',
            propertyRights:this.operand.propertyRights || '', 

            propertyUnit: this.operand.propertyUnit || '',
            manufacturingUnit:this.operand.manufacturingUnit || '' ,

            useTheRegistrationCode: this.operand.useTheRegistrationCode || '',
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
            '所属行政区域',
            '唯一编码',
            '制造年月',
            '充装介质',
            '详细信息',
            // '气瓶型号',
            // '设备品种',
            // '末次检查年月',
            // '下次检查年月',
            // '气瓶状态',
            // '检验编号',
            // '原始重量',
            // '容积',
            // '设计壁厚',
            // '水压试验压力',
            // '公称工作压力',
        ];
        this.detail = [
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
        this.initAddForm();
        this.initEditForm();
        this.initDetailList();
        this.initEditForm();
        this.getList();
    }
}
