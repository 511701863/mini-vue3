export interface myClubList {
  activityNumber?: number,
  createId?: number,
  examineStatus?: number,
  id?: string,
  introduction?: string,
  joinIsExamine?: number,
  joinStatus?: number,
  logo?: string,
  memberNumber?: number,
  name?: string,
  provinceCityArea?: string,
  putOnStatus?: number,
  sign:string
}
export interface ClubLIst {
  activityNumber?: number,
  createId?: number,
  examineStatus?: number,
  id?: string,
  introduction?: string,
  joinIsExamine?: number,
  joinStatus?: number,
  logo?: string,
  memberNumber?: number,
  name?: string,
  provinceCityArea?: string,
  putOnStatus?: number,
  sign?: string
}
export interface ClubDetail {
  address?: string,
  applyMemberNumber?: number,
  area?: string,
  areaCode?: number,
  city?: string,
  cityCode?: number,
  contactPhone?: string,
  createId?: number,
  creatorOrNot?: boolean,
  dealerCode?: string,
  dealerErpCode?: string,
  dealerName?: string,
  examineRemark?: string,
  examineStatus?: number,
  groupId?: string,
  groupLeader?: {
    icon: string,
    nickname:string
  },
  id?: string,
  identity?: number,
  introduction?: string,
  joinIsExamine?: number,
  joinStatus?: number,
  logo?: string,
  memberLogo?: string[],
  memberNumber?: number,
  name?: string,
  pictures?: string[],
  province?: string,
  provinceCode?: number,
  putOnStatus?: number,
  role?: number,
  sign?: string,
  status?: number,
  wechatNumber?: string,
  createTime?:number
}
export interface clubUserList {
  applyReason?: string,
  designation?: string,
  follow?: number,
  icon?: string,
  id?: string,
  medalId?: number,
  nickname?: string,
  obtainMedalIcon?: string,
  rankIcon?: string,
  roleCode?: number,
  checkout?:boolean
}
export interface IJoinClub{
  activityNumber?: number,
  createId?: number,
  examineStatus?: number,
  id?: string,
  introduction?: string,
  joinIsExamine?: number,
  joinStatus?: number,
  logo?: string,
  memberNumber?: number,
  name?: string,
  provinceCityArea?: string,
  putOnStatus?: number,
  sign?:string
}
export interface swiperList{
  coverPicture:string,
  jumpParameterPath:string,
  type:number
}
/**
 * ClubAdd，_request
 */
 export interface ClubAdd {
  /**
   * 详细地址
   */
  address: string;
  /**
   * 区code
   */
  areaCode: number;
  /**
   * 城市code
   */
  cityCode: number;
  /**
   * 联系人手机号
   */
  contactPhone: string;
  /**
   * 经销商
   */
  dealerCode: string;
  /**
   * 经销商erp码
   */
  dealerErpCode: string;
  /**
   * 经销商名称
   */
  dealerName: string;
  /**
   * 身份: 1个人2经销商
   */
  identity: 1 | 2;
  /**
   * 简介
   */
  introduction: string;
  /**
   * 加入是否审核:1审核 0不审核
   */
  joinIsExamine: 1 | 0;
  /**
   * logo图
   */
  logo: string;
  /**
   * 兴趣车型ID
   */
  modelId: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 多张图片
   */
  pictures: string[];
  /**
   * 省份code
   */
  provinceCode: number;
  /**
   * 签名
   */
  sign: string;
  /**
   * 微信号
   */
  wechatNumber: string;
}
