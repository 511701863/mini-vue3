import { App } from 'vue';
import { pages, subPackages } from './routes/index';
export type pagesPaths = (typeof pages)[number]['path']
export type RoutesNamesType = (typeof subPackages)[number]['pages'][number]['name'] | (typeof pages)[number]['name']
export type SubPackagesPaths = `${(typeof subPackages)[number]['root']}/${(typeof subPackages)[number]['pages'][number]['path']}`

export interface RouterOptions {
  routes?: any[]
}

export type RouteOptions = Omit<UniNamespace.NavigateToOptions, 'url'> & {
  url?: SubPackagesPaths | pagesPaths;
  name?: RoutesNamesType;
  query?: Record<string, any>;
  delta?:number;
}

export interface BeforeGuard {
  (to: any, from: any, next: (options?: RouteOptions | boolean) => void): void;
}

export interface Router {
  routes?: any[];
  beforeEach(guard: BeforeGuard): void;
  navigateTo(options: RouteOptions): void;
  redirectTo(options: RouteOptions): void;
  switchTab(options: RouteOptions): void;
  navigateBack(options: RouteOptions): void;
  reLaunch(options: RouteOptions): void;
  install(app: App): void;
}
//深层去除readonly
// export type DeepRemoveReadonly<T extends object> = {
//   -readonly[K in keyof T]: T[K] extends object ? DeepRemoveReadonly<T[K]> : T[K];
// }
// type SubPackagesTypes = {
//   root:string,
//   pages:{path:string, name:string, style:any}[]
// }
// type JoinRoutesPath<T extends SubPackagesTypes> =
// T extends {root:`${infer R}`, pages:{path:`${infer N}`}[]} ? {root:R, pages:{path:`${R}/${N}`}[]} : []

// type SubPackagesPaths = JoinRoutesPath<DeepRemoveReadonly<RoutesNamesType>>['pages'][number]['path']

// type test = `${RoutesNamesType2[number]['root']}/${RoutesNamesType2[number]['pages'][number]['path']}`
