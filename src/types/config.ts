export type AppConfig = {
  appid:string;
  baseURL:string;
  etcAppid:string;
  baseH5:string;
  pinTime:number;
  pinShow:boolean;
  pinFocus:boolean;
  ENV:string;
  callBack:(...arg:any[])=>any;
}

export type StorageType = {
  [key: string]: string | boolean
}
export type EnvType = 'uat' | 'dev' | 'prod'
