export interface RequestOptions {
  url: string,
  noLogin?: boolean,
  loading?: boolean,
  noLoading?: boolean,
  data?: any,
  header?:object,
  loadingText?:string,
  loadingMask?:boolean,
}

export interface ResponseData<T> {
  code: number,
  msg: string,
  data: T,
  swTraceId: string
}

export type Result<T = any> = {
  code:number | string;
  data:T;
  //接口返回的错误信息
  msg:string;
  //微信返回的错误信息
  errMsg?:string;
  success?:boolean;
  statusCode?:number | string,
  loading?:boolean;
  errno?:string | number;
}
