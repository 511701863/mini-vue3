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
 * ClubAdd???_request
 */
 export interface ClubAdd {
  /**
   * ????????????
   */
  address: string;
  /**
   * ???code
   */
  areaCode: number;
  /**
   * ??????code
   */
  cityCode: number;
  /**
   * ??????????????????
   */
  contactPhone: string;
  /**
   * ?????????
   */
  dealerCode: string;
  /**
   * ?????????erp???
   */
  dealerErpCode: string;
  /**
   * ???????????????
   */
  dealerName: string;
  /**
   * ??????: 1??????2?????????
   */
  identity: 1 | 2;
  /**
   * ??????
   */
  introduction: string;
  /**
   * ??????????????????:1?????? 0?????????
   */
  joinIsExamine: 1 | 0;
  /**
   * logo???
   */
  logo: string;
  /**
   * ????????????ID
   */
  modelId: string;
  /**
   * ??????
   */
  name: string;
  /**
   * ????????????
   */
  pictures: string[];
  /**
   * ??????code
   */
  provinceCode: number;
  /**
   * ??????
   */
  sign: string;
  /**
   * ?????????
   */
  wechatNumber: string;
}
