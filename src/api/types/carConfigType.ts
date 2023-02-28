
export interface VehicleExteriorAo {
  /**
   * 认证状态：1：未实名，2：认证中，3：认证成功，-1：认证失败
   */
  authState?: number;
  /**
   * 蓝牙状态,-1:未生效，0:未使用,1:使用中,2:已撤销,3:已过期,4:已冻结,5:已失效
   */
  bluKeyStatus?: number;
  /**
   * 车牌号
   */
  carLicense?: string;
  /**
   * 默认车辆，true为是
   */
  defaultFlag?: boolean;
  /**
   * tbox-iccid
   */
  iccid?: string;
  /**
   * 主键ID
   */
  id?: number;
  /**
   * 车型图片
   */
  modelImage?: string;
  /**
   * 车型简称
   */
  modelShowName?: string;
  /**
   * VIN码
   */
  vin?: string;
  grantStatus?: number;
  grantType?: number;
  grantStartTime?: number;
  grantEndTime?: number;
}
export interface RecordHistory {
  /**
   * 车牌号
   */
  carLicense?: string;
  /**
   * 操作内容
   */
  controlFunction?: string;
  /**
   * 控制结果,SUCCESS:执行成功，TIMEOUT:执行超时，FAILED:执行失败
   */
  controlResult?: string;
  /**
   * 控制时间
   */
  controlTime?: number;
  /**
   * 控制类型,1-远控,2-蓝牙
   */
  controlType?: number;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 操作人手机号
   */
  userPhone?: string;
  /**
   * 操作人类型,0车主，1被授权人
   */
  userType?: number;
  /**
   * 车架号
   */
  vin?: string;
  controlFunctionStr?:string;
}
export interface GrantRecordVo {
  /**
   * 蓝牙状态,-1:未生效，0:未使用,1:使用中,2:已撤销,3:已过期,4:已冻结,5:已失效
   */
  bluKeyStatus?: number;
  /**
   * 车牌号
   */
  carLicense?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 被授权人id
   */
  gainUserId?: number;
  /**
   * 被授权人姓名
   */
  gainUserName?: string;
  /**
   * 被授权人账号
   */
  gainUserPhone?: string;
  /**
   * 授权结束时间
   */
  grantEndTime?: number;
  /**
   * 授权开始时间
   */
  grantStartTime?: number;
  /**
   * 授权状态,-1：已撤销，0：已过期,1授权中
   */
  grantStatus?: number;
  /**
   * 授权钥匙,1-网络钥匙，0-网络钥匙+蓝牙钥匙,2-蓝牙钥匙
   */
  grantType?: number;
  /**
   * 授权人id
   */
  grantUserId?: number;
  /**
   * 授权人姓名(车主姓名)
   */
  grantUserName?: string;
  /**
   * 授权人手机号(车主账号)
   */
  grantUserPhone?: string;
  /**
   * id
   */
  id?: string;
  keyId?: string;
  /**
   * 车型图片
   */
  modelImage?: string;
  /**
   * 车型简称
   */
  modelShowName?: string;
  /**
   * 远控授权记录id
   */
  vehicleGrantId?: number;
  /**
   * 车架号
   */
  vin?: string;
}
export interface GrantCarType {
  /**
   * 被授权人姓名
   */
  gainUserName?: string;
  /**
   * 被授权人手机号
   */
  gainUserPhone?: string;
  /**
   * 授权结束时间
   */
  grantEndTime?: number;
  /**
   * 授权开始时间
   */
  grantStartTime?: number;
  /**
   * 授权钥匙,1-网络钥匙，0-网络钥匙+蓝牙钥匙,2-蓝牙钥匙
   */
  grantType?: number;
  /**
   * 授权人手机号
   */
  grantUserPhone?: string;
  /**
   * 车架号
   */
  vin?: string;
}
export interface VehicleAppDetailAo {
  /**
   * 4s店地址
   */
  address?: string;
  /**
   * 认证状态：1：未实名，2：认证中，3：认证成功，-1：认证失败
   */
  authState?: number;
  /**
   * 蓝牙状态,-1:未生效，0:未使用,1:使用中,2:已撤销,3:已过期,4:已冻结,5:已失效
   */
  bluKeyStatus?: number;
  /**
   * 车牌号
   */
  carLicense?: string;
  /**
   * 是否为默认车辆
   */
  defaultFlag?: boolean;
  /**
   * 发动机号
   */
  engineNumber?: string;
  /**
   * tbox-iccid
   */
  iccid?: string;
  /**
   * 主键ID
   */
  id?: number;
  /**
   * 是否是授权车辆
   */
  isGrant?: boolean;
  /**
   * 是否开启防盗告警
   */
  isTheftAlarm?: boolean;
  /**
   * 车型图片
   */
  modelImage?: string;
  /**
   * 车型简称
   */
  modelShowName?: string;
  /**
   * 4s店Code
   */
  salesAreaCode?: string;
  /**
   * 4s店名称
   */
  salesAreaName?: string;
  /**
   * VIN码
   */
  vin?: string;
}
