const nina = 'http://192.168.1.8:8089/';
const tiejun = 'http://192.168.1.113:8080/';
const feifeng = 'http://192.168.1.26:18080/';
const guotao = 'http://192.168.1.107:28081/';
const demo = 'http://localhost:8080/iecloud/'
const url = guotao;

export const URL = url;
export const API = {

  /**
   * 大数据可视化
   */
  'getAlarmList': url + 'reportManagement/getCountAlarmEventRecordGroupByAdministrativeRegions.do',//获取报警信息

  /**
   * 登录注册
   */
  'login': url + 'user/login.do',//登录
  'register': url + 'user/add.do',//注册
  'findPwd': url + 'user/add.do',//找回密码

  /**
   * 权限设置
   */
  'addUser': url + 'user/add.do',//新增用户
  'updateUser': url + 'user/setInformation.do',//编辑用户
  'deleteUser': url + 'user/delete.do',//删除用户
  'getUserList': url + 'user/getAdministrators.do',//获取用户列表

  'addRole': url + 'systemSettings/roles/add.do',//新增角色
  'updateRole': url + 'systemSettings/roles/update.do',//编辑角色
  'deleteRole': url + 'systemSettings/roles/delete.do',//删除角色
  'getRoleList': url + 'systemSettings/roles/get.do',//获取角色列表

  'addDepartment': url + 'systemSettings/departments/add.do',//添加部门
  'updateDepartment': url + 'systemSettings/departments/update.do',//编辑部门
  'deleteDepartment': url + 'systemSettings/departments/del.do',//删除部门
  'getDepartmentList': url + 'systemSettings/departments/get.do',//获取部门列表

  'getResourceList': url + 'systemSettings/resources/get.do',//获取资源列表

  'setPrivileges': url + 'systemSettings/resources/set.do',//分配权限

  'searchLog': url + 'log/searchLog.do',//查询日志

  /**
   * 统计报表
   */

  /**
  * 流程处理
  */
  'startProcess': url + 'activiti/startProcess.do',//发起流程
  'getStartProcessList': url + 'activiti/fanganlist.do',//获取尚未提交方案的流程
  'submitPlan': url + 'activiti/task/tijiaofa.do',//提交方案
  'getPlanList': url + 'activiti/shenhelist.do',//获取已提交方案未审核方案的流程
  'submitVerifyResult': url + 'activiti/task/shenhefa.do',//提交方案审核结果
  'getVerifyList': url + 'activiti/shishilist.do',//获取方案通过审核但尚未实施阶段的流程
  'submitActionResult': url + 'activiti/task/tiajiaojg.do',//提交实施结果
  'getActionList': url + 'activiti/jieguoList.do',//获取已实施的流程
  'submitFinishResult': url + 'activiti/task/shenhejg.do',//提交整个流程的处理结果

  'getMyStartProcess': url + 'activiti/setupprocess.do',//获取当前用户发起的流程
  'getMyParticipateProcess': url + 'activiti/involvedprocess.do',//当前用户参与的流程
  'getMyFinishProcess': url + 'activiti/getfinishprocess.do',//当前用户已经结束的流程
  'getFinishProcessDetail': url + 'activiti/processinfo.do',//获得已结束流程的详情
  'getProcessStateDiagram': url + 'activiti/traceprocess.do',//获得流程的状态图

  'addFlow': url + 'process/add.do',
  'deleteFlow': url + 'process/delete.do',
  'getFlowList': url + 'process/select.do',
  'updateFlow': url + 'process/update.do',

  /**
  * 列表查询
  */
  'getGasCylinderUrl': url + 'basicInformation/queryGasBottleManager.do',//获取气瓶档案列表
  'getCustomerUrl': url + 'basicInformation/queryCustomerInformation.do',//获取客户信息列表
  'getStoreCylinderUrl': url + 'basicInformation/queryStoreCylinderSendAndReceive.do',//获取门店气瓶信息列表
  'getFillingRecordUrl': url + 'basicInformation/queryFillingRecord.do',//获取灌装记录明细列表
  'getGasTransportUrl': url + 'basicInformation/queryGasStationTransportCylinderSendAndReceive.do',//获取气站运输气瓶列表
  'getGasSaleUrl': url + 'basicInformation/queryGasStationDirectSaleCylinderSendAndReceive.do',//获取气站直销气瓶列表

  'getCompanyUrl': url + 'basicInformation/queryCompany.do', //获取公司列表信息
  'getDeliverUrl': url + 'positionManagement/track/searchInformationById.do', //获取公司列表信息
  /**
  * 导出列表
  */
  'exportExcelCustomerUrl': url + 'basicInformation/toExcelCustomerInformation.do',//导出客户列表信息
  'exportExcelGasCylinderUrl': url + 'basicInformation/toExcelGasBottleManager.do',//导出气瓶信息
  'exportExcelGasSaleUrl': url + 'basicInformation/toExcelGasStationDirectSaleCylinderSendAndReceive.do',//导出气站直销信息
  'exportExcelGasTransportUrl': url + 'basicInformation/toExcelGasStationTransportCylinderSendAndReceive.do',//导出气站运输信息
  'exportExcelFillingRecordUrl': url + 'basicInformation/toExcelFillingRecord.do',//导出灌装记录信息
  'exportExcelStoreCylinderUrl': url + 'basicInformation/toExcelStoreCylinderSendAndReceive.do',//导出门店气瓶信息
  'exportExcelCompanyUrl': url + 'basicInformation/toExcelCompany.do',//导出门店气瓶信息

  'getDelieveryManPosition': url + 'positionManagement/person/searchLatestById.do',//配送员位置
  'getDelieveryManPath': url + 'positionManagement/person/searchTrack.do',//配送员路径
  // 'getCarPath': url + 'positionManagement/track/searchTrackByCarTimeSlot.do',//车辆路径
  'getCarPath': url + 'positionManagement/car/searchTrack.do',//车辆路径
  'getCarPosition': url + 'positionManagement/car/searchTrackLatestById.do',//车辆位置

  'getGasPosition': url + '',//气瓶位置

  /**
  * 编码原则
  */

  'getCompanyCodingUrl': url + 'codingStandard/getCompanyCodingStandard.do',//公司编码
  'getCylinderCodingUrl': url + 'codingStandard/getCylinderCodingStandard.do',//气瓶编码
  'getStationCodingUrl': url + 'codingStandard/getStationCodingStandard.do',//气站编码

  /**
* 增加
*/
  'AddCompanyUrl': url + 'basicInformation/insertCompany.do',//企业信息
  'AddStoreUrl': url + 'basicInformation/insertGasStation.do',//企业信息

  /**
  * 配送 车辆 员工
  */
  'getDeliverymanUrl': url + 'positionManagement/person/searchLatestById.do',//配送员信息
  'getDeliverCarUrl': url + 'positionManagement/car/searchTrackLatestById.do',//配送车信息

  'getGasStationleUrl': url + 'basicInformation/selectGasStationAll.do',//站点信息

}

