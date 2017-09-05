
// const guotao = 'http://192.168.1.113:8080/';
// const nina = 'http://192.168.1.8:8090/';
const guotao='http://192.168.1.107:28081/';
export const API = {
/**
* 列表查询
*/
'getGasCylinderUrl': guotao + 'basicInformation/queryGasBottleManager.do',//获取气瓶档案列表
'getCustomerUrl': guotao + 'basicInformation/queryCustomerInformation.do',//获取客户信息列表
'getStoreCylinderUrl': guotao + 'basicInformation/queryStoreCylinderSendAndReceive.do',//获取门店气瓶信息列表
'getFillingRecordUrl': guotao + 'basicInformation/queryFillingRecord.do',//获取灌装记录明细列表
'getGasTransportUrl': guotao + 'basicInformation/queryGasStationTransportCylinderSendAndReceive.do',//获取气站运输气瓶列表
'getGasSaleUrl': guotao + 'basicInformation/queryGasStationDirectSaleCylinderSendAndReceive.do',//获取气站直销气瓶列表

'getGasStationleUrl': guotao + 'basicInformation/selectGasStationAll.do',//站点信息

'getCompanyUrl':guotao+'basicInformation/queryCompany.do', //获取公司列表信息
'getDeliverUrl':guotao+'positionManagement/track/searchInformationById.do', //获取公司列表信息
/**
* 导出列表
*/
'exportExcelCustomerUrl': guotao + 'basicInformation/toExcelCustomerInformation.do',//导出客户列表信息

'exportExcelGasCylinderUrl': guotao + 'basicInformation/toExcelGasBottleManager.do',//导出气瓶信息

'exportExcelGasSaleUrl': guotao + 'basicInformation/toExcelGasStationDirectSaleCylinderSendAndReceive.do',//导出气站直销信息

'exportExcelGasTransportUrl': guotao + 'basicInformation/toExcelGasStationTransportCylinderSendAndReceive.do',//导出气站运输信息

'exportExcelFillingRecordUrl': guotao + 'basicInformation/toExcelFillingRecord.do',//导出灌装记录信息

'exportExcelStoreCylinderUrl': guotao + 'basicInformation/toExcelStoreCylinderSendAndReceive.do',//导出门店气瓶信息

'exportExcelCompanyUrl': guotao + 'basicInformation/toExcelCompany.do',//导出门店气瓶信息

/**
* 编码原则
*/

'getCompanyCodingUrl': guotao + 'codingStandard/getCompanyCodingStandard.do',//公司编码
'getCylinderCodingUrl': guotao + 'codingStandard/getCylinderCodingStandard.do',//气瓶编码
'getStationCodingUrl': guotao + 'codingStandard/getStationCodingStandard.do',//气站编码

/**
* 配送 车辆 员工
*/
'getDeliverymanUrl': guotao + 'positionManagement/person/searchLatestById.do',//配送员信息
'getDeliverCarUrl': guotao + 'positionManagement/car/searchTrackLatestById.do',//配送车信息
/**
* 增加
*/
'AddCompanyUrl': guotao + 'basicInformation/insertCompany.do',//企业信息
'AddStoreUrl': guotao + 'basicInformation/insertGasStation.do',//企业信息

}

