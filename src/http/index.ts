import { RequestOptions, ResponseData } from './types';
import errorHandle from './errorHandle';
import { useConfig } from '@/store/modules/config';
import { json } from 'stream/consumers';

const {getBaseUrl, config} = useConfig();
type MethodType = UniNamespace.RequestOptions['method']
//小程序冷启动时 获取storage里的数据来确定是什么环境  如果是初次进入 则使用默认的
getBaseUrl();
let requestNum = 0; // 请求次数
let showLoading = false; // loading 状态
function createRequest(method: MethodType) {
  return async function <T>(options: RequestOptions):Promise<ResponseData<T>>{
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
      const header:any = {
        'Cookie': uni.getStorageSync('COOKIE')
      };
      if(options.checkPin){
        header.pin = config.pin;
      }
      uni.request({
        url: config.baseURL + options.url,
        data: options.data,
        method,
        header: Object.assign(header, options.header),

        success: (res) => {
          const data = res.data as ResponseData<T>;

          //成功响应拦截
          if (res.header['Set-Cookie'] || res.header['set-cookie']) {
            let params:any = res.header['Set-Cookie'] || res.header['set-cookie'];
            params = params.replaceAll('Path=/', '');
            params = params.replaceAll('HttpOnly', '');
            params = params.replaceAll(',', ';');
            params = params.split(';').filter((item:any) => item!== ' ').join(';');
            uni.setStorageSync('COOKIE', params);
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
export const deleteFn = createRequest('DELETE');
