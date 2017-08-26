import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
// import { DepartList } from "../data/depart";
// import { UserService } from './user-list.service';

import { DeliverList } from '../data/deliver'

@Component({
    templateUrl: 'deliveryman.component.html',
    styleUrls: [],
    providers: []
})
export class DeliverymanComponent implements OnInit {
    totalItems: number;//总记录数
    currentPage: number;//当前页号
    pageSize: number;//分页大小

    // departList: any;//部门列表

    operand: any;//操作对象
    searchParams: {
        deliverId: string,
        username: string,
        identity: number,
    } = {
        deliverId: null,
        username: '',
        identity: null,
    };//查询参数
    theads: Array<string>;//表头字段
    deliverList: Array<{
        id: number,
        deliverId: string,
        username: string,
        mobile: number,
        identity: string,
        comment: string,
        statement:string,
        createTime: string,
        checked?: Boolean
    }>;//用户列表

    addForm: {
        deliverId: string,
        username: string,
        mobile: number,
        identity: string,
        createTime: string,
        comment: string,
        statement: string,
    };//添加用户表单
    editForm: {
        id: number,
        deliverId: string,
        username: string,
        mobile: number,
        identity: string,
        comment: string,
        statement: string,
    };//编辑用户表单
    deleteForm: {
        id: number,
        username: string
    }

    stateForm: {
        id: number,
        username: string
    }
    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }

    // // constructor(private userService: UserService) {

    // // }

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
        for (let index = 0; index < this.deliverList.length; index++) {
            this.deliverList[index].checked = checkedAll ? true : false;
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
   
    // add(valid, modal) {
    //     if (valid) {
    //         this.alerts.push({
    //             type: 'success',
    //             msg: '添加成功',
    //             timeout: 1000
    //         });
    //         let deliver = {
    //             id: Math.random(),
    //             deliverId: this.addForm.deliverId,
    //             username: this.addForm.username,
    //             mobile: this.addForm.mobile,
    //             identity: this.addForm.identity,
    //             comment: this.addForm.comment,
    //             statement: this.addForm.statement,
    //             createTime: new Date() + '',

    //         }
    //         DeliverList.push(deliver);
    //         modal.hide();
    //         this.getList();
            
    //     } else {
    //         this.alerts.push({
    //             type: 'danger',
    //             msg: '表单填写不正确',
    //             timeout: 1000
    //         });
    //     }
    // }
    // edit(valid, modal) {
    //     if (valid) {
    //         this.alerts.push({
    //             type: 'success',
    //             msg: '编辑成功',
    //             timeout: 1000
    //         });
    //         for (let index = 0; index < DeliverList.length; index++) {
    //             if (DeliverList[index].id == this.editForm.id) {
    //                 DeliverList[index].username = this.editForm.username;
    //                 DeliverList[index].deliverId = this.editForm.deliverId;
    //                 DeliverList[index].mobile = this.editForm.mobile;
    //                 DeliverList[index].identity = this.editForm.identity;
    //                 DeliverList[index].comment = this.editForm.comment;
    //                 DeliverList[index].statement = this.editForm.statement;
    //             }
    //         }
    //         modal.hide();
    //         this.getList();
            
    //     } else {
    //         this.alerts.push({
    //             type: 'danger',
    //             msg: '表单填写不正确',
    //             timeout: 1000
    //         });
    //     }
    // }
    // delete(modal) {
    //     this.alerts.push({
    //         type: 'success',
    //         msg: '删除成功',
    //         timeout: 1000
    //     });
    //     for (let index = 0; index < DeliverList.length; index++) {
    //         if (DeliverList[index].id == this.deleteForm.id) {
    //             DeliverList.splice(index, 1);
    //         }
    //     }
    //     modal.hide();
    //     this.getList();
    // }
    // state(modal) {
    //     this.alerts.push({
    //         type: 'success',
    //         msg: '禁用成功',
    //         timeout: 1000
    //     });
    //     for (let index = 0; index < DeliverList.length; index++) {
    //         if (DeliverList[index].id == this.deleteForm.id) {
    //             DeliverList[index].statement='禁用' ;
    //         }
    //     }
    //     modal.hide();
    //     this.getList();
    // }

    refresh() {
        this.getList();
    }
    
    search() {
        this.getList();
    }
    getList(deliverId?: string, username?: string, identity?: string, pageSize?: number, currentPage?: number) {
        let params = {
            deliverId: this.searchParams.deliverId,
            username: this.searchParams.username,
            identity: this.searchParams.identity,
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };
        console.log('查询后台--getList:' + JSON.stringify(params));
        // this.userService.getCustomerList(params).then(data => {
        //   this.CustomerList = data.data.list;
        //   this.totalItems = data.data.totalItems
        // });

        this.deliverList = DeliverList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage);
        this.totalItems = DeliverList.length;
    }

    // //获取选中的第一个对象
    getChecked() {
        for (let i = 0; i < this.deliverList.length; i++) {
            if (this.deliverList[i].checked) {
                return this.deliverList[i];
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

    // initAddForm() {
    //     this.addForm = {
    //         deliverId: '',
    //         username: '',
    //         mobile: null,
    //         identity: '',
    //         comment: '',
    //         statement: '',
    //         createTime: '',
    //     };
    // }
    // initEditForm(editObj?) {
    //     // editObj = Object.assign({}, editObj);
    //     this.editForm = {
    //         id: this.operand.id || '',
    //         username: this.operand.username || '',
    //         deliverId: this.operand.deliverId || '',
    //         mobile: this.operand.mobile || '',
    //         identity: this.operand.identity || '',
    //         comment: this.operand.comment || '',
    //         statement: this.operand.statement|| '',
    //     };
    // }
    // initDeleteForm(deleteObj?) {
    //     // deleteObj = Object.assign({}, deleteObj);
    //     this.deleteForm = {
    //         id: this.operand.id || '',
    //         username: this.operand.username || '',
    //     };
    // }

    initStateForm(stateObj?) {
        // deleteObj = Object.assign({}, deleteObj);
        this.stateForm = {
            id: this.operand.id || '',
            username: this.operand.username || '',
        };
    }
    ngOnInit(): void {
        this.totalItems = 0;
        this.currentPage = 1;
        this.pageSize = 20;

       
        this.operand = {};

        this.theads = [
            '编号',
            '手机',
            '真实姓名',
            '身份证',
            '评价',
            '状态',
            '添加时间',
            
        ];

        
        this.initStateForm();

        this.getList();
    }
}


