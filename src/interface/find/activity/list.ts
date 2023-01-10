export interface Response {
  /**
   * 状态码
   */
  code: number;
  data?: Data;
  /**
   * 提示信息
   */
  msg: string;
  /**
   * 返回消息ID
   */
  swTraceId: string;
}

export interface Data {
  /**
   * 业务数据
   */
  dataList?: DataList[];
  page?: Page;
}

export interface DataList {
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
  endTime?: number;
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
  startTime?: number;
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户信息
   */
  userInfo: UserInfo;
}

/**
* 用户信息
*/
export interface UserInfo {
  /**
   * 称号
   */
  designation?: string;
  /**
   * 是否关注
   */
  follow?: number;
  /**
   * 用户头像
   */
  icon?: string;
  /**
   * 用户id
   */
  id?: string;
  /**
   * 佩戴的勋章ID
   */
  medalId?: number;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 佩戴的勋章图片
   */
  obtainMedalIcon?: string;
  /**
   * 等级图标
   */
  rankIcon?: string;
}

/**
* Page
*/
export interface Page {
  /**
   * 页码
   */
  pageIndex?: number;
  /**
   * 每页大小
   */
  pageSize?: number;
  /**
   * 总页数
   */
  pageTotal?: number;
  /**
   * 总记录数
   */
  totalCount?: number;
}
