export type AppConfig = {
  baseURL:string;
  etcAppid:string;
  baseH5:string;
  pinTime:number;
  pinShow:boolean;
  pinFocus:boolean;
  ENV:string;
  timer:any;
  pin:'',
  params:any,
  callBack:(...arg:any[])=>any;
}

export type StorageType = {
  [key: string]: string | boolean
}
export type EnvType = 'uat' | 'dev' | 'prod'
