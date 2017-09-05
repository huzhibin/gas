import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-view',
  templateUrl: './show-view.component.html',
  styleUrls: ['./show-view.component.css']
})
export class ShowViewComponent implements OnInit {
  gas: any = {} //气瓶分布图
  user: any = {}//用户分布图
  company: any = {}//企业数量分布图
  worker: any = {}//从业人员分布图
  trend: any = {}//趋势分析图
  enforce: any = {}//执法状态图
  feedback: any = {}//投诉建议反馈图
  constructor() { }

  ngOnInit() {
    let echarts = window['echarts'];

    this.gas.option = {
      title: {
        text: '温州各区域钢瓶数量分布图',
        // subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
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
          name: '钢瓶数量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
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
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.gas.dom = document.getElementById("gas");
    this.gas.myChart = echarts.init(this.gas.dom);
    this.gas.myChart.setOption(this.gas.option);

    this.user.option = {
      title: {
        text: '温州各区域用户数量分布图',
        // subtext: '纯属虚构',
        x: 'center'
      },
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

    this.trend.option = {
      title: {
        text: '本周数量趋势图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['当日数量']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
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
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '当日数量',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
      ]
    };
    this.trend.dom = document.getElementById("trend");
    this.trend.myChart = echarts.init(this.trend.dom);
    this.trend.myChart.setOption(this.trend.option);

    this.enforce.option = {
      title: {
        text: '执法状态图',
        // subtext: '纯属虚构',
        left: 'left',
        top: 'bottom'
      },
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
        data: ['执法请求', '准备执法', '正在执法', '执法完成', '执法反馈']
      },
      calculable: true,
      series: [
        // {
        //   name: '漏斗图',
        //   type: 'funnel',
        //   width: '40%',
        //   height: '45%',
        //   left: '5%',
        //   top: '50%',
        //   data: [
        //     { value: 60, name: '访问' },
        //     { value: 30, name: '咨询' },
        //     { value: 10, name: '订单' },
        //     { value: 80, name: '点击' },
        //     { value: 100, name: '展现' }
        //   ]
        // },
        // {
        //   name: '金字塔',
        //   type: 'funnel',
        //   width: '40%',
        //   height: '45%',
        //   left: '5%',
        //   top: '5%',
        //   sort: 'ascending',
        //   data: [
        //     { value: 60, name: '访问' },
        //     { value: 30, name: '咨询' },
        //     { value: 10, name: '订单' },
        //     { value: 80, name: '点击' },
        //     { value: 100, name: '展现' }
        //   ]
        // },
        // {
        //   name: '漏斗图',
        //   type: 'funnel',
        //   width: '40%',
        //   height: '45%',
        //   left: '55%',
        //   top: '5%',
        //   label: {
        //     normal: {
        //       position: 'left'
        //     }
        //   },
        //   data: [
        //     { value: 60, name: '访问' },
        //     { value: 30, name: '咨询' },
        //     { value: 10, name: '订单' },
        //     { value: 80, name: '点击' },
        //     { value: 100, name: '展现' }
        //   ]
        // },
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
            { value: 10, name: '执法请求' },
            { value: 50, name: '准备执法' },
            { value: 20, name: '正在执法' },
            { value: 80, name: '执法完成' },
            { value: 100, name: '执法反馈' }
          ]
        }
      ]
    };
    this.enforce.dom = document.getElementById("enforce");
    this.enforce.myChart = echarts.init(this.enforce.dom);
    this.enforce.myChart.setOption(this.enforce.option);   
    
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
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4]
        },
        {
          name: '建议',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0]
        },
        {
          name: '反馈率',
          type: 'line',
          yAxisIndex: 1,
          data: [20, 22, 33, 45, 63, 100, 20, 24, 30, 65, 90]
        }
      ]
    };
    this.feedback.dom = document.getElementById("feedback");
    this.feedback.myChart = echarts.init(this.feedback.dom);
    this.feedback.myChart.setOption(this.feedback.option);   
  }
}
