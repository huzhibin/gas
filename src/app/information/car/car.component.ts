import { Component, OnInit,Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

// import { DeliverCarList } from '../data/deliver-car';
import {CarService} from './car.service';
@Component({
    templateUrl: 'car.component.html',
    styleUrls: ['car.component.scss'],
    providers: [CarService]
})
export class CarComponent implements OnInit {
    totalItems: number;//总记录数
  

    // departList: any;//部门列表

    operand: any;//操作对象
    searchParams: {
       
        pageNumber:number,
       pageSize:number,
    };//查询参数
    theads: Array<string>;//表头字段
   
    deliverCarList: Array<{
        id: number,
        // task_id:string,
        // timestamp:string,
        // latitud:string,
        // longitude:string,
        carLicensePlate:string,
        company:string,
        phoneResponsible:string,
        responsible:string,
        station:string,
        taskId:string,
        timestamp:string,
        checked?: Boolean
    }>;//用户列表

addForm:{
    task_id:string,
    timestamp:string,
    latitud: string,

}
   
    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }

    constructor(private CarService: CarService) {

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
        for (let index = 0; index < this.deliverCarList.length; index++) {
            this.deliverCarList[index].checked = checkedAll ? true : false;
        }
    }

    pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('number items per page: ' + event.itemsPerPage);
    }
    // import(modal) {
    //     this.alerts.push({
    //         type: 'success',
    //         msg: '导入成功',
    //         timeout: 1000
    //     });
    //     modal.hide();
    //     this.getList();
    // }
    
    // add( modal) {
    //     modal.hide();
    //     this.getList();
    // }


    // export(modal) {
    //     this.alerts.push({
    //         type: 'success',
    //         msg: '导出成功',
    //         timeout: 1000
    //     });
    //     modal.hide();
    //     this.getList();
    // }
   

    refresh() {
        this.getList();
    }
    
    search() {
      this.searchParams.pageNumber=1;
        this.getList();
    }

    getList() {
        let params = {
            
            // pageSize:this.searchParams.pageSize,
            // pageNumber: this.searchParams.pageNumber
        };
        console.log('查询后台--getList:' + JSON.stringify(params));
        this.CarService.getCarList(params).then(data => {
          this.deliverCarList = data.data;
          this.totalItems = data.data.total;
        });

        // this.deliverCarList = DeliverCarList.slice(params.pageSize * (params.pageNumber - 1), params.pageSize * params.pageNumber);
        // this.totalItems = DeliverCarList.length;
    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.deliverCarList.length; i++) {
            if (this.deliverCarList[i].checked) {
                return this.deliverCarList[i];
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

    intiSearchParams(){
        this.searchParams={
            
            pageNumber:1,
            pageSize:10,
        }
    }

    initAddForm(){
        this.addForm={
            task_id:'',
            timestamp:'',
            latitud:'',
        }
    }
    ngOnInit(): void {
        this.totalItems = 0;
        this.operand = {};
        this.theads = [
            '归属公司编号',
            '配送车辆牌照',
            '责任人电话',
            '责任人编号'	,
            '所属地区',
            'GPS定位',
            '任务编号',
            '时间戳',
            '图像',
        ];

        this.intiSearchParams();

        this.getList();
    }
}



