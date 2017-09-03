import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { CompanyService } from './company.service';
import 'rxjs/Rx' ;

@Component({
    templateUrl: 'company.component.html',
    styleUrls: ['company.component.scss'],
    providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
    totalItems: number;//总记录数
    operand: any;//操作对象
    // currentStep: any;
    
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

    // import(modal) {
    //     this.alerts.push({
    //         type: 'success',
    //         msg: '导入成功',
    //         timeout: 1000
    //     });
    //     modal.hide();
    //     this.getList();
    // }

    // stepChange(count) {
    //     if (this.currentStep === 1 && count === -1)
    //         return;
    //     if (this.currentStep === 3 && count === 1)
    //         return;
    //     this.currentStep += count;
    // }

    refresh() {
        this.getList();
    }
    search() {
        this.getList();
    }
   
    getList() {
        let params = {
           
        };
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.CompanyService.getCompanyList(params).then(data => {
            if (data.status == 0) {
                this.CompanyList = data.data.list;
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
            pageNumber:1,
            pageSize:10,
        }
    }
    

    ngOnInit(): void {
        this.totalItems = 0;
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
       
        this.initSearchParams();
        this.getList();
    }
}

