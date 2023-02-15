import { RoutesNamesType } from '../../router/types';
export type CarInfo={
  mile:string,
  value:string,
  label:string,
  electricity:string,
}

export type controlItem = {
  name:string;
  checkSrc:string;
  src:string;
  routerName?:RoutesNamesType;
  check:boolean;
  id?:number | string
}
