import { inject } from 'vue';
import { BeforeGuard, RouteOptions, Router, RouterOptions } from './types';

const ROUTER_KEY = Symbol('router');

export function createRouter(options: RouterOptions) {
  const { routes } = options;
  const beforeGuards: BeforeGuard[] = [];

  function getPath(path: string) {
    if(!path) {
      return '';
    }
    return path.charAt(0) === '/' ? path : `/${path}`;
  }

  function getRoute(options: RouteOptions) {
    if(options?.url) {
      return routes?.find((item) => getPath(item.path) === getPath(options.url || ''));
    }
    if(options.name) {
      return routes?.find((item) => item.name === options.name);
    }
    return null;
  }

  function formatQuery(query: Record<string, any>) {
    let str = '';
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        str += `${key}=${value}&`;
      }
    }
    return str && `?${str.slice(0, -1)}`;
  }

  function getToAndFrom(options: RouteOptions) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const to = getRoute(options);
    const from = getRoute({ url: currentPage.route as any });
    return {
      to: {
        ...to,
        ...options
      },
      from
    };
  }

  function beforeEach(guard: BeforeGuard) {
    beforeGuards.push(guard);
  }

  async function navigate(
    type: 'navigateTo' | 'redirectTo' | 'switchTab' | 'navigateBack' |'reLaunch',
    options: RouteOptions
  ) {
    const { to, from } = getToAndFrom(options);
    const params = {
      ...options,
      url: `${getPath(to.path)}${formatQuery(options.query || {})}`
    };
    await next({ to, from });
    return uni[type](params as any);
  }

  function navigateTo(options: RouteOptions) {
    return navigate('navigateTo', options);
  }

  function redirectTo(options: RouteOptions) {
    return navigate('redirectTo', options);
  }
  function switchTab(options: RouteOptions) {
    return navigate('switchTab', options);
  }
  function navigateBack(options: RouteOptions) {
    return navigate('navigateBack', options);
  }
  function reLaunch (options: RouteOptions) {
    return navigate('reLaunch', options);
  }
  function next({ to, from }: any) {
    let i = 0;
    return new Promise((resolve, reject) => {
      const _next: any = (options?: RouteOptions | boolean) => {
        if(options && Object.prototype.toString.call(options) === '[object Object]') {
          navigateTo(options as RouteOptions);
          return reject('拦截跳转');
        }
        if(options === false) {
          return reject('终止跳转');
        }
        const task = beforeGuards[i++];
        if(!task) {
          return resolve(true);
        }
        return new Promise((next) => {
          task(to, from, next);
        }).then(_next).catch(reject);
      };
      _next();
    });
  }

  const router: Router = {
    routes: options.routes,
    navigateTo,
    switchTab,
    redirectTo,
    navigateBack,
    reLaunch,
    beforeEach,
    install(app) {
      app.provide(ROUTER_KEY, router);
    }
  };

  return router;
}

export function useRouter() {
  return inject(ROUTER_KEY) as Router;
}
