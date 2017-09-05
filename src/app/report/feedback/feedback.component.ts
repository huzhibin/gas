import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'feedback.component.html',
  // styleUrls: ['data-screen.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback: any = {} //投诉建议反馈图
  ngOnInit() {
    let echarts = window['echarts'];

    this.feedback.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      backgroundColor: "rgb(255,255,255)",
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['投诉', '建议', '反馈率']
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '鹿城区',
            '龙湾区',
            '瓯海区',
            '洞头区',
            '永嘉县',
            '平阳县',
            '文成县',
            '苍南县',
            '泰顺县',
            '瑞安市',
            '乐清市'
          ],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '事件数量',
          min: 0,
          max: 200,
          interval: 50,
          axisLabel: {
            formatter: '{value} 件'
          }
        },
        {
          type: 'value',
          name: '反馈率',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: '投诉',
          type: 'bar',
          data: [20, 49, 70, 23, 62, 76, 135, 162, 26, 150, 64]
        },
        {
          name: '建议',
          type: 'bar',
          data: [26, 59, 90, 24, 87, 70, 175, 120, 48, 110, 60]
        },
        {
          name: '反馈率',
          type: 'line',
          yAxisIndex: 1,
          data: [70, 82, 63, 95, 73, 95, 75, 84, 80, 89, 97]
        }
      ]
    };
    this.feedback.dom = document.getElementById("feedback");
    this.feedback.myChart = echarts.init(this.feedback.dom);
    this.feedback.myChart.setOption(this.feedback.option);  
  }
}
