import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'enforce.component.html',
  // styleUrls: ['data-screen.component.css']
})
export class EnforceComponent implements OnInit {
  enforce: any = {} //执法状态图
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
        data: ['处理中', '已处理', '未处理', '超期']
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
          data: [
            { value: 10, name: '处理中' },
            { value: 50, name: '已处理' },
            { value: 20, name: '未处理' },
            { value: 80, name: '超期' }
          ]
        }
      ]
    };
    this.enforce.dom = document.getElementById("enforce");
    this.enforce.myChart = echarts.init(this.enforce.dom);
    this.enforce.myChart.setOption(this.enforce.option);   
  }
}
