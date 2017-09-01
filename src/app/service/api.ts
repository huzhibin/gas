
const url = 'http://192.168.1.113:8080/';

export const API = {
/**
* 列表查询
*/
'getGasCylinderUrl': url + 'basicInformation/queryGasBottleManager.do',//获取气瓶档案列表
'getCustomerUrl': url + 'basicInformation/queryCustomerInformation.do',//获取客户信息列表
'getStoreCylinderUrl': url + 'basicInformation/queryStoreCylinderSendAndReceive.do',//获取门店气瓶信息列表
'getFillingRecordUrl': url + 'basicInformation/queryFillingRecord.do',//获取灌装记录明细列表
'getGasTransportUrl': url + 'basicInformation/queryGasStationTransportCylinderSendAndReceive.do',//获取气站运输气瓶列表
'getGasSaleUrl': url + 'basicInformation/queryGasStationDirectSaleCylinderSendAndReceive.do',//获取气站直销气瓶列表
/**
* 导出列表
*/
'exportExcelCustomerUrl': url + 'basicInformation/toExcelCustomerInformation.do',//导出客户列表信息

'exportExcelGasCylinderUrl': url + 'basicInformation/toExcelGasBottleManager.do',//导出气瓶信息

'exportExcelGasSaleUrl': url + 'basicInformation/toExcelGasStationDirectSaleCylinderSendAndReceive.do',//导出气站直销信息

'exportExcelGasTransportUrl': url + 'basicInformation/toExcelGasStationTransportCylinderSendAndReceive.do',//导出气站运输信息

'exportExcelFillingRecordUrl': url + 'basicInformation/toExcelFillingRecord.do',//导出灌装记录信息

'exportExcelStoreCylinderUrl': url + 'basicInformation/toExcelStoreCylinderSendAndReceive.do',//导出门店气瓶信息


}