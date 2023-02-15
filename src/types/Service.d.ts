declare namespace Service {

  /**
  * 附近服务站数据
  */
  interface Station {
    /**
     * 所属大区CODE
     */
    bigAreaCode?: string;
    /**
     * 所属大区ID
     */
    bigAreaId?: string;
    /**
     * 距离点位距离--查附近服务站返回
     */
    distance?: number;
    /**
     * 经销商编码
     */
    dlrCode?: string;
    /**
     * 所属经销商全称
     */
    dlrFullName?: string;
    /**
     * 经销商ID
     */
    dlrId?: string;
    id?: number;
    /**
     * 是否JDP城市
     */
    isJdp?: string;
    /**
     * 是否新能源
     */
    isNewEnergy?: string;
    /**
     * 所属经理部CODE
     */
    managerDeptCode?: string;
    /**
     * 所属经理部ID
     */
    managerDeptId?: string;
    /**
     * 对应网点ID
     */
    netId?: string;
    /**
     * 组织结构代码
     */
    orgStructureCode?: string;
    /**
     * 对应网点编码
     */
    salesNetId?: string;
    /**
     * 对应销售网点名称
     */
    salesNetName?: string;
    /**
     * 服务站地址
     */
    serviceStationAddress?: string;
    /**
     * 24小时电话
     */
    serviceStationAllhoursPhone?: string;
    /**
     * 服务站类别
     */
    serviceStationCategory?: string;
    /**
     * 市国家行政代码
     */
    serviceStationCityCd?: string;
    /**
     * 所在市
     */
    serviceStationCityName?: string;
    /**
     * 服务站章号
     */
    serviceStationCode?: string;
    /**
     * 区国家行政代码
     */
    serviceStationCountyCd?: string;
    /**
     * 所在县
     */
    serviceStationCountyName?: string;
    /**
     * 电子邮件
     */
    serviceStationEmail?: string;
    /**
     * 服务站ID
     */
    serviceStationId?: string;
    /**
     * 服务站索引代码
     */
    serviceStationIndexcode?: string;
    /**
     * 地址纬度
     */
    serviceStationLatitude?: string;
    /**
     * 法人代表
     */
    serviceStationLegalRepName?: string;
    /**
     * 服务网点级别
     */
    serviceStationLevel?: string;
    /**
     * 地址经度
     */
    serviceStationLongitude?: string;
    /**
     * 总经理
     */
    serviceStationManagerName?: string;
    /**
     * 总经理座机
     */
    serviceStationManagerPhone?: string;
    /**
     * 总经理手机
     */
    serviceStationManagerTelephone?: string;
    /**
     * 服务站名称
     */
    serviceStationName?: string;
    /**
     * 运营情况
     */
    serviceStationOperationSituation?: string;
    /**
     * 邮编
     */
    serviceStationPostcode?: string;
    /**
     * 省国家行政代码
     */
    serviceStationProvinceCd?: string;
    /**
     * 所在省份
     */
    serviceStationProvinceName?: string;
    /**
     * 区域服务经理
     */
    serviceStationServiceManager?: string;
    /**
     * 服务经理电话
     */
    serviceStationServiceManagerPhone?: string;
    /**
     * 传真号码
     */
    serviceStationServicerFax?: string;
    /**
     * 服务接待电话
     */
    serviceStationServicerPhone?: string;
    /**
     * 服务星级
     */
    serviceStationServicestar?: string;
    /**
     * 排序号
     */
    serviceStationSort?: string;
    /**
     * 服务站状态
     */
    serviceStationStatus?: string;
    /**
     * 上级服务站
     */
    serviceStationUpService?: string;
    /**
     * 有效性
     */
    serviceStationValid?: string;
  }
  interface OilPrice {
    p0?: string;
    p89?: string;
    p92?: string;
    p95?: string;
    p98?: string;
    prov?: string;
    time?: string;
  }
  interface UserCar {
    /**
     * 账户id
     */
    accountId?: number;
    /**
     * 车辆授权状态
     */
    accreditStatus?: string;
    /**
     * 车辆实名认证状态
     */
    authenticationStatus?: string;
    /**
     * 认证状态
     */
    authStatus?: string;
    /**
     * 认证时间
     */
    authTime?: string;
    /**
     * 认证类型 ACCREDIT、APPEAL、AUTH、UNBIND
     */
    authType?: string;
    /**
     * 品牌
     */
    brandName?: string;
    /**
     * 车辆充电中心
     */
    chargingCenter?: string;
    /**
     * 颜色
     */
    colorName?: string;
    createTime?: string;
    /**
     * 发动机编号
     */
    engineNumber?: string;
    /**
     * 车主性别
     */
    gender?: string;
    /**
     * 物联网卡编号
     */
    iccid?: string;
    id?: number;
    /**
     * 身份证编号
     */
    idNumber?: string;
    /**
     * 保险电话
     */
    insurancePhone?: string;
    /**
     * 是否车联网车辆
     */
    isEquippedWithTelematics?: boolean;
    /**
     * 是否特殊车辆
     */
    isSpecCar?: boolean;
    /**
     * 车牌号
     */
    licensePlate?: string;
    /**
     * 车型图片
     */
    modelImageUrl?: string;
    /**
     * 车型代码code
     */
    modelMatlabCode?: string;
    /**
     * 车型
     */
    modelName?: string;
    /**
     * 昵称
     */
    nickName?: string;
    /**
     * 车主id
     */
    ownerId?: number;
    /**
     * 车主姓名
     */
    ownerName?: string;
    remark?: string;
    /**
     * 车系
     */
    seriesName?: string;
    /**
     * default：默认车辆，none：非默认车辆
     */
    status?: string;
    /**
     * 品牌？
     */
    strainName?: string;
    /**
     * 标签
     */
    tagType?: string;
    /**
     * 车辆出厂时发往的经销商code
     */
    toDealerCode?: string;
    /**
     * 手机号
     */
    userName?: string;
    /**
     * 车辆id
     */
    vehicleId?: number;
    /**
     * vin
     */
    vin?: string;
  }
  /**
 * 三包凭证表单
 */
  interface VoucherForm {
    /**
     * 车牌号
     */
    carNum?: string;
    /**
     * 车系
     */
    carType?: string;
    /**
     * 客户姓名
     */
    clientName?: string;
    /**
     * 身份证正面 Base64
     */
    idCardAImg?: string;
    /**
     * 身份证反面 Base64
     */
    idCardBImg?: string;
    /**
     * 购车发票 Base64
     */
    invoiceImg?: string;
    /**
     * 行驶证 Base64
     */
    licenceImg?: string;
    /**
     * 电话
     */
    phone?: string;
    /**
     * 车架号
     */
    vin?: string;
  }
}

