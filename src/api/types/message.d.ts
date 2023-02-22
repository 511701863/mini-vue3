declare namespace Message {
  export interface AppUnReadMsgRecordEntity {
    id?: string;
    /**
     * 保养提醒的未读消息数量
     */
    maintainRemindCount?: number;
    /**
     * 故障提醒的未读消息数量
     */
    malfunctionRemindCount?: number;
    /**
     * 流量提醒的未读消息数量
     */
    mobileDataRemindCount?: number;
    /**
     * 通知消息的未读消息数量
     */
    noticeCount?: number;
    /**
     * 系统消息的未读消息数量
     */
    systemCount?: number;
    /**
     * userId
     */
    userId?: string;
    /**
     * 告警提醒的未读消息数量
     */
    warningRemindCount?: number;
  }
  export interface MessageInfoAo {
    /**
     * 实际发送时间
     */
    actualSendTime?: number;
    /**
     * 消息内容
     */
    content?: string;
    /**
     * 子任务ID
     */
    metaTaskId?: string;
    /**
     * 消息业务类型
     */
    msgBizType?: MsgBizType;
    /**
     * 消息模块. 默认值：系统消息
     */
    msgModel?: MsgModel;
    /**
     * 跳转参数
     */
    params?: { [key: string]: any };
    /**
     * 任务id
     */
    recordId?: string;
    /**
     * 状态.(成功或失败)
     */
    state?: State;
    /**
     * 标题
     */
    title?: string;
  }
  /**
 * 状态.(成功或失败)
 */
export enum State {
  Fail = 'FAIL',
  Finish = 'FINISH',
  Handling = 'HANDLING',
  Init = 'INIT',
  Sending = 'SENDING',
}
  /**
 * 消息业务类型
 */
  export enum MsgBizType {
    AccreditRemind = 'ACCREDIT_REMIND',
    ActiveChecking = 'ACTIVE_CHECKING',
    AppointmentOutTimeRemind = 'APPOINTMENT_OUT_TIME_REMIND',
    AppointmentRemind = 'APPOINTMENT_REMIND',
    CancelAccredit = 'CANCEL_ACCREDIT',
    CancelAppointmentRemind = 'CANCEL_APPOINTMENT_REMIND',
    CancelKeys = 'CANCEL_KEYS',
    CancelMobileDataLimitSpeed = 'CANCEL_MOBILE_DATA_LIMIT_SPEED',
    ExpireRemind = 'EXPIRE_REMIND',
    FenceWarning = 'FENCE_WARNING',
    FinishMaintenanceRemind = 'FINISH_MAINTENANCE_REMIND',
    FirstMaintenanceRemind = 'FIRST_MAINTENANCE_REMIND',
    FreeMaintenanceRemind = 'FREE_MAINTENANCE_REMIND',
    KeyExpire = 'KEY_EXPIRE',
    MalfunctionRemind = 'MALFUNCTION_REMIND',
    MobileDataEarlyWarning = 'MOBILE_DATA_EARLY_WARNING',
    MobileDataExpire = 'MOBILE_DATA_EXPIRE',
    MobileDataLimitSpeed = 'MOBILE_DATA_LIMIT_SPEED',
    None = 'NONE',
    OtaUpgradeRemind = 'OTA_UPGRADE_REMIND',
    OtaUpgradeResult = 'OTA_UPGRADE_RESULT',
    QualityMaintenanceRemind = 'QUALITY_MAINTENANCE_REMIND',
    ShareKeys = 'SHARE_KEYS',
    TermlyMaintenanceRemind = 'TERMLY_MAINTENANCE_REMIND',
    TirePressureWarning = 'TIRE_PRESSURE_WARNING',
    UnlockingException = 'UNLOCKING_EXCEPTION',
    UpgradeRemind = 'UPGRADE_REMIND',
    UpgradeResult = 'UPGRADE_RESULT',
  }

  /**
  * 消息模块. 默认值：系统消息
  */
  export enum MsgModel {
    MaintainRemind = 'MAINTAIN_REMIND',
    MalfunctionRemind = 'MALFUNCTION_REMIND',
    MobileDataRemind = 'MOBILE_DATA_REMIND',
    Notice = 'NOTICE',
    System = 'SYSTEM',
    WarningRemind = 'WARNING_REMIND',
  }

}
