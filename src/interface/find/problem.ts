export interface CommonProblemProps {
  id?: string,
  name?: string
}
export interface QuestionTypeProps {
  questionTypeName?: string,
  questionType?: number
}
export interface UserinfoProps{
  designation?: string;
  follow?: number;
  icon?: string;
  id?: string;
  medalId?: number;
  nickname?: string;
  obtainMedalIcon?: string;
  rankIcon?: string;
}
export interface HotListProps {
  adopt?: number,
  answerNumber?: number,
  browseNumber?: number,
  likeNumber?: number,
  likeStatus?:number,
  collectionNumber?: number,
  collectionStatus:number,
  content?: string,
  createId?: number,
  createTime?: number,
  popularCurrency:number,
  modelList?: modelListProps[],
  questionTypeList?: QuestionTypeProps[],
  examineRemark?: string,
  id?: string,
  integral?: number,
  modelId?: string,
  modelName?: string,
  pictures?: string[],
  questionType?: number,
  questionTypeName?: string,
  status?: number,
  answerInfoVo?: any,
  questionUser?: UserinfoProps
}
export interface replyListProps{
  content?: string;
  createTime?: number;
  id?: number,
  replyStatus?: number,
  replyUserId?: string,
  replyUserName?:string,
  userInfo?: UserinfoProps
}
export interface AnswerListProps {
  adopt?: number,
  content?: string,
  createTime?: number,
  id?: number,
  pictures?: string[],
  replyList?: replyListProps[],
  userInfo?: UserinfoProps
}
export interface modelListProps{
  id?: number | string,
  seriesShowName?: string,
  seriesCode?: string,
  name?:string
}
export interface releaseQuestionProps{
  content?: string,
  modelId?: number,
  modelName?: string,
  questionType?: string,
  popularCurrency?: number,
  integral?:number,
  pictures:any
}

export interface myQuestionProps {
  id?: string,
  createId?: number,
  type?: number,
  content?: string,
  number?:string,
  createTime?:number
}
