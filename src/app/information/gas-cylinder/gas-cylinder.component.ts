
import { Component, OnInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { GasTankList } from '../data/gas-tank';

// import { GasTankService} from './gas-tank.service'

@Component({
    templateUrl: 'gas-cylinder.component.html',
    styleUrls: [],
    providers: []
})
export class GasCylinderComponent implements OnInit {
    totalItems: number;//总记录数
    currentPage: number;//当前页号
    pageSize: number;//分页大小
    // @Input() bsValue;
    // public bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
    // departList: any;//部门列表

    operand: any;//操作对象
    searchParams: {
        chipNum: string,
        cylinderNum : string,
    } = {
        chipNum: '',
        cylinderNum: '',
    };//查询参数
    theads: Array<string>;//表头字段
    gasTankList: Array<{
        id: number,
        chipNum: string,
        cylinderNum: string,
        createTime: string,
        arrivalTime: string,
        scrapTime: string,
        gasType: string,
        infTime: string,
        orderNum: string,
        checked?: Boolean
    }>;//用户列表

    addForm: {
        chipNum: string,
        cylinderNum: string,
        createTime: string,
        arrivalTime: string,
        scrapTime: string,
        gasType: string,
        infTime: string,
        orderNum: string,
    };//添加用户表单
    editForm: {
        id: number,
        chipNum: string,
        cylinderNum: string,
        createTime: string,
        arrivalTime: string,
        scrapTime: string,
        gasType: string,
        infTime: string,
        orderNum: string,
    };//编辑用户表单
    deleteForm: {
        id: number,
        chipNum: string,
    }
    // constructor(
    //     private GasTankService: GasTankService,) { };

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
        for (let index = 0; index < this.gasTankList.length; index++) {
            this.gasTankList[index].checked = checkedAll ? true : false;
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
            let gasTank = {
                id: Math.random(),
                chipNum: this.addForm.chipNum,
                cylinderNum: this.addForm.cylinderNum,
                createTime: this.addForm.createTime,
                arrivalTime: this.addForm.arrivalTime,
                scrapTime: this.addForm.scrapTime,
                gasType: this.addForm.gasType,
                infTime:this.addForm.infTime,
                orderNum: this.addForm.orderNum,
            }
            GasTankList.push(gasTank);
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
            this.alerts.push({
                type: 'success',
                msg: '编辑成功',
                timeout: 1000
            });
            for (let index = 0; index < GasTankList.length; index++) {
                if (GasTankList[index].id == this.editForm.id) {
                    GasTankList[index].chipNum = this.editForm.chipNum;
                    GasTankList[index].cylinderNum = this.editForm.cylinderNum;
                    GasTankList[index].createTime= this.editForm.createTime;
                    GasTankList[index].arrivalTime= this.editForm.arrivalTime;
                    GasTankList[index].scrapTime = this.editForm.scrapTime;
                    GasTankList[index].gasType = this.editForm.gasType;
                    GasTankList[index].infTime = this.editForm.infTime;
                    GasTankList[index].orderNum = this.editForm.orderNum;
                }
            }
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
    delete(modal) {
        this.alerts.push({
            type: 'success',
            msg: '删除成功',
            timeout: 1000
        });
        for (let index = 0; index < GasTankList.length; index++) {
            if (GasTankList[index].id == this.deleteForm.id) {
                GasTankList.splice(index, 1);
            }
        }
        modal.hide();
        this.getList();
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
            chipNum: this.searchParams.chipNum,
            cylinderNum: this.searchParams.cylinderNum,
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        // this.GasTankService.getGasTankList(params).then(data => {
        //   this.gasTankList = data.data.list;
        //   this.totalItems = data.data.totalItems
        // });

        this.gasTankList = GasTankList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage);
        this.totalItems = GasTankList.length;
    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.gasTankList.length; i++) {
            if (this.gasTankList[i].checked) {
                return this.gasTankList[i];
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

    initAddForm() {
        this.addForm = {
            chipNum: '',
            cylinderNum: '',
            createTime: '',
            arrivalTime: '',
            scrapTime: '',
            gasType: '',
            infTime: '',
            orderNum: '',

        };
    }
    initEditForm(editObj?) {
        // editObj = Object.assign({}, editObj);
        this.editForm = {
            id: this.operand.id || '',
            chipNum: this.operand.chipNum || '',
            cylinderNum: this.operand.cylinderNum || '',
            createTime: this.operand.createTime || '',
            arrivalTime: this.operand.arrivalTime|| '',
            scrapTime: this.operand.scrapTime || '',
            gasType: this.operand.gasType || '',
            infTime: this.operand.infTime || '',
            orderNum: this.operand.orderNum || '',
            
        };
    }
    initDeleteForm(deleteObj?) {
        // deleteObj = Object.assign({}, deleteObj);
        this.deleteForm = {
            id: this.operand.id || '',
            chipNum: this.operand.chipNum|| '',
        };
    }

    ngOnInit(): void {
        this.totalItems = 0;
        this.currentPage = 1;
        this.pageSize = 20;


        this.operand = {};

        this.theads = [
            '芯片编号',
            '钢瓶编号',
            '生产日期',
            '进站日期',
            '报废日期',
            '气瓶规格',
            '充气时间',
            '订单编号',
            
        ];

        this.initAddForm();
        this.initEditForm();
        this.initDeleteForm();

        this.getList();
    }
}
