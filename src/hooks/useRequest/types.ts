import { ResponseData } from '@/http/types';
import { ComputedRef, WatchSource, Ref } from 'vue';

export interface Response<T> {
  status: number;
  data: T;
  msg: string;
}
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
export type GetPromiseValue<T> = T extends Promise<infer P> ? GetPromiseValue<P> : T;
export type AppAxiosResponse<T = any> = ResponseData<T> & {data:any};

export interface HttpError<T = any> {
  status: number | string;
  data: T;
  mag: string;
}

export type Service<T, P extends any[]> = (...args: P) => Promise<ResponseData<T>>;

export interface Options<T, P extends any[]> {
  // 是否手动发起请求
  manual?: boolean;

  // 当 manual 为 false 时，自动执行的默认参数
  defaultParmas?: P;

  // 依赖项更新
  refreshDeps?: WatchSource<any>[];
  refreshDepsParams?: ComputedRef<P>;

  // 是否关闭重复请求，当 queryKey 存在时，该字段无效
  repeatCancel?: boolean;

  // 并发请求
  queryKey?: (...args: P) => string;

  // 成功回调
  onSuccess?: (response: AppAxiosResponse<T>, params: P) => void;

  // 失败回调
  onError?: (err: HttpError, params: P) => void;

  //最终回调
  onFinally?:(params: P) => void;
  //是否启用loading
  // loading?:boolean;
}

export interface Result<T = any> {
  data: T | null;
  loading?: boolean;
  cancel?: any;
  err?: HttpError;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  interface Promise{
    cancel: any;
  }
}
