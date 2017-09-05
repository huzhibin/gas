
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
        
        pageNumber: number,
        pageSize: number,
    };//查询参数
    theads: Array<string>;//表头字段
    StoreCylinderList: Array<{
        id: number,
        name: string,
        code: string,
        administrativeRegion: string,
        parentCompany: string,
        address: string,
        serialNumber: string,
        
        checked?: Boolean
    }>;//用户列表
addForm:{
    name: string,
    code: string,
    administrativeRegion: string,
    parentCompany: string,
    address: string,
    serialNumber: string,
    
}

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
    add(valid, modal) {
        if (valid) {
          this.StoreCylinderService.AddStore(this.addForm).then(data => {
            console.dir(data);
            this.alerts.push({
              type: 'success',
              msg: '添加成功',
              timeout: 1000
            });
            this.getList();
            modal.hide();
          });
        } else {
          this.alerts.push({
            type: 'danger',
            msg: '表单填写不正确',
            timeout: 1000
          });
        }
      }

    refresh() {
        this.getList();
    }
    search() {
        this.getList();
    };

    // trim(string) {
    //     return string.replace(/\s+/g, "");
    // }
    // TypeDate(date) {
    //     if (!date) {
    //         return null;
    //     }
    //     else {
    //         date = new Date(date);
    //         var y = date.getFullYear();
    //         var m = date.getMonth() + 1;
    //         var s = date.getDate();
    //         return y + '-' + (m < 10 ? '0' + m : m) + '-' + (s < 10 ? ('0' + s) : s);
    //     }

    // }
    getList() {

        let params = {
            pageNumber:this.searchParams.pageNumber,
            pageSize: this.searchParams.pageSize,
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.StoreCylinderService.getStoreCylinderList(params).then(data => {
            if (data.status == 0) {
                this.StoreCylinderList = data.data.list;
                this.totalItems = data.data.total;
             
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
            
            pageNumber: 1,
            pageSize: 10,
        }
    }
    initAddForm(){
        this.addForm={
            name: '',
            code: '',
            administrativeRegion: '',
            parentCompany: '',
            address: '',
            serialNumber: '',
            
        }
    }

    ngOnInit(): void {
        this.totalItems = 0;
        // this.currentPage = 1;
        // this.pageSize = 10;


        this.operand = {};

        this.theads = [
            '名称',
            '基本编码',
            '行政区域编号',
            '归属公司编号',
            '地址',
            '唯一编号',
            // '车号',
            // '操作工',
            // '制造单位',
            // '产权单位',
            // '出厂编号',
            // '使用登记代码',
            // '充装介质',
            // '末次检验年月',
            // '下次检验年月',


        ];
        this.initSearchParams();
        this.initAddForm();
        this.getList();
    }
}
