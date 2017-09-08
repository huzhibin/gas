import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'user.component.html',
  // styleUrls: ['data-screen.component.css']
})
export class UserComponent implements OnInit {
  user: any = {} //用户分布图
  ngOnInit() {
    let echarts = window['echarts'];

    this.user.option = {
      title: {
        text: '温州各区域用户数量分布图',
        // subtext: '纯属虚构',
        x: 'center'
      },
      backgroundColor: "rgb(255,255,255)",
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
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
        ]
      },
      series: [
        {
          name: '用户数量',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { name: '鹿城区', value: 400 },
            { name: '龙湾区', value: 421 },
            { name: '瓯海区', value: 12 },
            { name: '洞头区', value: 200 },
            { name: '永嘉县', value: 233 },
            { name: '平阳县', value: 562 },
            { name: '文成县', value: 251 },
            { name: '苍南县', value: 12 },
            { name: '泰顺县', value: 894 },
            { name: '瑞安市', value: 522 },
            { name: '乐清市', value: 632 },
          ],
        }
      ]
    };
    this.user.dom = document.getElementById("user");
    this.user.myChart = echarts.init(this.user.dom);
    this.user.myChart.setOption(this.user.option);
  }
}
