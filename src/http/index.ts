import HTTP from './http';
import { RequestOptions, Result } from './types';
import errorHandle from './errorHandle';

const instance = new HTTP();
const requestConfig = {
  baseUrl: 'https://lqdm-app-dev.dflzm.com/customer'
};
instance.setConfig( requestConfig );
// 请求拦截配置项
const LoadingDelayTime = 0; // showLoading 延迟时间
let requestNum = 0; // 请求次数
let showLoading = false; // loading 状态
let loadingTimer: any = null; // showLoading 定时器
const RedirectTimer: any = null; // 重新登录 定时器

//请求拦截器
instance.interceptor.request = (config: RequestOptions) => {
  // 添加loading
  if (config.loading) {
    requestNum++;
    // 请求队列中，是第一个请求时，创建loading
    if (requestNum === 1) {
      loadingTimer = setTimeout(() => {
        showLoading = true;
        uni.showLoading({
          title: config.loadingText,
          mask:config.loadingMask
        });
      }, LoadingDelayTime);
    }
  }
  //添加token
  config.header.token = '1234567';
  return config;
};

// 响应拦截器
instance.interceptor.response = (response: Result) => {
  console.log(response);

  // 关闭 Loading
  if (response.loading) {
    //全局线程栈 必须全部走完才关闭loading
    requestNum--;
    if (requestNum === 0) {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
      if (showLoading) {
        showLoading = false;
        uni.hideLoading();
      }
    }
  }
  // 成功回调
  if (response.statusCode === 200) {
    const {
      code,
      message
    } = response.data;
    if (code !== 200 && code !== 0) {
      errorHandle(response.data);
      return false;
    }
    return response;
  } else {
  // 失败回调
    errorHandle(response);
    return false;
  }
};
//GET请求
export function get( {
	url,
	params = {},
	loading = true,
	header = {},
  loadingText = '正在请求',
  loadingMask = true
}:RequestOptions ) {
	return instance.get( {url, params, loading, header, loadingText, loadingMask});
}
//POST请求
export function post( {
	url,
	params = {},
	loading = true,
	header = {},
  loadingText = '正在请求',
  loadingMask = true
}:RequestOptions ) {
	return instance.post( {url, params, loading, header, loadingText, loadingMask} );
}
