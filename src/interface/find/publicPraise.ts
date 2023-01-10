import { UserinfoProps } from './problem';
export type DataList = Data[]

export interface Data {
  /**
   * 浏览数
   */
  browseNumber?: number;
  /**
   * 购车城市
   */
  buyCarCity?: number;
  /**
   * 购车城市
   */
  buyCarCityName?: string;
  /**
   * 购车地区
   */
  buyCarDistrict?: number;
  /**
   * 购车地区
   */
  buyCarDistrictName?: string;
  /**
   * 购车省份
   */
  buyCarProvince?: number;
  /**
   * 购车省份
   */
  buyCarProvinceName?: string;
  /**
   * 购车时间
   */
  buyCarTime?: Date;
  /**
   * 收藏数量
   */
  collectionNumber?: number;
  /**
   * 评论数
   */
  commentNumber?: number;
  /**
   * C端-创建人id
   */
  createId?: number;
  /**
   * 创建人手机号
   */
  createPhone?: string;
  /**
   * C端-创建时间
   */
  createTime?: number;
  createUser?: UserInfo;
  /**
   * 经销商代码
   */
  dealerCode?: string;
  /**
   * 经销商名称
   */
  dealerName?: string;
  /**
   * 审核备注
   */
  examineRemark?: string;
  /**
   * 审核状态: 0.待审核 1.已通过 2.不通过
   */
  examineStatus?: number;
  /**
   * 期待改进
   */
  expectImprovement?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 是否收藏 1：是 0：否
   */
  isCollect?: number;
  /**
   * 是否精华 1：是 0：否
   */
  isHighLight?: number;
  /**
   * 是否推荐 1:是  0：否
   */
  isRecommend?: number;
  /**
   * 是否置顶 1：是 0：否
   */
  isTop?: number;
  /**
   * 点赞状态(1已点赞，-1未点赞)
   */
  liked?: number;
  /**
   * 点赞数
   */
  likeNumber?: number;
  /**
   * 最满意
   */
  mostSatisfied?: string;
  /**
   * 图片
   */
  pictures?: string[];
  /**
   * 上架状态 1：上架 0：下架
   */
  putOnStatus?: number;
  /**
   * 评分记录
   */
  reputationScoreRecordVoList?: score[];
  /**
   * 分享数
   */
  shareNumber?: number;
  /**
   * 综合评分
   */
  synthesizeScore?: number;
  /**
   * C端-更新时间
   */
  updateTime?: Date;
  /**
   * 车系code
   */
  vehicleSeriesCode?: string;
  /**
   * 车系主图
   */
  vehicleSeriesImg?: string;
  /**
   * 车系名称
   */
  vehicleSeriesName?: string;
  /**
   * 车架号
   */
  vin?: string;
}

/**
 * 口碑评分记录VO
 */
export interface score {
  /**
   * 评价
   */
  comment: string;
  /**
   * 评分
   */
  score: number;
  /**
   * 评分类型 1：空间 2：驾驶感受 3：外观 4：内饰 5：服务 6：油耗 7：配置
   */
  scoreType: number;
}

/**
 * 用户信息
 */
export interface UserInfo {
  designation?: string;
  follow?: number;
  icon?: string;
  id?: string;
  medalId?: number;
  nickname?: string;
  obtainMedalIcon?: string;
  rankIcon?: string;
  applyReason?: string,
  roleCode?: number
}

export interface modelListProps {
  id?: number,
  seriesShowName?: string,
  seriesCode?: string,
  name?:string
}
export interface commentList {
  commentUser?: UserinfoProps;
  content?: string;
  createTime?: number;
  highLight?: number;
  id?: string;
  liked?: number;
  likeNumber?: number;
  subRecords?: any;
}
