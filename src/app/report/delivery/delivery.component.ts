import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './delivery.component.html',
})

export class DeliveryComponent implements OnInit {
  delivery: any = {} //员工状态图
  ngOnInit() {
    let echarts = window['echarts'];

    this.delivery.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      backgroundColor:"rgb(255,255,255)",
      legend: {
        data: ['气瓶回收', '气瓶出站'],
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
          data: [
            "海泓昕",
            "张小芳",
            "王小明",
            "赵青天",
            "孙师傅"
          ]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '气瓶回收',
          type: 'bar',
          data: [320, 332,100,200,90]
        },
        {
          name: '气瓶出站',
          type: 'bar',
          data: [30, 32,40,80,120]
        }
      ]
    };
    this.delivery.dom = document.getElementById("delivery");
    this.delivery.myChart = echarts.init(this.delivery.dom);
    this.delivery.myChart.setOption(this.delivery.option);
  }
}
