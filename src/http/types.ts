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

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

//默认请求设置
export type ConfigType = {
  // 请求域名
  baseUrl: string;
  // 请求头
  header: any;
  //方法
  method: Lowercase<RequestMethod> | RequestMethod;
  dataType: string;
  //'text'
  responseType: string;
  // 默认请求是否开启loading
  loading: boolean;
  loadingText:string;
  loadingMask:boolean;
  // 定时器
  timer?:any;
}

//请求参数配置
export type RequestOptions<T = any> = {
  [K in keyof ConfigType]?:ConfigType[K];
} & {
  complete?:(response:Result) => void
  url:string;
  params?:T;
}

type MaybeNull<T> = T | null
export type MethodType<T = any> = (options:RequestOptions) => any

//拦截器
export type InterceptorType = {
	// 请求前的拦截
  request?:MaybeNull<(options:RequestOptions) => any>;
	// 请求后的拦截
  response?:MaybeNull<(options:Result) => any>;
}
