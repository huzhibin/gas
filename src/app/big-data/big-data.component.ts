import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { BigDataService } from "./big-data.service";
@Component({
  selector: 'big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.css'],
  providers: [BigDataService]
})
export class BigDataComponent implements OnInit {
  curTime:any ;
  DateTime:any ;
  
  myChart: any;
  option: any;
  areaList = [
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
  ];
  geoCoordMap = {
    '鹿城区': [120.661851, 28.020502],
    '龙湾区': [120.818508, 27.939041],
    '瓯海区': [120.621477, 27.97321],
    '洞头区': [121.15202, 27.853144],
    '永嘉县': [120.697875, 28.159922],
    '平阳县': [120.572279, 27.668007],
    '文成县': [120.084401, 27.79932],
    '苍南县': [120.432872, 27.523336],
    '泰顺县': [119.723953, 27.562516],
    '瑞安市': [120.661759, 27.784332],
    '乐清市': [120.991934, 28.119178],
  };

  colorList = [
    'rgb(216,15,19)',
    'rgb(182,51,19)',
    'rgb(129,87,19)',
    'rgb(48,132,19)',
    'rgb(45,170,19)',
    'rgb(133,133,133)',
  ];

  alarmData: any = [
    { name: '鹿城区', value: 4 },
    { name: '龙湾区', value: 4 },
    { name: '瓯海区', value: 1 },
    { name: '洞头区', value: 2 },
    { name: '永嘉县', value: 3 },
    { name: '平阳县', value: 2 },
    { name: '文成县', value: 1 },
    { name: '苍南县', value: 2 },
    { name: '泰顺县', value: 4 },
    { name: '瑞安市', value: 2 },
    { name: '乐清市', value: 2 },
  ];

