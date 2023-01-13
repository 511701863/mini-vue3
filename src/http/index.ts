import { getEnv } from '@/config';
import { RequestOptions, ResponseData } from './types';
import errorHandle from './errorHandle';

type MethodType = UniNamespace.RequestOptions['method']

let requestNum = 0; // 请求次数
let showLoading = false; // loading 状态
function createRequest(method: MethodType) {
  return async function <T>(options: RequestOptions):Promise<any>{
    return new Promise(async (resolve, reject) => {
      //请求拦截器
      // 添加loading
      if (options.loading) {
        requestNum++;
        // 请求队列中，是第一个请求时，创建loading
        if (requestNum === 1) {
          showLoading = true; // loading 状态
          uni.showLoading({
            title: options.loadingText || '努力加载中',
            mask: options.loadingMask
          });
        }
      }
      const header = {
        cookie: uni.getStorageSync('COOKIE'),
        userId: 12345
      };
      uni.request({
        url: getEnv().baseURL + options.url,
        data: options.data,
        method,
        header: Object.assign(header, options.header),

        success: (res) => {
          const data = res.data as ResponseData<T>;

          //成功响应拦截
          if (res.header['Set-Cookie'] || res.header['set-cookie']) {
            uni.setStorageSync('COOKIE', res.header['Set-Cookie'] || res.header['set-cookie']);
          }
          if ([0, 200].includes(data.code)) {
            resolve(data);
          } else {
            errorHandle(data);
            reject(data);
          }
        },
        fail: (res: any) => {
          // uni.showToast({
          //   title: `请求失败 ${res.status}`,
          //   icon: 'error',
          //   duration: 2000
          // });
          errorHandle(res);
          reject(res);
        },
        complete: (response) => {
          // 关闭 Loading
          if (options.loading) {
            //全局线程栈 必须全部走完才关闭loading
            requestNum--;
            if (requestNum === 0) {
              if (showLoading) {
                showLoading = false;
                uni.hideLoading();
              }
            }
          }
        }
      });
    });
  };
}
export const get = createRequest('GET');
export const post = createRequest('POST');
