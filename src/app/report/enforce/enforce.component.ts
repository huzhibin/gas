import { Component, OnInit } from '@angular/core';
import { EnforceService } from "./enforce.service";


@Component({
  templateUrl: 'enforce.component.html',
  providers: [EnforceService]
})
export class EnforceComponent implements OnInit {
  enforce: any = {} //执法状态图
  statusTitle = [];
  statusData: any = [];
  constructor(private enforceService: EnforceService) { }
  getHttpData() {
    this.enforceService.getEnforceStatus(null).then(data => {
      if (data.status === 0) {
        for (let i = 0; i < data.data.length; i++){
          let temp: any = {};
          temp.value = data.data[i]['COUNT(*)'];
          temp.name = data.data[i]['status'];
          this.statusTitle.push(temp.name);
          this.statusData.push(temp);
        }
        this.enforce.myChart.setOption(this.enforce.option); 
        this.enforce.myChart.hideLoading();
      } else {
        console.error("数据获取失败！", data);
      }
    });
  };
  ngOnInit() {
    let echarts = window['echarts'];
    this.enforce.option = {
      title: {
        text: '执法状态图',
        // subtext: '纯属虚构',
        left: 'left',
        top: 'bottom'
      },
      backgroundColor: "rgb(255,255,255)",
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}件"
      },
      toolbox: {
        orient: 'vertical',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.statusTitle,
      },
      calculable: true,
      series: [
        {
          name: '执法状态',
          type: 'funnel',
          width: '70%',
          height: '75%',
          left: '10%',
          top: '10%',
          sort: 'ascending',
          label: {
            normal: {
              position: 'left'
            }
          },
          data: this.statusData,
          // [
          //   { value: 10, name: '处理中' },
          //   { value: 50, name: '已处理' },
          //   { value: 20, name: '未处理' },
          //   { value: 80, name: '超期' }
          // ]
        }
      ]
    };
    this.enforce.dom = document.getElementById("enforce");
    this.enforce.myChart = echarts.init(this.enforce.dom);
    this.enforce.myChart.setOption(this.enforce.option); 
    this.enforce.myChart.showLoading();
    this.getHttpData();
  }
}
