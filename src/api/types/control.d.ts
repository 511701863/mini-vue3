declare namespace Control {
  /**
  * 位置服务
  */
  export interface VehicleLocationAo {
    /**
     * 纬度
     */
    latitude?: number;
    /**
     * 经度
     */
    longitude?: number;
    /**
     * 更新时间
     */
    updateTime?: number;
  }
  /**
 * RemoteOperationRecordRespAo，业务数据
 */
  export interface CheckResType {
    /**
     * 创建时间
     */
    createTime?: number;
    /**
     * 创建人
     */
    creator?: string;
    /**
     * 失败原因
     */
    failureReason?: string;
    /**
     * 完成时间
     */
    finishTime?: number;
    /**
     * 远控状态
     */
    operationStatus?: OperationStatus;
    /**
     * 远控类型
     */
    operationType?: OperationType;
    /**
     * 操作人
     */
    operator?: string;
    /**
     * 远控记录ID
     */
    recordId?: string;
    /**
     * 请求负载
     */
    requestPayload?: string;
    /**
     * 响应负载
     */
    responsePayload?: string;
    /**
     * 更新人
     */
    updater?: string;
    /**
     * 更新时间
     */
    updateTime?: number;
    /**
     * 车辆vin
     */
    vin?: string;
  }

  /**
  * 远控状态
  */
  export enum OperationStatus {
    Awaking = 'AWAKING',
    Failed = 'FAILED',
    Init = 'INIT',
    Ongoing = 'ONGOING',
    Success = 'SUCCESS',
    Timeout = 'TIMEOUT',
  }

  /**
  * 远控类型
  */
  export enum OperationType {
    AC = 'AC',
    Alarm = 'ALARM',
    Door = 'DOOR',
    Engine = 'ENGINE',
    FindCar = 'FIND_CAR',
    Light = 'LIGHT',
    SeatHeating = 'SEAT_HEATING',
    SeatVentilation = 'SEAT_VENTILATION',
    StolenAlarm = 'STOLEN_ALARM',
    SunRoof = 'SUN_ROOF',
    Truck = 'TRUCK',
    Window = 'WINDOW',
  }
  /**
 * VehiclLoveAo，_request
 */
  export interface VehiclLoveAo {
    /**
     * 认证状态：1：未实名，2：认证中，3：认证成功，-1：认证失败
     */
    authState?: number;
    bcallphone?: string;
    /**
     * 蓝牙状态,-1:未生效，0:未使用,1:使用中,2:已撤销,3:已过期,4:已冻结,5:已失效
     */
    bluKeyStatus?: number;
    /**
     * 车牌号
     */
    carLicense?: string;
    /**
     * tbox-iccid
     */
    iccid?: string;
    /**
     * 是否有蓝牙能力
     */
    isBlueAbility?: boolean;
    /**
     * 是否是授权车辆
     */
    isGrant?: boolean;
    /**
     * 车型图片
     */
    modelImage?: string;
    /**
     * 车型简称
     */
    modelShowName?: string;
    vehicleCondition?: VehicleCondition;
    /**
     * VIN码
     */
    vin?: string;
  }

  /**
  * VehicleCondition
  */
  export interface VehicleCondition {
    /**
     * 电动空调温度档位
     */
    acGear?: string;
    /**
     * 极速降温-是否打开
     */
    acHeatDownSts?: boolean;
    /**
     * 极速升温-是否打开
     */
    acHeatUpSts?: boolean;
    /**
     * 空调温度
     */
    acTemp?: string;
    /**
     * 空调-是否打开
     */
    acWorkingSts?: boolean;
    /**
     * 空气净化-是否打开
     */
    airCleanSts?: boolean;
    /**
     * 充电状态,0:未充电；1：加热中；2：充电加热中；3：充电中；4：充电完成（充满）；5：充电完成（充电过程中取消或充电时间到）
     */
    chargerSts?: number;
    /**
     * 门锁-是否打开
     */
    doorSts?: boolean;
    /**
     * 发动机-是否打开
     */
    engineSts?: boolean;
    /**
     * 前除霜-是否打开
     */
    frontDefrostSts?: boolean;
    /**
     * 纬度
     */
    latitude?: number;
    /**
     * 左前轮胎压 单位：bar
     */
    lfPsi?: string;
    /**
     * 主驾加热-是否打开
     */
    lfSeatHeatSts?: boolean;
    /**
     * 主驾通风-是否打开
     */
    lfSeatVentilateSts?: boolean;
    /**
     * 左前轮胎温度 单位：℃
     */
    lfTemperature?: string;
    /**
     * 经度
     */
    longitude?: number;
    /**
     * 左后轮胎压 单位：bar
     */
    lrPsi?: string;
    /**
     * 左后轮胎温度 单位：℃
     */
    lrTemperature?: string;
    /**
     * 续航里程 KM
     */
    mileage?: string;
    /**
     * 剩余油量/电量（百分比）
     */
    oil?: string;
    /**
     * 上报位置
     */
    reportAddress?: string;
    /**
     * 上报时间
     */
    reportTime?: number;
    /**
     * 右前轮胎压 单位：bar
     */
    rfPsi?: string;
    /**
     * 副驾加热-是否打开
     */
    rfSeatHeatSts?: boolean;
    /**
     * 副驾通风-是否打开
     */
    rfSeatVentilateSts?: boolean;
    /**
     * 右前轮胎温度 单位：℃
     */
    rfTemperature?: string;
    /**
     * 右后轮胎压 单位：bar
     */
    rrPsi?: string;
    /**
     * 右后轮胎温度 单位：℃
     */
    rrTemperature?: string;
    /**
     * 天窗状态：-1无响应，0全关，1全开，2翘起
     */
    srfOperateSts?: number;
    /**
     * 后备箱-是否打开
     */
    trunkSts?: boolean;
    /**
     * 车窗状态：-1无响应，0全关，1全开，2通风
     */
    windowSts?: number;
  }
  export interface AbilityVo {
    abilityCollections: {/**
    * 能力
    */
      ability?: string;
      /**
       * 能力名称
       */
      abilityName?: string;
    }[]
  }
}
