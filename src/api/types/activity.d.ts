// import { RequestParams } from 'import {post, get} from '@/http/index';
/types';
type Get<T extends Record<PropertyKey, any>, K> = K extends keyof T ? T[K] : K extends `${infer F}.${infer R}` ? (F extends keyof T ? Get<T[F], R> : never) : never;
interface Page {
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
interface UserInfoVo {
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
  id: string;
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
   * 等级icon
   */
  rankIcon?: string;
}

declare namespace ActivityDetail {
  /**
  * ActivityExteriorInfoVo，活动信息
  */
  interface ActivityExteriorInfoVo {
    /**
     * 活动名称
     */
    activityName?: string;
    /**
     * 活动状态（未开始、1进行中、2已结束）
     */
    activityStatus?: number;
    /**
     * 活动类型，线下固定为未知（0:未知 1投票活动、2裂变活动、3抽奖活动、4答题闯关）
     */
    activityType?: number;
    /**
     * 活动类型对应的值（投票主体//抽奖主体/题库)
     */
    activityTypeParam?: string;
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
     * 报名开始时间
     */
    enrollEndTime?: Date;
    /**
     * 报名人数
     */
    enrollNumber?: number;
    /**
     * 报名开始时间
     */
    enrollStartTime?: Date;
    /**
     * 按钮状态（1:活动未开始  2:立即报名;  3:现场签到;  4:晒图/去投票/参与活动/立即抽奖/开始答题; 5:活动已结束;  6:领取奖励;
     * 如果为4时，根据activityType来展示对应文案
     * 活动类型，线下固定为未知（0:线下  1投票活动、2裂变活动、3抽奖活动、4答题闯关）
     * activityType 0    文案展示：   晒图
     * activityType 1    文案展示：   去投票
     * activityType 2    文案展示：   参与活动
     * activityType 3    文案展示：   立即抽奖
     * activityType 4    文案展示：   开始答题
     */
    enrollStatus?: number;
    id?: number;
    /**
     * 是否热门
     */
    isHot?: number;
    /**
     * 是否推荐
     */
    isRecommend?: number;
    /**
     * 参与人数
     */
    joinNumber?: number;
    /**
     * 报名/参与用户列表
     */
    joinUserList?: JoinUserVo[];
    /**
     * 点赞数
     */
    likeNumber?: number;
    /**
     * 点赞状态（0:未点赞; 1:已点赞;
     */
    likeStatus?: number;
    /**
     * 上架状态（0:下架;1:已上架;）
     */
    publishStatus?: number;
    /**
     * 关联俱乐部id
     */
    relationClubId?: string;
    /**
     * 关联俱乐部名称
     */
    relationClubName?: string;
    /**
     * 关联话题id
     */
    relationTopicId?: string;
    /**
     * 关联话题名称
     */
    relationTopicName?: string;
    /**
     * 温馨提示
     */
    reminder?: string;
    /**
     * 奖励人数
     */
    rewardNumber?: number;
    /**
     * 发起人昵称
     */
    sponsorNickName?: string;
    /**
     * 发起人账号
     */
    sponsorPhone?: string;
    /**
     * 活动开始时间
     */
    startTime?: Date;
    /**
     * 用户类型，多个用逗号拼接（ 1:全部; 2:车主用户; 3:订车用户; 4:粉丝用户; ）
     */
    userTypes?: string;

    // 活动发起人信息
    userInfoVo?: UserInfoVo;

    signAddress?: string
    lat?: number
    lng?: number
  }

  /**
  * JoinUserVo
  */
  interface JoinUserVo {
    /**
     * 主键
     */
    id?: number;
    /**
     * 用户昵称
     */
    nickname?: string;
    /**
     * 用户头像
     */
    userIcon?: string;
    /**
     * 用户id
     */
    userId?: string;

    userInfoVo: UserInfoVo
  }

  // 晒图列表请求参数
  // interface ShowPictureQueryVo extends Get<Required<RequestParams>, 'data'>{
  interface ShowPictureQueryVo{
    activityId: number | string
    orderBy?: string
    orderSort?: string
    pageIndex: number
    pageSize: number
  }
  interface ShowPictureItemVo {
    /**
     * 晒图内容
     */
    content?: string;
    /**
     * 主键
     */
    id: number;
    /**
     * 晒图图片
     */
    pictures?: string;
    /**
     * 用户id
     */
    userId?: string;
    userInfo?: UserInfoVo;
  }
  interface ShowPictureVo {
    /**
     * 业务数据
     */
    dataList?: ShowPictureItemVo[];
    page?: Page;
  }
  interface JoinUserListVo {
    /**
     * 业务数据
     */
    dataList?: JoinUserVo[];
    page?: Page;
  }

  // 新增晒图 req body
  interface AddShowPictureReqBodyVo {
    /**
     * 活动id
     */
    activityId: number;
    /**
     * 内容
     */
    content?: string;
    /**
     * 图片(多张用逗号隔开)
     */
    pictures?: string;
    /**
     * 用户id
     */
    userId?: number;
  }
  interface UpOrCancelLikeReqBodyVo {
    /**
     * 活动id
     */
    activityId: number;
    cmd: number;
  }
  interface ActivityEnrollReqBodyVo {
    /**
     * 活动id
     */
     activityId?: number;
     /**
      * 活动名称
      */
     activityName?: string;
     /**
      * 联系方式
      */
     phone?: string;
     /**
      * 用户头像
      */
     userIcon?: string;
     /**
      * 用户姓名
      */
     username?: string;
  }
  interface ActivityCommentListReqQueryVo {
    activityId: number
    orderBy?: string
    orderSort?: string
    pageIndex: number
    pageSize: number
  }
  interface CommentItemReplyVo extends Omit<CommentItemVo, 'replyList'> {
      commentId?: number;
      commentNickname?: string;
      nickname?: string;
      // userInfoVo?: UserInfoVo;
    }
  interface CommentItemVo {
    content?: string;
    createTime?: number;
    id?: number;
    liked?: number;
    likeNum?: number;
    replyList?: CommentItemReplyVo[];
    userId?: string;
    userInfo?: UserInfoVo;
  }
  interface ActivityCommentListResponseVo {
    page: Page,
    dataList: CommentItemVo[]
  }
  interface ActivityCommentReplyReqBodyVo {
    /**
     * 活动id
     */
     entityId?: number;
     /**
      * 评论内容
      */
      content?: string;
      /**
      * 该评论的父级评论id(为0时表示评论，否则表示回复)
      */
      parentId?: number | string; // TODO: 类型确定
     /**
      * 该评论的id
      */
      replyCommentId?: number | string;
     /**
      * 被回复的对象id:userId
      */
      replyUserId?: number | string;
  }
  interface commentLikeReqBodyVo extends UpOrCancelLikeReqBodyVo {
    commentId?: number;
  }
  interface SignReqBodyVo {
    activityId?: number;
    /**
     * 签到地址纬度
     */
    lat?: number;
    /**
     * 签到地址经度
     */
    lng?: number;
    /**
     * 用户昵称
     */
    nickname?: string;
    /**
     * 用户头像
     */
    userIcon?: string;
    /**
     * 用户id
     */
    userId?: number;
  }

}
