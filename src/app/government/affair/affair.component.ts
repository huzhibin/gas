import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AffairService } from "./affair.service";
import { API } from "../../core/api";
@Component({
  templateUrl: 'affair.component.html',
  styleUrls: ['affair.component.css'],
  providers: [AffairService]
})
export class AffairComponent implements OnInit {

  start: {
    details: string,//发起流程详情
  };
  plan: {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    startList: any,//已发起列表
    plan: string,
    taskid: string
  };
  verify: {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    planList: any,//已提交列表
    taskid: string,
    checkok: string
  };
  action: {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    verifyList: any,//已审核列表
    taskid: string,
    result: string
  };
  finish: {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    actionList: any,//已实施列表
    taskid: string,
    chuliok: string
  };
  history: {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    myStartList: any,
    myParticipateList: any,
    myFinishList: any,
    selectStart: boolean,
    selectParticipate: boolean,
    selectFinish: boolean,
    imageSrc: any
  }

  alerts: any = [
  ];

  constructor(
    private affairService: AffairService
  ) { }

  startProcess() {
    this.affairService.startProcess({
      details: this.start.details
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
        this.getStartProcessList();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getStartProcessList() {
    console.dir(this.plan);
    this.affairService.getStartProcessList({
      pageNumber: this.plan.pageNumber,
      pageSize: this.plan.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.plan.startList = data.data.list;
        this.plan.totalItems = data.data.total;
        console.dir(data)
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  submitPlan() {
    this.affairService.submitPlan({
      taskid: this.plan.taskid,
      plan: this.plan.plan
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
        this.plan.taskid = '';
        this.getStartProcessList();
        this.getPlanList();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getPlanList() {
    this.affairService.getPlanList({
      pageNumber: this.verify.pageNumber,
      pageSize: this.verify.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.verify.planList = data.data.list;
        this.verify.totalItems = data.data.total;
        console.dir(data)
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  submitVerifyResult() {
    this.affairService.submitVerifyResult({
      taskid: this.verify.taskid,
      checkok: this.verify.checkok
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
        this.getPlanList();
        this.getVerifyList();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getVerifyList() {
    this.affairService.getVerifyList({
      pageNumber: this.action.pageNumber,
      pageSize: this.action.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.action.verifyList = data.data.list;
        this.action.totalItems = data.data.total;
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })

  }
  submitActionResult() {
    this.affairService.submitActionResult({
      taskid: this.action.taskid,
      result: this.action.result
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
        this.action.taskid = '';
        this.getVerifyList();
        this.getActionList();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getActionList() {
    this.affairService.getActionList({
      pageNumber: this.action.pageNumber,
      pageSize: this.action.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.finish.actionList = data.data.list;
        this.finish.totalItems = data.data.total;
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  submitFinishResult() {
    this.affairService.submitFinishResult({
      taskid: this.finish.taskid,
      chuliok: this.finish.chuliok
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
        this.getActionList();
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }

  getMyStartProcess() {
    this.affairService.getMyStartProcess({
      pageNumber: this.history.pageNumber,
      pageSize: this.history.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.history.myStartList = data.data.list;
        this.history.totalItems = data.data.total;
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getMyParticipateProcess() {
    this.affairService.getMyParticipateProcess({
      pageNumber: this.history.pageNumber,
      pageSize: this.history.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.history.myParticipateList = data.data.list;
        this.history.totalItems = data.data.total;
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getMyFinishProcess() {
    this.affairService.getMyFinishProcess({
      pageNumber: this.history.pageNumber,
      pageSize: this.history.pageSize
    }).then(data => {
      if (data.status == 0) {
        this.history.myFinishList = data.data.list;
        this.history.totalItems = data.data.total;
      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
  }
  getProcessStateDiagram(executionid) {
    this.history.imageSrc = API.URL + "activiti/traceprocess.do?executionid=" + executionid;
    // this.affairService.getProcessStateDiagram({
    //   executionid: executionid
    // }).then(data => {
    //   console.dir(data);
    //   this.history.imageSrc = data.text();
    //   // if (data.status == 0) {
    //   // } else {
    //   //   this.alerts.push({
    //   //     type: 'danger',
    //   //     msg: data.msg,
    //   //     timeout: 1000
    //   //   });
    //   // }
    // })
  }
  getFinishProcessDetail(processInstanceid) {
    console.dir(processInstanceid);
    this.history.imageSrc = API.URL + "activiti/processinfo.do?processInstanceid=" + processInstanceid;
    // this.affairService.getFinishProcessDetail({
    //   processInstanceid: processInstanceid
    // }).then(data => {
    //   if (data.status == 0) {

    //   } else {
    //     this.alerts.push({
    //       type: 'danger',
    //       msg: data.msg,
    //       timeout: 1000
    //     });
    //   }
    // })
  }


  alertShift() {
    this.alerts.shift();
  }

  ngOnInit(): void {
    this.start = {
      details: ''
    }
    this.plan = {
      totalItems: 0,
      pageNumber: 1,
      pageSize: 10,
      startList: [],
      taskid: '',
      plan: ''
    }
    this.verify = {
      totalItems: 0,
      pageNumber: 1,
      pageSize: 10,
      planList: [],
      taskid: '',
      checkok: ''
    }
    this.action = {
      totalItems: 0,
      pageNumber: 1,
      pageSize: 10,
      verifyList: [],
      taskid: '',
      result: ''
    }
    this.finish = {
      totalItems: 0,
      pageNumber: 1,
      pageSize: 10,
      actionList: [],
      taskid: '',
      chuliok: ''
    }
    this.history = {
      totalItems: 0,
      pageNumber: 1,
      pageSize: 10,
      myStartList: [],
      myParticipateList: [],
      myFinishList: [],
      selectStart: true,
      selectParticipate: false,
      selectFinish: false,
      imageSrc: ''
    }
    this.getStartProcessList();
    this.getPlanList();
    this.getVerifyList();
    this.getActionList();
  }
}
