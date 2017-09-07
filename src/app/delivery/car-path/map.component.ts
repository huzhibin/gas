import { Component, OnInit } from '@angular/core';

import { MapService } from "./map.service";
@Component({
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {
  AMap: any;
  gasList: Array<any>;//气瓶列表
  carList: Array<{
    id: string,
    longitude: number,//经度
    latitude: number,//纬度
    deliverCarCode: string,//配送车辆唯一编码
    carLicensePlate: string,//配送车辆牌照
    company: string,//归属公司编号
    station: string,//归属站点编号
    responsible: string,//责任人编号
    phoneResponsible: string//责任人电话
  }>;//车辆列表
  deliveryManList: Array<{
    id: number,
    locationId: number,
    name: string,
    company:string,
    station: string,
    phone: string,
    address: string,
    photoAddress: string,
    taskId:number,
    timestamp: string,
    latitude: number,
    longitude: number
  }>;//配送员
  gasVisible: boolean = true;//气瓶是否可见
  carVisible: boolean = true;//气瓶是否可见
  deliveryManVisible: boolean = true;//气瓶是否可见
  searchParams: {
    beginTime: any,
    endTime: any,
    carID?: string;
  }

  map: any;
  gasMarkers: any;//气瓶点标记
  carMarkers: any;//车辆点标记
  deliveryManMarkers: any;//配送员点标记
  gasCluster: any;//气瓶点聚合
  carCluster: any;//车辆点聚合
  deliveryManCluster: any;//配送员点聚合
  infoWindow: any;//消息窗体
  line: any;//路径线

  constructor(
    private mapService: MapService
  ) { }
  //气瓶显隐切换
  gasToggle() {
    if (!this.gasVisible) {
      this.gasCluster.setMap(null);
      this.infoWindow.close();
    } else {
      this.gasCluster.setMap(this.map);
    }
  }
  //车辆显隐切换
  carToggle() {
    if (!this.carVisible) {
      this.carCluster.setMap(null);
      this.setLine(null);
      this.infoWindow.close();
    } else {
      this.carCluster.setMap(this.map);
    }
  }
  //配送员显隐切换
  deliveryManToggle() {
    if (!this.deliveryManVisible) {
      this.deliveryManCluster.setMap(null);
      this.setLine(null);
      this.infoWindow.close();
    } else {
      this.deliveryManCluster.setMap(this.map);
    }
  }

  //设置路径
  setLine(path: Array<Array<number>>) {
    this.line.setOptions({
      map: this.map,
      path: path,
      lineJoin: 'round', //折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
      // showDir: true,  //是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用
      // strokeWeight: 10,  //线条宽度，单位：像素
    })
    console.dir(this.line.getPath());
  }
  gasMarkerClick = (e) => {
    let extData = e.target.getExtData();
    this.infoWindow.setContent(`
      气瓶id：12<br>
      气瓶编号：pn123234234<br>
      制造日期：2016-02-02<br>
      制造单位：温州市xx厂<br>
      状态：使用中<br>
      用户：xx
    `);
    this.infoWindow.open(this.map, e.target.getPosition());
  }
  carMarkerClick = (e) => {
    let extData = e.target.getExtData();
    this.infoWindow.setContent(`
      id：${extData.id}<br>
      配送车辆唯一编码:${extData.deliverCarCode}<br>
      配送车辆牌照:${extData.carLicensePlate}<br>
      归属公司编号:${extData.company}<br>
      归属站点编号:${extData.station}<br>
      责任人编号:${extData.responsible}<br>
      责任人电话:${extData.phoneResponsible}
      `);
    this.infoWindow.open(this.map, e.target.getPosition());
    this.getCarPath(extData.id);
    // if (e.target) {
    //   this.setLine(null, e.target.getPosition());
    // }
  }
  deliveryManMarkerClick = (e) => {
    let extData = e.target.getExtData();
    this.infoWindow.setContent(`
      id：${extData.id}<br>
      配送员姓名:${extData.name}<br>
      电话:${extData.phone}<br>
      归属公司编号:${extData.company}<br>
      归属站点编号:${extData.station}<br>
      任务编号:${extData.taskId}<br>
      地址:${extData.address}
      `);
    this.infoWindow.open(this.map, e.target.getPosition());
    this.getDeliveryManPath(extData.id);
    // if (e.target) {
    //   this.setLine(null, e.target.getPosition());
    // }
  }
  //设置车辆点标记
  setCarMarkers() {
    for (let index = 0; index < this.carList.length; index++) {
      this.carMarkers.push(
        new this.AMap.Marker({
          map: this.map,
          position: [this.carList[index].longitude, this.carList[index].latitude],
          icon: "assets/img/car.png",
          offset: new this.AMap.Pixel(-16, -16),
          autoRotation: true,
          // animation: 'AMAP_ANIMATION_BOUNCE',
          extData: this.carList[index]
        }));
      this.carMarkers[index].on('click', this.carMarkerClick);
    }
  }
  //设置配送员点标记
  setDeliveryManMarkers() {
    for (let index = 0; index < this.deliveryManList.length; index++) {
      this.deliveryManMarkers.push(
        new this.AMap.Marker({
          map: this.map,
          position: [this.deliveryManList[index].longitude, this.deliveryManList[index].latitude],
          icon: "assets/img/delivery-man.png",
          offset: new this.AMap.Pixel(-16, -16),
          autoRotation: true,
          // animation: 'AMAP_ANIMATION_BOUNCE',
          extData: this.deliveryManList[index]
        }));
      this.deliveryManMarkers[index].on('click', this.deliveryManMarkerClick);
    }
  }
  //设置气瓶点标记
  setGasMarkers() {
    for (let index = 0; index < this.gasList.length; index++) {
      this.gasMarkers.push(
        new this.AMap.Marker({
          map: this.map,
          position: this.gasList[index].position,
          icon: "assets/img/gas.png",
          offset: new this.AMap.Pixel(-16, -16),
          autoRotation: true,
          // animation: 'AMAP_ANIMATION_DROP',
          extData: this.gasList[index]
        }));
      this.gasMarkers[index].on('click', this.gasMarkerClick);
    }
  }
  //获取气瓶位置
  getGasPosition() {

    for (let index = 0; index < 50; index++) {
      this.gasList.push(
        {
          position: [120.4 + 0.4 * Math.random(), 27.8 + 0.4 * Math.random()]
        });
    }
    this.setGasMarkers();
    this.gasCluster.setMarkers(this.gasMarkers);

    // this.mapService.getGasPosition({
    //   // id: this.searchParams.carID || 1,
    //   // beginTime: this.searchParams.beginTime,
    //   // endTime: this.searchParams.endTime
    // }).then(data => {
    //   if (data.status == 0) {
    //     this.gasList = data.data;
    //     console.dir(this.gasList);
    //     this.setGasMarkers();
    //     this.gasCluster.setMarkers(this.gasMarkers);
    //   } else {

    //   }
    // })
  }
  //获取车辆位置
  getCarPosition() {
    this.mapService.getCarPosition({
      id: '',
      // beginTime: this.searchParams.beginTime,
      // endTime: this.searchParams.endTime
    }).then(data => {
      if (data.status == 0) {
        console.dir(data);
        this.carList = data.data;
        this.setCarMarkers();
        this.carCluster.setMarkers(this.carMarkers);
      } else {

      }
    })
  }
  //获取配送员位置
  getDeliveryManPosition() {
    this.mapService.getDeliveryManPosition({
      id: '',
      // beginTime: this.searchParams.beginTime,
      // endTime: this.searchParams.endTime
    }).then(data => {
      if (data.status == 0) {
        console.dir(data);
        this.deliveryManList = data.data;
        this.setDeliveryManMarkers();
        this.deliveryManCluster.setMarkers(this.deliveryManMarkers);
      } else {

      }
    })
  }

  //获取车辆路径
  getCarPath(id) {
    this.mapService.getCarPath({
      deliverCarId: id || '',
      beginTime: this.searchParams.beginTime,
      endTime: this.searchParams.endTime
    }).then(data => {
      if (data.status == 0) {
        let temp = new Array();
        for (let index = 0; index < data.data.length; index++) {
          temp.push([data.data[index].longitude, data.data[index].latitude]);
        }
        this.setLine(temp);
      } else {

      }
    })
  }
  //获取配送员路径
  getDeliveryManPath(id) {
    this.mapService.getDeliveryManPath({
      deliverId: id || '',
      beginTime: this.searchParams.beginTime,
      endTime: this.searchParams.endTime
    }).then(data => {
      if (data.status == 0) {
        let temp = new Array();
        for (let index = 0; index < data.data.length; index++) {
          temp.push([data.data[index].longitude, data.data[index].latitude]);
        }
        this.setLine(temp);
      } else {

      }
    })
  }

  // search(){

  // }

  formate(date: any, fmt: string) {
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    var year = date.getFullYear();
    var yearstr = year + '';
    yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  addHours = function (date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
  };
  addDays = function (date, days) {
    date.setDate(date.getDate() + days);
    return date;
  };
  ngOnInit() {
    this.AMap = window['AMap'];
    let self = this;
    let center = new this.AMap.LngLat(120.684353, 27.990083);//温州市
    // let defaultLayer = new this.AMap.TileLayer();
    // let traffic = new this.AMap.TileLayer.Traffic();
    // let satellite = new this.AMap.TileLayer.Satellite();

    this.map = new this.AMap.Map('container', {
      zoom: 8,
      center: center,  //温州市
    });
    this.gasList = new Array();
    this.carList = new Array();
    this.deliveryManList = new Array();
    this.gasMarkers = new Array();
    this.carMarkers = new Array();
    this.deliveryManMarkers = new Array();
    this.infoWindow = new this.AMap.InfoWindow();
    this.line = new this.AMap.Polyline();



    this.searchParams = {
      beginTime: this.formate(new Date('2000'), 'yyyy-MM-dd HH:mm:ss'),
      endTime: this.formate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      carID: ''
    }

    //加载行政区划插件
    // AMap.service('AMap.DistrictSearch', function () {
    //   let opts = {
    //     subdistrict: 1,   //返回下一级行政区
    //     extensions: 'all',  //返回行政区边界坐标组等具体信息
    //     level: 'city'  //查询行政级别为 市
    //   };
    //   //实例化DistrictSearch
    //   let district = new AMap.DistrictSearch(opts);
    //   //行政区查询
    //   district.search('温州市', function (status, result) {
    //     console.dir(result);
    //     let districtList = result.districtList[0].districtList;
    //     if (districtList) {
    //       for (let i = 0; i < districtList.length; i++) {
    //         district.setLevel("district");
    //         district.search(districtList[i].adcode, function (status, result) {
    //           console.dir(result);
    //           let bounds = result.districtList[0].boundaries;
    //           let districtList = result.districtList[0].districtList;
    //           let polygons = [];
    //           if (bounds) {
    //             for (let i = 0, l = bounds.length; i < l; i++) {
    //               //生成行政区划polygon
    //               let polygon = new AMap.Polygon({
    //                 map: self.map,
    //                 strokeWeight: 1,
    //                 path: bounds[i],
    //                 fillOpacity: 0.4,
    //                 fillColor: '#CCF3FF',
    //                 strokeColor: '#CC66CC'
    //               });
    //               polygons.push(polygon);
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
    // });



    // this.map.plugin(["AMap.CitySearch"], function () {
    //   let citysearch = new this.AMap.CitySearch();
    //   citysearch.getLocalCity();
    //   this.AMap.event.addListener(citysearch, "complete", function (result) {
    //     let citybounds;
    //     console.dir(result);
    //     if (result && result.city && result.bounds) {
    //         citybounds = result.bounds;
    //         this.map.setBounds(citybounds);
    //     }
    //   });
    // });

    this.map.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType', 'AMap.OverView', 'AMap.MarkerClusterer'],
      function () {
        /**
         * 工具条
         */
        let toolBar = new self.AMap.ToolBar({
          offset: new self.AMap.Pixel(10, 10),
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
        let scale = new self.AMap.Scale({
          offset: new self.AMap.Pixel(10, 20),
          position: 'LB'
        });
        self.map.addControl(scale);

        /**
         * 图层类型
         */
        let mapType = new self.AMap.MapType({
          defaultType: 0,
          showTraffic: false,
          showRoad: true
        });
        // mapType.hide();
        self.map.addControl(mapType);

        /**
         * 鹰眼；预览窗口
         */
        let overView = new self.AMap.OverView({
          isOpen: false,
          visible: true
        });
        self.map.addControl(overView);

        /**
        * 气瓶点聚合
        */
        self.gasCluster = new self.AMap.MarkerClusterer(self.map, self.gasMarkers, {
          gridSize: 60, //聚合计算时网格的像素大小，默认60
          minClusterSize: 10, //聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合
          maxZoom: 18,  //最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合
          averageCenter: false,//聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
          zoomOnClick: true, //点击聚合点时，是否散开，默认值为：true
          styles: [{
            url: "assets/img/gas-clusterer-32.png",
            size: new self.AMap.Size(32, 32),
            offset: new self.AMap.Pixel(-16, -16)
          }, {
            url: "assets/img/gas-clusterer-48.png",
            size: new self.AMap.Size(48, 48),
            offset: new self.AMap.Pixel(-24, -24)
          }, {
            url: "assets/img/gas-clusterer-64.png",
            size: new self.AMap.Size(64, 64),
            offset: new self.AMap.Pixel(-32, -32)
          }]
        });
        /**
         * 车辆点聚合
         */
        self.carCluster = new self.AMap.MarkerClusterer(self.map, self.carMarkers, {
          gridSize: 20, //聚合计算时网格的像素大小，默认60
          minClusterSize: 10, //聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合
          maxZoom: 18,  //最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合
          averageCenter: false,//聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
          zoomOnClick: true, //点击聚合点时，是否散开，默认值为：true
          styles: [{
            url: "assets/img/car-clusterer-32.png",
            size: new self.AMap.Size(32, 32),
            offset: new self.AMap.Pixel(-16, -16)
          }, {
            url: "assets/img/car-clusterer-48.png",
            size: new self.AMap.Size(48, 48),
            offset: new self.AMap.Pixel(-24, -24)
          }, {
            url: "assets/img/car-clusterer-64.png",
            size: new self.AMap.Size(64, 64),
            offset: new self.AMap.Pixel(-32, -32)
          }]
        });
        /**
         * 配送员点聚合
         */
        self.deliveryManCluster = new self.AMap.MarkerClusterer(self.map, self.deliveryManMarkers, {
          gridSize: 20, //聚合计算时网格的像素大小，默认60
          minClusterSize: 10, //聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合
          maxZoom: 18,  //最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合
          averageCenter: false,//聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
          zoomOnClick: true, //点击聚合点时，是否散开，默认值为：true
          styles: [{
            url: "assets/img/delivery-man-clusterer-32.png",
            size: new self.AMap.Size(32, 32),
            offset: new self.AMap.Pixel(-16, -16)
          }, {
            url: "assets/img/delivery-man-clusterer-48.png",
            size: new self.AMap.Size(48, 48),
            offset: new self.AMap.Pixel(-24, -24)
          }, {
            url: "assets/img/delivery-man-clusterer-64.png",
            size: new self.AMap.Size(64, 64),
            offset: new self.AMap.Pixel(-32, -32)
          }]
        });
      }
    );

    this.getCarPosition();
    this.getDeliveryManPosition();
    this.getGasPosition();
    // map.setFitView();
  }


}
