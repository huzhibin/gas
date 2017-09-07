const nina = 'http://192.168.1.8:8089/';
const tiejun = 'http://192.168.1.113:8080/';
const feifeng = 'http://192.168.1.26:18080/';
const guotao = 'http://192.168.1.107:28081/';

export const API = {

  /**
   * 大数据可视化
   */
  'getAlarmList': guotao + 'reportManagement/getCountAlarmEventRecordGroupByAdministrativeRegions.do',//获取报警信息
  /**
   * 登录注册
   */
  'login': guotao + 'user/login.do',//登录
  'register': guotao + 'user/add.do',//注册
  'findPwd': guotao + 'user/add.do',//找回密码

  /**
   * 权限设置
   */
  'addUser': guotao + 'user/add.do',//新增用户
  'updateUser': guotao + 'user/setInformation.do',//编辑用户
  'deleteUser': guotao + 'user/delete.do',//删除用户
  'getUserList': guotao + 'user/getAdministrators.do',//获取用户列表

  'addRole': guotao + 'systemSettings/roles/add.do',//新增角色
  'updateRole': guotao + 'systemSettings/roles/update.do',//编辑角色
  'deleteRole': guotao + 'systemSettings/roles/delete.do',//删除角色
  'getRoleList': guotao + 'systemSettings/roles/get.do',//获取角色列表

  'addDepartment': guotao + 'systemSettings/departments/add.do',//添加部门
  'updateDepartment': guotao + 'systemSettings/departments/update.do',//编辑部门
  'deleteDepartment': guotao + 'systemSettings/departments/del.do',//删除部门
  'getDepartmentList': guotao + 'systemSettings/departments/get.do',//获取部门列表

  'getResourceList': guotao + 'systemSettings/resources/get.do',//获取资源列表

  'setPrivileges': guotao + 'systemSettings/resources/set.do',//分配权限

  'searchLog': guotao + 'log/searchLog.do',//查询日志

  /**
   * 统计报表
   */
  'stateLawEnforcement': guotao + 'reportManagement/stateLawEnforcement.do',// 得到执法状态：各状态执法事件数量

  /**
  * 流程处理
  */
  'startProcess': guotao + 'activiti/startProcess.do',//发起流程
  'getStartProcessList': guotao + 'activiti/fanganlist.do',//获取尚未提交方案的流程
  'submitPlan': guotao + 'activiti/task/tijiaofa.do',//提交方案
  'getPlanList': guotao + 'activiti/shenhelist.do',//获取已提交方案未审核方案的流程
  'submitVerifyResult': guotao + 'activiti/task/shenhefa.do',//提交方案审核结果
  'getVerifyList': guotao + 'activiti/shishilist.do',//获取方案通过审核但尚未实施阶段的流程
  'submitActionResult': guotao + 'activiti/task/tiajiaojg.do',//提交实施结果
  'getActionList': guotao + 'activiti/jieguoList.do',//获取已实施的流程
  'submitFinishResult': guotao + 'activiti/task/shenhejg.do',//提交整个流程的处理结果

  'getMyStartProcess': guotao + 'activiti/setupprocess.do',//获取当前用户发起的流程
  'getMyParticipateProcess': guotao + 'activiti/involvedprocess.do',//当前用户参与的流程
  'getMyFinishProcess': guotao + 'activiti/getfinishprocess.do',//当前用户已经结束的流程
  'getFinishProcessDetail': guotao + 'activiti/processinfo.do',//获得已结束流程的详情
  'getProcessStateDiagram': guotao + 'activiti/traceprocess.do',//获得流程的状态图


  /**
  * 列表查询
  */
  'getGasCylinderUrl': guotao + 'basicInformation/queryGasBottleManager.do',//获取气瓶档案列表
  'getCustomerUrl': guotao + 'basicInformation/queryCustomerInformation.do',//获取客户信息列表
  'getStoreCylinderUrl': guotao + 'basicInformation/queryStoreCylinderSendAndReceive.do',//获取门店气瓶信息列表
  'getFillingRecordUrl': guotao + 'basicInformation/queryFillingRecord.do',//获取灌装记录明细列表
  'getGasTransportUrl': guotao + 'basicInformation/queryGasStationTransportCylinderSendAndReceive.do',//获取气站运输气瓶列表
  'getGasSaleUrl': guotao + 'basicInformation/queryGasStationDirectSaleCylinderSendAndReceive.do',//获取气站直销气瓶列表

  'getCompanyUrl': guotao + 'basicInformation/queryCompany.do', //获取公司列表信息
  'getDeliverUrl': guotao + 'positionManagement/track/searchInformationById.do', //获取公司列表信息
  /**
  * 导出列表
  */
  'exportExcelCustomerUrl': guotao + 'basicInformation/toExcelCustomerInformation.do',//导出客户列表信息
  'exportExcelGasCylinderUrl': guotao + 'basicInformation/toExcelGasBottleManager.do',//导出气瓶信息
  'exportExcelGasSaleUrl': guotao + 'basicInformation/toExcelGasStationDirectSaleCylinderSendAndReceive.do',//导出气站直销信息
  'exportExcelGasTransportUrl': guotao + 'basicInformation/toExcelGasStationTransportCylinderSendAndReceive.do',//导出气站运输信息
  'exportExcelFillingRecordUrl': guotao + 'basicInformation/toExcelFillingRecord.do',//导出灌装记录信息
  'exportExcelStoreCylinderUrl': guotao + 'basicInformation/toExcelStoreCylinderSendAndReceive.do',//导出门店气瓶信息

  'getDelieveryManPosition': guotao + 'positionManagement/person/searchLatestById.do',//配送员位置
  'getDelieveryManPath': guotao + 'positionManagement/person/searchTrack.do',//配送员路径
  // 'getCarPath': guotao + 'positionManagement/track/searchTrackByCarTimeSlot.do',//车辆路径
  'getCarPath': guotao + 'positionManagement/car/searchTrack.do',//车辆路径
  'getCarPosition': guotao + 'positionManagement/car/searchTrackLatestById.do',//车辆位置

  'getGasPosition': guotao + '',//气瓶位置

  /**
  * 编码原则
  */

  'getCompanyCodingUrl': guotao + 'codingStandard/getCompanyCodingStandard.do',//公司编码
  'getCylinderCodingUrl': guotao + 'codingStandard/getCylinderCodingStandard.do',//气瓶编码
  'getStationCodingUrl': guotao + 'codingStandard/getStationCodingStandard.do',//气站编码
}