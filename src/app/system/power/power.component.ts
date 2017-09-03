import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PowerService } from "./power.service";
import { ResourceService } from "../resource/resource.service";
@Component({
  templateUrl: 'power.component.html',
})
export class PowerComponent implements OnInit {
  roleNumber: string;

  resourceList: Array<{
    resourceNumber: string,
    resourceName: string,
    parentNum: string,
    parentName: string,
    sort: string,
    url: string,
    createTime: string,
    resouceType: string,
    remark: string,
    checked?: Boolean
  }>;//获取的数据列表
  alerts: any = [
  ];

  constructor(
    private powerService: PowerService,
    private resourceService: ResourceService
  ) { }

  alertShift() {
    this.alerts.shift();
  }
  //获取选中的权限
  getPowerLsit() {
    let temp = new Array();
    for (var index = 0; index < this.resourceList.length; index++) {
      if (this.resourceList[index].checked) {
        temp.push(this.resourceList[index].resourceNumber);
      }
    }
    return temp;
  }
  //获取资源列表
  getList() {
    this.resourceService.getResourceList({
      pageNumber: 1,
      pageSize: 9999
    }).then(data => {
      if (data.status == 0) {
        this.resourceList = data.data.list;
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }

  //分配权限
  setPrivileges() {
    let powerList = this.getPowerLsit();
    if (powerList.length <= 0) {
      this.alerts.push({
        type: 'danger',
        msg: '请选择要分配的权限',
        timeout: 1000
      });
      return;
    }
    this.powerService.setPrivileges({
      roleNumber: this.roleNumber,
      powerList: powerList
      // TODO:powerList为空会报500错误
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '保存成功',
          timeout: 1000
        });
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    });
  }
  ngOnInit(): void {
    this.roleNumber = '1';

    this.getList();
  }
}
