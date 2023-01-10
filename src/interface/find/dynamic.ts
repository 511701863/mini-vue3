import { UserinfoProps } from './problem';
export interface dynamicDetail {
  browseNumber?: number,
  commentNumber?: number,
  commentUser?: UserinfoProps,
  dynamicUser?:UserinfoProps,
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
  collectionNumber?: number,
  collection?:number,
  relationCarSeries?:any
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
export interface modelListProps {
  id?: number,
  seriesShowName?: string,
  seriesCode?: string,
  name?:string
}
