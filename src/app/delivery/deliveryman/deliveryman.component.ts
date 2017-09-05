import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
// import { DepartList } from "../data/depart";

// import { DeliverService } from './deliveryman.service';
import { DeliverList } from '../../information/data/deliver';

@Component({
    templateUrl: 'deliveryman.component.html',
    styleUrls: [],
    // providers: [DeliverService]
})
export class DeliverymanComponent implements OnInit {
    totalItems: number;//总记录数
  

    // departList: any;//部门列表

    operand: any;//操作对象
    searchParams: {
        id:number,
        pageNumber:number,
        pageSize:number,
    };//查询参数
    theads: Array<string>;//表头字段
    DeliverList: Array<{
        id: number,
        code:string,
        company: string,
        name: string,
        phone: string,
        address: string,
        station: string,
        photoAddress:string,
        place:string,
        identity:string,
        checked?: Boolean
    }>;//用户列表
    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }

    // constructor(private DeliverService: DeliverService) {

    // }

    changePage(event) {
        this.searchParams.pageSize = event.itemsPerPage;
        this.searchParams.pageNumber= event.page;
        this.getList();
    }

    changeSize(event) {
        this.searchParams.pageSize = event;
        this.searchParams.pageNumber = 1;
        this.getList();
    }

    selectAll(checkedAll) {
        for (let index = 0; index < this.DeliverList.length; index++) {
            this.DeliverList[index].checked = checkedAll ? true : false;
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
    
    export(modal) {
        this.alerts.push({
            type: 'success',
            msg: '导出成功',
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
    getList() {
        let params = {
           id:this.searchParams.id,
            pageSize: this.searchParams.pageSize,
            pageNumber: this.searchParams.pageNumber
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        // this.DeliverService.getDeliverList(params).then(data => {
        //   this.DeliverList = data.data.list;
        //   this.totalItems = data.data.total;
        // });
        this.DeliverList = DeliverList.slice(params.pageSize * (params.pageNumber - 1), params.pageSize * params.pageNumber);
        this.totalItems = DeliverList.length;


    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.DeliverList.length; i++) {
            if (this.DeliverList[i].checked) {
                return this.DeliverList[i];
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

    initSearchParams(){
        this.searchParams={
            id:null,
            pageNumber:1,
            pageSize:10,
        }
    }
   
    ngOnInit(): void {
        this.totalItems = 0;
        this.operand = {};

        this.theads = [
            '员工编号',
            '电话',
            '员工姓名',
            '归属公司',
            '归属地区',
            '归属站点编号	',
            '身份证',
            '住址',
            '照片	', 
           
        ];

        this.initSearchParams();
     

        this.getList();
    }
}


