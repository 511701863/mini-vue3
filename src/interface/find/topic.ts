import { UserinfoProps }from './problem';
// 话题
export interface topicList {
  coverPicture?: string,
  endTime?: string,
  hot?: number,
  id?: number,
  name?: string,
  relationContentNumber?: number,
  relationPersonNumber?: number,
  startTime?: string,
  status?: number,
}
export interface topicDetail{
  content?: string,
  coverPicture?: string,
  endTime?: Date,
  id?: number,
  name?: string,
  relationContentNumber?: number,
  relationPersonNumber?: number,
  startTime?: Date,
  status?: number,
}
export interface topicDetailList {
  browseNumber?: number,
  commentNumber?: number,
  commentUser?: UserinfoProps,
  contentType?: number,
  createTime?: number,
  dynamicWords?: string,
  highLight?: number,
  id?: string,
  latitude?: string,
  liked?: number,
  likeNumber?: number,
  longitude?: string,
  pictures?: any,
  positionName?: string,
  putOnStatus?: number,
  relationClub?: object[],
  relationTopic?: object[],
  rewardNumber?: number,
  shareNumber?: number,
  title?: string,
  updateTime?: string,
  video?: string,
  videoCover?: string,
}
export interface relationClub{
  id?: string;
  name?: string;
}
export interface relationTopic{
  id?: string,
  name?:string
}
