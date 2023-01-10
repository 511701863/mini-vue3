import { App } from 'vue';

export interface RouterOptions {
  routes?: any[]
}

export type RouteOptions = Omit<UniNamespace.NavigateToOptions, 'url'> & {
  url?: string;
  name?: string;
  query?: Record<string, any>;
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

