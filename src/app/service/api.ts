// const url = 'http://192.168.1.152:4200/';
const url = 'http://192.168.1.26:18080/';
const guotao = 'http://192.168.1.107:28081/';

export const API = {

  /**
   * 大数据可视化
   */
  'getAlarmList': guotao + 'reportManagement/getCountAlarmEventRecordGroupByAdministrativeRegions.do',//获取报警信息
  
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


}