  document:any = document;
  //点击全屏
  fullScreen() {
    if (!this.isFullScreen) {//如果不是全屏就全屏显示
      var el:any = document.querySelector(".big-data");
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;//定义不同浏览器的全屏API
      if (typeof rfs != "undefined" && rfs) {//执行全屏
        rfs.call(el);
        this.isFullScreen = true;
      }
    } else {//如果是全屏显示，就取消全屏显示
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
        this.isFullScreen = false;
      } else if (this.document.msExitFullscreen) {
        this.document.msExitFullscreen();
        this.isFullScreen = false;
      } else if (this.document.mozCancelFullScreen) {
        this.document.mozCancelFullScreen();
        this.isFullScreen = false;
      } else if (this.document.oRequestFullscreen) {
        this.document.oCancelFullScreen();
        this.isFullScreen = false;
      } else if (this.document.webkitExitFullscreen) {
        this.document.webkitExitFullscreen();
        this.isFullScreen = false;
      }
    }
  }
  //监听全屏变化
  listenFullScreen() {
    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 122) {
        e.preventDefault();  //阻止F11默认动作
        this.fullScreen();
        this.changeDetector.markForCheck();
      }
    }.bind(this),false)
  }
  isFullScreen: boolean = false;

  convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = this.geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  };
  
  constructor(private bigDataService: BigDataService, private changeDetector: ChangeDetectorRef) { };

  areaClick(area) {
    switch (area) {
      case "鹿城区":
        this.option.geo.center = [120.661851, 28.020502];
        break;
      case "龙湾区":
        this.option.geo.center = [120.818508, 27.939041];
        break;
      case "瓯海区":
        this.option.geo.center = [120.621477, 27.97321];
        break;
      case "洞头区":
        this.option.geo.center = [121.15202, 27.853144];
        break;
      case "永嘉县":
        this.option.geo.center = [120.697875, 28.159922];
        break;
      case "平阳县":
        this.option.geo.center = [120.572279, 27.668007];
        break;
      case "文成县":
        this.option.geo.center = [120.084401, 27.79932];
        break;
      case "苍南县":
        this.option.geo.center = [120.432872, 27.523336];
        break;
      case "泰顺县":
        this.option.geo.center = [119.723953, 27.562516];
        break;
      case "瑞安市":
        this.option.geo.center = [120.661759, 27.784332];
        break;
      case "乐清市":
        this.option.geo.center = [120.991934, 28.119178];
        break;
      default:
        break;
    }
    if (area == "总预览") {
      this.option.geo.center = [120.702542, 27.804152];
      this.option.geo.zoom = 2;
      this.option.geo.scaleLimit.max = 2;
      this.option.geo.scaleLimit.min = 2;
    } else {
      this.option.geo.zoom = 8;
      this.option.geo.scaleLimit.max = 8;
      this.option.geo.scaleLimit.min = 8;
    }
    this.myChart.setOption(this.option);
  }

  getAlarmList(params?) {
    this.bigDataService.getAlarmList({}).then(getData => {
      if (getData.status == 0) {
        for (var key in getData.data) {
          var item: any = {};
          item.name = key.replace("温州市-", "");
          if (item.name == "温州市") { continue; };
          for (var i = 0; i <= 4; i++) {
            if (getData.data[key][i]) {
              item.value = i;
              break;
            }
          }
          //暂时使用死数据展示，
          // this.alarmData.push(item);
        }
        console.dir(this);
        this.myChart.setOption(this.option);
      } else {
        alert();
      }
      this.myChart.hideLoading();
      this.myChart.setOption(this.option);
    })
  }

  ngOnInit(): void {
    this.listenFullScreen();
    let echarts = window['echarts'];
    this.myChart = echarts.init(document.getElementById('main'));

    this.getAlarmList();
    let self = this;
    this.option = {
      title: {
        text: '',
        subtext: '',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      visualMap: {
        min: 0,
        max: 4,
        calculable: true,
        inRange: {
          color: ['#f00', '#660', '#0f0']
        },
        textStyle: {
          color: '#fff'
        },
        text: ['等级', '等级']
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        // data: ['pm2.5'],
        textStyle: {
          color: '#fff'
        },
      },
      backgroundColor: "rgba(255,255,255,0)",
      geo: {
        type: "map",
        map: 'china',
        show: true,
        center: [120.702542, 27.804152],
        boundingCoords: [
          // 定位左上角经纬度
          [120.251808, 28.389237],
          // 定位右下角经纬度
          [120.909511, 25.502892]
        ],
        silent: true,
        zoom: 2,
        scaleLimit: {
          min: 2,
          max: 2,
        },
        // layoutCenter: ['50%', '50%'],
        // layoutSize: 600,
        roam: true,
        itemStyle: {
          normal: {
            areaColor: 'rgba(255,255,255,.8)',
            borderColor: 'rgb(8,135,195)',
            borderWidth: 1,
          },
          emphasis: {
            areaColor: 'rgba(255,34,56,.7)'
          }
        },
        label: {
          emphasis: {
            show: false
          },
          normal: {
            show: false,
            textStyle: {
              color: 'rgba(255,0,255,1)'
            }
          }
        },
      },
      series: [
        {
          name: null,//pm2.5
          type: 'scatter',//scatter
          coordinateSystem: 'geo',
          data: self.convertData(self.alarmData),
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          symbolSize: [20, 20],
          symbol: "circle",
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        }
      ]
    };
    //数据加载之前显示loading图
    this.myChart.showLoading();

    // function draw() {


    // var $dom = $(".geoList>li>span");
    // for (var i = 0, l = $dom.length; i < l; i++) {
    //   var txt = $dom[i].innerText;
    //   $dom[i].nextSibling.style.color = getColor(txt);
    // }
    // function getColor(str) {
    //   for (var i = 0; i < data.length; i++) {
    //     if (data[i].name === str) {
    //       var value = data[i].value;
    //       return colorList[value];
    //     }
    //   }
    //   return colorList[0];
    // }
    // myChart.setOption(option);
    // }
  }
  ngAfterViewInit(): void {
    setInterval(() => {
      this.curTime= new Date().toLocaleTimeString();
      this.DateTime=new Date().toLocaleDateString();
           }, 1000);
  }
}
