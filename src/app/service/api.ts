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
  'login': feifeng + 'user/login.do',//登录
  'register': feifeng + 'user/add.do',//注册
  'findPwd': feifeng + 'user/add.do',//找回密码

  /**
   * 权限设置
   */
  'addUser': feifeng + 'user/add.do',//新增用户
  'updateUser': feifeng + 'user/setInformation.do',//编辑用户
  'deleteUser': feifeng + 'user/delete.do',//删除用户
  'getUserList': feifeng + 'user/getAdministrators.do',//获取用户列表

  'addRole': feifeng + 'systemSettings/roles/add.do',//新增角色
  'updateRole': feifeng + 'systemSettings/roles/update.do',//编辑角色
  'deleteRole': feifeng + 'systemSettings/roles/delete.do',//删除角色
  'getRoleList': feifeng + 'systemSettings/roles/get.do',//获取角色列表

  'addDepartment': feifeng + 'systemSettings/departments/add.do',//添加部门
  'updateDepartment': feifeng + 'systemSettings/departments/update.do',//编辑部门
  'deleteDepartment': feifeng + 'systemSettings/departments/del.do',//删除部门
  'getDepartmentList': feifeng + 'systemSettings/departments/get.do',//获取部门列表

  'getResourceList': feifeng + 'systemSettings/resources/get.do',//获取资源列表

  'setPrivileges': feifeng + 'systemSettings/resources/set.do',//分配权限

  /**
   * 统计报表
   */

  /**
  * 流程处理
  */
  'startProcess': feifeng + 'activiti/startProcess.do',//发起流程
  'getStartProcessList': feifeng + 'activiti/fanganlist.do',//获取尚未提交方案的流程
  'submitPlan': feifeng + 'activiti/task/tijiaofa.do',//提交方案
  'getPlanList': feifeng + 'activiti/shenhelist.do',//获取已提交方案未审核方案的流程
  'submitVerifyResult': feifeng + 'activiti/task/shenhefa.do',//提交方案审核结果
  'getVerifyList': feifeng + 'activiti/shishilist.do',//获取方案通过审核但尚未实施阶段的流程
  'submitActionResult': feifeng + 'activiti/task/tiajiaojg.do',//提交实施结果
  'getActionList': feifeng + 'activiti/jieguoList.do',//获取已实施的流程
  'submitFinishResult': feifeng + 'activiti/task/shenhejg.do',//提交整个流程的处理结果

  'getMyStartProcess': feifeng + 'activiti/setupprocess.do',//获取当前用户发起的流程
  'getMyParticipateProcess': feifeng + 'activiti/involvedprocess.do',//当前用户参与的流程
  'getMyFinishProcess': feifeng + 'activiti/getfinishprocess.do',//当前用户已经结束的流程
  'getFinishProcessDetail': feifeng + 'activiti/processinfo.do',//获得已结束流程的详情
  'getProcessStateDiagram': feifeng + 'activiti/traceprocess.do',//获得流程的状态图


  /**
  * 列表查询
  */
  'getGasCylinderUrl': tiejun + 'basicInformation/queryGasBottleManager.do',//获取气瓶档案列表
  'getCustomerUrl': tiejun + 'basicInformation/queryCustomerInformation.do',//获取客户信息列表
  'getStoreCylinderUrl': tiejun + 'basicInformation/queryStoreCylinderSendAndReceive.do',//获取门店气瓶信息列表
  'getFillingRecordUrl': tiejun + 'basicInformation/queryFillingRecord.do',//获取灌装记录明细列表
  'getGasTransportUrl': tiejun + 'basicInformation/queryGasStationTransportCylinderSendAndReceive.do',//获取气站运输气瓶列表
  'getGasSaleUrl': tiejun + 'basicInformation/queryGasStationDirectSaleCylinderSendAndReceive.do',//获取气站直销气瓶列表
  /**
  * 导出列表
  */
  'exportExcelCustomerUrl': tiejun + 'basicInformation/toExcelCustomerInformation.do',//导出客户列表信息
  'exportExcelGasCylinderUrl': tiejun + 'basicInformation/toExcelGasBottleManager.do',//导出气瓶信息
  'exportExcelGasSaleUrl': tiejun + 'basicInformation/toExcelGasStationDirectSaleCylinderSendAndReceive.do',//导出气站直销信息
  'exportExcelGasTransportUrl': tiejun + 'basicInformation/toExcelGasStationTransportCylinderSendAndReceive.do',//导出气站运输信息
  'exportExcelFillingRecordUrl': tiejun + 'basicInformation/toExcelFillingRecord.do',//导出灌装记录信息
  'exportExcelStoreCylinderUrl': tiejun + 'basicInformation/toExcelStoreCylinderSendAndReceive.do',//导出门店气瓶信息

  'getDelieveryManPosition': nina + 'positionManagement/track/searchTrackById.do',//配送员位置
  'getDelieveryManPath': nina + 'positionManagement/track/searchTrackByTimeSlot.do',//配送员路径
  // 'getCarPath': nina + 'positionManagement/track/searchTrackByCarTimeSlot.do',//车辆路径
  'getCarPath': nina + 'positionManagement/track/searchCarTrack.do',//车辆路径
  'getCarPosition': nina + 'positionManagement/track/searchTrackLatestById.do',//车辆位置

  'getGasPosition': nina + '',//气瓶位置

}