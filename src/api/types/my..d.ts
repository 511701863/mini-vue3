declare namespace MyCenter {
  /**
  * 维保
  */
  export interface VehicleMaintenanceAppointmentAppPageAo {
    /**
     * 预约单号
     */
    appointNo?: string;
    /**
     * 取消原因
     */
    cancelReason?: string;
    /**
     * 电话
     */
    cellPhoneNumber?: string;
    /**
     * 线下订单号
     */
    code?: string;
    /**
     * 确认时间
     */
    confirmDate?: number;
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 姓名
     */
    customerName?: string;
    /**
     * 4S 店编号
     */
    dealerCode?: string;
    /**
     * 4S 店名称
     */
    dealerName?: string;
    /**
     * 删除状态，-1已删除，1未删除
     */
    deleteStatus?: number;
    /**
     * 保养完成时间
     */
    examineTime?: number;
    /**
     * 失败原因
     */
    failReason?: string;
    /**
     * 主键ID
     */
    id?: number;
    /**
     * 维保项目；多个用,分隔
     */
    items?: string;
    /**
     * 车牌号
     */
    licensePlate?: string;
    /**
     * 保养途径;1：车主俱乐部，2：车机系统，3：微信小程序，4：DMS，5：移动 DMS 6：车主APP
     */
    maintenanceWay?: number;
    /**
     * 维保材料；多个用,分隔
     */
    materials?: string;
    /**
     * 保养里程
     */
    mileage?: string;
    /**
     * 车系
     */
    motorSeries?: string;
    /**
     * 车型
     */
    motorType?: string;
    /**
     * 预约渠道，2：TSP
     */
    orderChannel?: number;
    /**
     * 预约日期,13位时间戳
     */
    planArriveDate?: number;
    /**
     * 预约时间段，N:00-(N+1):00
     */
    planArriveTime?: string;
    /**
     * 预约说明
     */
    remark?: string;
    /**
     * 维保类型，1：保养，2：维修
     */
    repairType?: number;
    /**
     * 服务顾问姓名
     */
    serviceAdvisorName?: string;
    /**
     * 订单状态，1：预约中；2：成功接单(待维保)；3：取消预约；4：订单完成；5：已过期；-1：失败订单；
     */
    status?: number;
    /**
     * 更新时间
     */
    updateTime?: Date;
    /**
     * 用户ID
     */
    userId?: number;
    /**
     * 车架号
     */
    vin?: string;
  }
  export interface DealersAppPageResultAo {
    /**
     * 地址
     */
    address?: string;
    /**
     * 市code
     */
    cityCode?: string;
    /**
     * 经销商code
     */
    code?: string;
    /**
     * 区code
     */
    districtCode?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 英文名
     */
    englishName?: string;
    /**
     * 传真
     */
    fax?: string;
    /**
     * 24小时热线电话
     */
    hotPhone?: string;
    /**
     * id
     */
    id?: number;
    /**
     * 纬度
     */
    latitude?: string;
    /**
     * 经度
     */
    longitude?: string;
    /**
     * 经销商name
     */
    name?: string;
    /**
     * 邮编
     */
    postCode?: string;
    /**
     * 省code
     */
    provinceCode?: string;
    /**
     * 销售电话
     */
    salePhone?: string;
    /**
     * 销售类型  1-售前，2-售后，3-4S
     */
    saleType?: number;
    /**
     * 服务电话
     */
    servicePhone?: string;
    /**
     * shortName
     */
    shortName?: string;
    /**
     * 状态  0：有效，-1：无效
     */
    status?: number;
  }
  export interface AreaVo {
    areaId?: number;
    areaLevel?: number;
    areaName?: string;
    parentId?: number;
    parentName?: string;
    parentShortName?: string;
    shortName?: string;
  }
  //创建维保
  export interface addMaintenance {
    /**
     * 电话
     */
    cellPhoneNumber: string;
    /**
     * 姓名
     */
    customerName: string;
    /**
     * 4S 店编号
     */
    dealerCode: string;
    /**
     * 车牌号
     */
    licensePlate?: string;
    /**
     * 行驶里程，单位：km
     */
    mileage?: string;
    /**
     * 车系
     */
    motorSeries?: string;
    /**
     * 车型
     */
    motorType?: string;
    /**
     * 预约渠道，2：TSP
     */
    orderChannel?: number;
    /**
     * 预约日期,传年月日的13位时间戳
     */
    planArriveDate: number;
    /**
     * 预约时间段,N:00-(N+1):00
     */
    planArriveTime: string;
    /**
     * 预约说明
     */
    remark?: string;
    /**
     * 服务类型，1：保养，2：维修
     */
    repairType: string;
    /**
     * 车架号
     */
    vin: string;
    store: string;
  }
  /**
 * 车辆管理
 */
  export interface VehicleLoveList {
    /**
     * 认证状态：1：未实名，2：认证中，3：认证成功，-1：认证失败
     */
    authState?: number;
    /**
     * 车牌号
     */
    carLicense?: string;
    /**
     * 是否为默认车辆
     */
    defaultFlag?: boolean;
    /**
     * 是否是授权车辆
     */
    isGrant?: boolean;
    /**
     * 车型简称
     */
    modelShowName?: string;
    /**
     * VIN码
     */
    vin?: string;
  }
  /**
* pin管理
*/
  /**
* 电子围栏
*/
  export interface ElectricFenceVo {
    /**
     * 告警类型,枚举值: ALL,驶入ENTRY,驶出EXIT
     */
    alarmType?: string;
    /**
     * 车牌号
     */
    carLicense?: string;
    /**
     * 围栏中心具体地址
     */
    centerAddress?: string;
    /**
     * 每天生效的结束时间,格式HH:MM:SS
     */
    endTime?: string;
    /**
     * 围栏中心地点名
     */
    fenceCenter?: string;
    /**
     * 围栏ID
     */
    fenceId?: string;
    /**
     * 围栏名称
     */
    fenceName?: string;
    /**
     * 围栏类型,枚举值: 多边形POLYGON,圆形ROUND
     */
    fenceType?: string;
    polygonFence?: PolygonFenceType | null;
    roundFence?: RoundFence | null;
    /**
     * 每天生效的开始时间,格式HH:MM:SS
     */
    startTime?: string;
    /**
     * 围栏所属车辆
     */
    vin?: string;
  }
  //新增、编辑围栏
  export interface AddElectric {
    /**
     * 告警类型,枚举值: ALL,驶入ENTRY,驶出EXIT
     */
    alarmType?: string;
    /**
     * 围栏中心具体地址
     */
    centerAddress?: string;
    /**
     * 每天生效的结束时间,格式HH:MM:SS
     */
    endTime?: string;
    /**
     * 围栏中心地点名
     */
    fenceCenter?: string;
    /**
     * 围栏ID
     */
    fenceId?: string;
    /**
     * 围栏名称
     */
    fenceName?: string;
    /**
     * 围栏类型,枚举值: 多边形POLYGON,圆形ROUND
     */
    fenceType?: string;
    polygonFence?: PolygonFenceType | null;
    roundFence?: RoundFence | null;
    /**
     * 每天生效的开始时间,格式HH:MM:SS
     */
    startTime?: string;
    /**
     * 围栏所属车辆
     */
    vin?: string;
    type:any
  }
  /**
 * 多边形围栏定义，围栏类型为多边形时必填
 */
  export interface PolygonFenceType {
    center?: FencePoint;
    /**
     * 经纬度集合
     */
    path?: FencePoint[];
    /**
     * 边长，单位米
     */
    radius?: number;
  }

  /**
  * FencePoint
  */
  export interface FencePoint {
    /**
     * 纬度
     */
    latitude?: number;
    /**
     * 经度
     */
    longitude?: number;
  }

  /**
  * 圆形围栏定义，围栏类型为圆形时必填
  */
  export interface RoundFence {
    center?: FencePoint;
    /**
     * 半径,单位米
     */
    radius?: number;
  }
}
