import { getEnv } from '@/config';
import { RequestParams, ResponseData } from './types';
// import { useHeader } from '@/store/modules/header';

// const headerStore = useHeader();

export const get = createRequest('GET');
export const post = createRequest('POST');

function createRequest(method: UniNamespace.RequestOptions['method']) {
  return async function <T = any>(params: RequestParams): Promise<T> {
    return new Promise(async (resolve, reject) => {
      // if (!params.noLogin) {
      //   await login();
      // }

      if (!params.noLoading) {
        uni.showLoading({
          title: '加载中'
        });
      }

      uni.request({
        url: getEnv().baseURL + params.url,
        data: params.data,
        method,
        header: {
          device: 12323,
          deviceSN: 22222,
          cookie: uni.getStorageSync('COOKIE')
        },

        success: (res) => {
          const data = res.data as ResponseData<T>;

          if (res.header['Set-Cookie']) {
            uni.setStorageSync('COOKIE', res.header['Set-Cookie']);
          }else if (res.header['set-cookie']) {
            uni.setStorageSync('COOKIE', res.header['set-cookie']);
          }

          if ([0, 200].includes(data.code)) {
            resolve(data.data);
          } else if (/^12[0-9]\d{2}$/.test(`${data.code}`)) {
            reject('noRegister');
          } else {
            uni.showToast({
              title: `${data.msg}`,
              icon: 'error',
              duration: 2000
            });
            reject(data.msg);
          }
        },

        fail: (res: any) => {
          uni.showToast({
            title: `请求失败 ${res.status}`,
            icon: 'error',
            duration: 2000
          });
          reject(res);
        },

        complete: () => {
          if (!params.noLoading) {
            uni.hideLoading();
          }
        }
      });
    });
  };
}
