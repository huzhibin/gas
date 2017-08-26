import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
  gasList: Array<{
    position: Array<number>,
    prodDate: string,
    code: string
  }>;
  carList: Array<{
    position: Array<number>,
    prodDate: string,
    code: string,
    driver: string
  }>;
  gasVisible: boolean = true;
  carVisible: boolean = true;

  map: any;
  gasMarkers: any = new Array();
  carMarkers: any = new Array();
  gasCluster: any;//气瓶点聚合
  carCluster: any;//车辆点聚合
  infoWindow: any;//消息窗体
  line: any;//路径线

  gasToggle() {
    if (!this.gasVisible) {
      this.gasCluster.setMap(null);
    } else {
      this.gasCluster.setMap(this.map);
    }
  }
  carToggle() {
    if (!this.carVisible) {
      this.carCluster.setMap(null);
    } else {
      this.carCluster.setMap(this.map);
    }
  }

  setLine(path: any) {
    let carPath = [];
    for (let index = 0; index < 10; index++) {
      carPath.push([120.6 + Math.random() / 10, 27.9 + Math.random() / 10]);
    }
    this.line.setOptions({
      map: this.map,
      path: path || carPath,
      lineJoin: 'round', //折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
      // showDir: true,  //是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用
      // strokeWeight: 10,  //线条宽度，单位：像素
    })
    console.dir(this.line.getPath());
  }
  gasMarkerClick = (e) => {
    this.infoWindow.setContent(e.target.getExtData());
    this.infoWindow.open(this.map, e.target.getPosition());
  }
  carMarkerClick = (e) => {
    console.dir(e);
    this.infoWindow.setContent(e.target.getExtData());
    this.infoWindow.open(this.map, e.target.getPosition());
    if (e.target){
      this.setLine(null);
    }
  }

  ngOnInit() {
    let AMap = window['AMap'];
    let self = this;
    let center = new AMap.LngLat(120.684353, 27.990083);//温州市
    var defaultLayer = new AMap.TileLayer();
    var traffic = new AMap.TileLayer.Traffic();
    var satellite = new AMap.TileLayer.Satellite();
    let markerIconOffset = new AMap.Pixel(-16, -16);

    this.carList = new Array();
    this.gasList = new Array();
    this.infoWindow = new AMap.InfoWindow();
    this.line = new AMap.Polyline();
    this.map = new AMap.Map('container', {
      zoom: 10,
      center: center,  //温州市
    });

    //产生模拟数据
    for (let index = 0; index < 100; index++) {
      this.carList.push(
        {
          position: [120 + Math.random(), 27 + Math.random()],
          driver: '配送员',
          prodDate: '2017-8-26',
          code: '1223345'
        });

    }
    for (let index = 0; index < 100; index++) {
      this.gasList.push(
        {
          position: [120 + Math.random(), 27 + Math.random()],
          prodDate: '2017-8-26',
          code: '1223345'
        });
    }

    //初始化标记并绑定事件
    for (let index = 0; index < this.gasList.length; index++) {
      this.gasMarkers.push(
        new AMap.Marker({
          map: this.map,
          position: this.gasList[index].position,
          icon: "/assets/img/gas.png",
          offset: markerIconOffset,
          autoRotation: true,
          // animation: 'AMAP_ANIMATION_DROP',
          extData: `${this.gasList[index].code}<br/>
                  ${this.gasList[index].prodDate}`
        }));
      this.gasMarkers[index].on('click', this.gasMarkerClick);
    }
    for (let index = 0; index < this.carList.length; index++) {
      this.carMarkers.push(
        new AMap.Marker({
          map: this.map,
          position: this.carList[index].position,
          icon: "/assets/img/car.png",
          offset: markerIconOffset,
          autoRotation: true,
          // animation: 'AMAP_ANIMATION_BOUNCE',
          extData: `${this.carList[index].driver}<br/>
                    ${this.carList[index].prodDate}`
        }));
      this.carMarkers[index].on('click', this.carMarkerClick);
    }

    this.map.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType', 'AMap.OverView', 'AMap.MarkerClusterer'],
      function () {
        /**
         * 工具条
         */
        let toolBar = new AMap.ToolBar({
          offset: new AMap.Pixel(10, 10),
          position: 'LT', // LT:左上角;RT:右上角;LB:左下角;RB:右下角;
          ruler: true,  //标尺键盘是否可见，默认为true
          noIpLocate: false,  //定位失败后，是否开启IP定位，默认为false
          locate: true,  //是否显示定位按钮，默认为false
          liteStyle: false,  //是否使用精简模式，默认为false
          direction: false, //方向键盘是否可见，默认为true
          autoPosition: false,  //是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效，默认为false
          // locationMarker: locationMarker, //自定义定位图标，值为Marker对象
        });
        self.map.addControl(toolBar);

        /**
         * 比例尺
         */
        let scale = new AMap.Scale({
          offset: new AMap.Pixel(10, 20),
          position: 'LB'
        });
        self.map.addControl(scale);

        /**
         * 图层类型
         */
        let mapType = new AMap.MapType({
          defaultType: 0,
          showTraffic: false,
          showRoad: true
        });
        // mapType.hide();
        self.map.addControl(mapType);

        /**
         * 鹰眼；预览窗口
         */
        let overView = new AMap.OverView({
          isOpen: false,
          visible: true
        });
        self.map.addControl(overView);

        /**
        * 气瓶点聚合
        */
        self.gasCluster = new AMap.MarkerClusterer(self.map, self.gasMarkers, {
          gridSize: 60, //聚合计算时网格的像素大小，默认60
          minClusterSize: 2, //聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合
          maxZoom: 18,  //最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合
          averageCenter: false,//聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
          zoomOnClick: true, //点击聚合点时，是否散开，默认值为：true
          styles: [{
            url: "/assets/img/gas-clusterer-32.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          }, {
            url: "/assets/img/gas-clusterer-48.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          }, {
            url: "/assets/img/gas-clusterer-64.png",
            size: new AMap.Size(64, 64),
            offset: new AMap.Pixel(-32, -32)
          }]
        });
        /**
         * 车辆点聚合
         */
        self.carCluster = new AMap.MarkerClusterer(self.map, self.carMarkers, {
          gridSize: 60, //聚合计算时网格的像素大小，默认60
          minClusterSize: 2, //聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合
          maxZoom: 18,  //最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合
          averageCenter: false,//聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
          zoomOnClick: true, //点击聚合点时，是否散开，默认值为：true
          styles: [{
            url: "/assets/img/car-clusterer-32.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          }, {
            url: "/assets/img/car-clusterer-48.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          }, {
            url: "/assets/img/car-clusterer-64.png",
            size: new AMap.Size(64, 64),
            offset: new AMap.Pixel(-32, -32)
          }]
        });
      }
    );

    // map.setFitView();
  }


}
