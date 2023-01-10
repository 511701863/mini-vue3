/**
 * ActivityHomeVo, _response
 */
 export interface ActivityHomeVo {
  beforePeriod: ActivityExteriorListVo;
  hotList: ActivityExteriorListVo[];
  localCity: ActivityExteriorListVo;
  /**
   * 推荐
   */
  recommendList: ActivityExteriorListVo[];
}

/**
* ActivityExteriorListVo, _response
*/
export interface ActivityExteriorListVo {
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 活动状态（0未开始、1进行中、2已结束）
   */
  activityStatus?: number;
  /**
   * 活动类型，线下固定为未知（0:线下 1投票活动、2裂变活动、3抽奖活动、4答题闯关）
   */
  activityType?: number;
  /**
   * 浏览人数
   */
  browseNumber?: number;
  /**
   * 活动城市
   */
  city?: string;
  /**
   * 评论数
   */
  commentNumber?: number;
  /**
   * 活动详情
   */
  content?: string;
  /**
   * 封面图
   */
  coverPicture?: string;
  /**
   * 结束时间
   */
  endTime?: Date;
  /**
   * 报名人数
   */
  enrollNumber?: number;
  /**
   * 报名状态（0:立即报名; 1:立即参加; 2:已报名; 3:活动已结束;
   */
  enrollStatus?: number;
  id?: number;
  /**
   * 参与人数
   */
  joinNumber?: number;
  /**
   * 点赞数
   */
  likeNumber?: number;
  /**
   * 活动开始时间
   */
  startTime?: Date;
}
