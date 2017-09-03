
const tiejun = 'http://192.168.1.113:8080/';
const nina = 'http://192.168.1.8:8090/';
const taoge='http://192.168.1.107:28081';
export const API = {
/**
* 列表查询
*/
'getGasCylinderUrl': tiejun + 'basicInformation/queryGasBottleManager.do',//获取气瓶档案列表
'getCustomerUrl': tiejun + 'basicInformation/queryCustomerInformation.do',//获取客户信息列表
'getStoreCylinderUrl': tiejun + 'basicInformation/queryStoreCylinderSendAndReceive.do',//获取门店气瓶信息列表
'getFillingRecordUrl': tiejun + 'basicInformation/queryFillingRecord.do',//获取灌装记录明细列表
'getGasTransportUrl': tiejun + 'basicInformation/queryGasStationTransportCylinderSendAndReceive.do',//获取气站运输气瓶列表
'getGasSaleUrl': tiejun + 'basicInformation/queryGasStationDirectSaleCylinderSendAndReceive.do',//获取气站直销气瓶列表

'getCompanyUrl':tiejun+'basicInformation/queryCompany.do', //获取公司列表信息
'getDeliverUrl':nina+'positionManagement/track/searchInformationById.do', //获取公司列表信息
/**
* 导出列表
*/
'exportExcelCustomerUrl': tiejun + 'basicInformation/toExcelCustomerInformation.do',//导出客户列表信息

'exportExcelGasCylinderUrl': tiejun + 'basicInformation/toExcelGasBottleManager.do',//导出气瓶信息

'exportExcelGasSaleUrl': tiejun + 'basicInformation/toExcelGasStationDirectSaleCylinderSendAndReceive.do',//导出气站直销信息

'exportExcelGasTransportUrl': tiejun + 'basicInformation/toExcelGasStationTransportCylinderSendAndReceive.do',//导出气站运输信息

'exportExcelFillingRecordUrl': tiejun + 'basicInformation/toExcelFillingRecord.do',//导出灌装记录信息

'exportExcelStoreCylinderUrl': tiejun + 'basicInformation/toExcelStoreCylinderSendAndReceive.do',//导出门店气瓶信息
/**
* 编码原则
*/

'getCompanyCodingUrl': taoge + '/codingStandard/getCompanyCodingStandard.do',//公司编码
'getCylinderCodingUrl': taoge + '/codingStandard/getCylinderCodingStandard.do',//气瓶编码
'getStationCodingUrl': taoge + '/codingStandard/getStationCodingStandard.do',//气站编码
}