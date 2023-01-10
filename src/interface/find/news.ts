import { UserinfoProps } from './problem';
export interface aboutPopular {
  categoryName?: string,
  categoryType?: number,
  coverPicture?: string,
  createTime?: Date,
  describe?: string,
  id?: string,
  newsCount?: number,
  sort?: number,
}
export interface albumList {
  categoryName?: string,
  categoryType?: number,
  coverPicture?: string,
  describe?: string,
  id?: number,
  pictureUrls?: string[],
  sort?: number,
}
export interface hotNewsList {
  browseNumber?: number,
  categoryId?: number,
  categoryName?: string,
  categoryType?: number,
  commentNumber?: number,
  content?: any,
  coverPicture?: string,
  createTime?: string,
  examineRemark?: string,
  examineStatus?: number,
  id?: number,
  isTop?: number,
  likeNumber?: number,
  name?: string,
  putOnStatus?: number,
  shareNumber?: number,
  title?: string
}
export interface newDetail{
  browseNumber?: number,
  categoryId?: number,
  categoryName?: string,
  commentNumber?: number,
  content?: { [key: string]: any },
  coverPicture?: string,
  createTime?: number,
  createUser?: UserinfoProps,
  dataSource?: number,
  id?: string,
  isTop?: number,
  liked?: number,
  likeNumber?: number,
  shareNumber?: number,
  sort?: number,
  title?: string,
  collectionNumber?: number,
  isCollect?: number,
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
