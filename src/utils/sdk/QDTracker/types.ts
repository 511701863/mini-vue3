export interface QDTrackerType {
   init: (options: Init) => void
   setCommonData: SetCommonData
   track: Track
   getIDs: () => void
}


// 设置分享信息
// @param 必填appid 小程序appid
// @param 可选kfuin 主号
// @param 必填appkey 域名对应的appkey
// @param 必填useOpenId 是否使用Openid上报，默认为true
// @param 可选autoTrack.appLaunch onLaunch 是否自动上报 默认为true
// apiHost: 服务器地址 正式：https://v.qidian.qq.com
// @param 可选autoTrack.appShow 小程序onShow 是否自动上报 默认为true
// 在小程序生命周期外初始化
interface Init {
  appid: string, //必填appid 小程序appid
  appkey: string,
  apiHost: string,
  application: string,
  // 如果使用openid上报，需要自己调用setOpenid(1.0.0版本，之后版本已经弃用，直接在setCommonData.params2中设置)
  // 设置了之后需要等待setCommonData设置了之后再进行上报
  useOpenId: boolean,
  autoTrack: {
    appLaunch: boolean, //onLaunch 是否自动上报
    appShow: boolean, //小程序onShow 是否自动上报
    appHide: boolean,
    pageShow: boolean, //小程序页面onShow是否自动上报
    pageHide: boolean,
    pageShare: boolean,
    share: boolean
  }
}

interface SetCommonData {
  (params1: object, params2: object): void
  // params1 设置properties中的通用属性，格式如下{company:1,name:222}
  // params2 设置properties平级的通用属性，格式如下{openid:'my_system_id',unionid:'unionid',bussid:'bussid'},业务账号bussid, openid, unionid在此处设置
  // 上报自定义事件
  // 调用这个方法同样可以上报 $MPLaunch 等事件，注意！不要重复上报
  // 使用自定义事件上报功能可以通过该事件接口，来记录和上报用户关键事件，事件名和属性名要与配置的名称一致
}

interface Track {
  (eventName: string, params: object): void
  // eventName 事件名
  // params 扩展字段参数，格式如下{name:'da',age:111}
}
