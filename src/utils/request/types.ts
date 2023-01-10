export interface RequestParams {
  url: string,
  noLogin?: boolean,
  noLoading?: boolean,
  data?: any,
}

export interface ResponseData<T> {
  code: number,
  msg: string,
  data: T,
  swTraceId: string
}
