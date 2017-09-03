import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlowProcessingService } from "./flow-processing.service";
@Component({
  templateUrl: 'flow-processing.component.html',
  styleUrls: ['flow-processing.component.css'],
  providers: [FlowProcessingService]
})
export class FlowProcessingComponent implements OnInit {

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
    private flowProcessingService: FlowProcessingService
  ) { }

  startProcess() {
    this.flowProcessingService.startProcess({
      details: this.start.details
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
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
    this.flowProcessingService.getStartProcessList({
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
    this.flowProcessingService.submitPlan({
      taskid: this.plan.taskid,
      plan: this.plan.plan
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
  getPlanList() {
    this.flowProcessingService.getPlanList({
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
    this.flowProcessingService.submitVerifyResult({
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
    this.flowProcessingService.getVerifyList({
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
    this.flowProcessingService.submitActionResult({
      taskid: this.action.taskid,
      result: this.action.result
    }).then(data => {
      if (data.status == 0) {
        this.alerts.push({
          type: 'success',
          msg: '提交成功',
          timeout: 1000
        });
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
  getActionList() {
    this.flowProcessingService.getActionList({
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
    this.flowProcessingService.submitFinishResult({
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
    this.flowProcessingService.getMyStartProcess({
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
    this.flowProcessingService.getMyParticipateProcess({
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
    this.flowProcessingService.getMyFinishProcess({
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
    this.flowProcessingService.getProcessStateDiagram({
      executionid: executionid
    }).then(data => {
      console.dir(data);
      this.history.imageSrc = data.text();
      // if (data.status == 0) {
      // } else {
      //   this.alerts.push({
      //     type: 'danger',
      //     msg: data.msg,
      //     timeout: 1000
      //   });
      // }
    })
  }
  getFinishProcessDetail(processInstanceid) {
    this.flowProcessingService.getFinishProcessDetail({
      processInstanceid: processInstanceid
    }).then(data => {
      if (data.status == 0) {

      } else {
        this.alerts.push({
          type: 'danger',
          msg: data.msg,
          timeout: 1000
        });
      }
    })
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
