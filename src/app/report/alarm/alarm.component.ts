import { Component, OnInit } from '@angular/core';

import { BigDataService } from "../../big-data/big-data.service";

@Component({
  selector: 'alarm',
  templateUrl: './alarm.component.html',
  // styleUrls: ['./alarm.component.css'],
  providers: [BigDataService]
})

export class AlarmComponent implements OnInit {
  myChart: any;
  option: any = null;
  xAxisData: any = []; //x轴  列表项
  quantum: any = [
    {
      name: '重大风险',
      type: 'bar',
      stack: '风险等级',
      data: []
    },
    {
      name: '较大风险',
      type: 'bar',
      stack: '风险等级',
      data: []
    },
    {
      name: '一般风险',
      type: 'bar',
      stack: '风险等级',
      data: []
    },
    {
      name: '较小风险',
      type: 'bar',
      stack: '风险等级',
      data: []
    },
    {
      name: '微小风险',
      type: 'bar',
      stack: '风险等级',
      data: []
    },
  ];//要展示的数据信息
  constructor(private bigDataService: BigDataService) { }

  getAlarmList(params?) {
    this.bigDataService.getAlarmList({}).then(getData => {
      console.log(getData);
      if (getData.status == 0) {
        //得到xAxisData
        for (var key in getData.data) {
          var name = key.replace("温州市-", "");
          if (name !== "温州市") {
            this.xAxisData.push(name);
          }
        }
        // 得到quantum要展示的数据
        for (var i = 0; i < 5; i++) {
          for (var key in getData.data) {
            if (key == "温州市") continue;
            var item = getData.data[key];
            if (item[i] === undefined) {
              this.quantum[i].data.push(0)
            } else {
              this.quantum[i].data.push(item[i].length)
            }
          }
        }
        console.dir(this);
        this.myChart.setOption(this.option);
        this.myChart.hideLoading();
      } else {
        alert("数据获取失败！");
      }
    })
  }

  ngOnInit(): void {

    let echarts = window['echarts'];
    this.myChart = echarts.init(document.getElementById('main'));

    this.getAlarmList();
    let self = this;
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      backgroundColor:"rgb(255,255,255)",
      legend: {
        data: ['重大风险', '较大风险', '一般风险', '较小风险', '微小风险'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: this.quantum,
    };
    //数据加载之前显示loading图
    this.myChart.showLoading();
  }
}
