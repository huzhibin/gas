import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';


@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
  theads: Array<String>;
  userList: Array<any>;
  // public userFormModel;
  public userModalModel;
  public totalItems: number = 229;
  public currentPage: number = 4;
  public smallnumPages: number = 0;
  public maxSize: number = 5;
  roleList;
  departList;
  userFormModel = {
    username: 'hechen',
    badge: '00001',
    name: '贺臣',
    email: '2850354580@qq.com',
    mobilePhone: '4006918851',
    tel: '4006918851',
    createTime: '2017-05-07',
    loginCount: '0',
    department: '',
    role: '总经理',
    remark: '速度'
  };
  onchange(e){
    console.dir(e.target.value)
  }
  department="研发部";
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  changePage(event){  
  }

  changeSize(event){
  }

  selectAll(checkedAll) {
    for (let index = 0; index < this.userList.length; index++) {
      this.userList[index].checked = checkedAll ? true : false;
    }
  }
  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  ngOnInit(): void {
    this.roleList = [
      '员工',
      '项目经理',
      '总经理',
      '董事长',
      '人事经理',
    ];
    this.departList = [
      '研发部',
      '投资部',
      '销售部'
    ]
    this.userFormModel = {
      username: 'hechen',
      badge: '00001',
      name: '贺臣',
      email: '2850354580@qq.com',
      mobilePhone: '4006918851',
      tel: '4006918851',
      createTime: '2017-05-07',
      loginCount: '0',
      department: '',
      role: '总经理',
      remark: '是'
    };
    this.userModalModel = {
      title: "新增用户"
    };
    this.theads = [
      '用户名',
      '工号',
      '真名',
      '邮箱',
      '手机',
      '固定电话',
      '创建时间',
      '登录次数',
      '部门',
      '角色',
      '备注',
      '操作'
    ];
    this.userList = [
      {
        username: 'hechen',
        badge: '00001',
        name: '贺臣',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: '',
        role: '总经理',
        remark: ''
      },
      {
        username: 'hechen',
        badge: '00001',
        name: '贺臣',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: '',
        role: '总经理',
        remark: ''
      },
      {
        username: 'hechen',
        badge: '00001',
        name: '贺臣',
        email: '2850354580@qq.com',
        mobilePhone: '4006918851',
        tel: '4006918851',
        createTime: '2017-05-07',
        loginCount: '0',
        department: '',
        role: '总经理',
        remark: ''
      },

    ];
  }
}
