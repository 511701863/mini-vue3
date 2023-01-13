import { appid } from '@/config';
import {post, get} from '@/http/index';

export function register(detail: any) {
  return post(
    {
      url: '/app-vip-user/exterior/wxApplet/reg',
      data: {
        ...detail,
        appid
      },
      noLogin: true
    }
  );
}

export async function login(): Promise<any> {
  try {
    const { identifier } = await nxlogin();
    uni.setStorageSync('userId', identifier);
  } catch (e) {
    if (e === 'noRegister') {
      uni.navigateTo({
        url: '/pages/common/register/index'
      });
    }
  }
}

function wxgetUserInfo(): Promise<UniApp.GetUserInfoRes> {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}

// function checkSession(): Promise<UniNamespace.CheckSessionOptions> {
//   return new Promise((resolve, reject) => {
//     uni.checkSession({
//       success: function (res) {
//         if (headerStore.hasCookie()) {
//           resolve(res);
//         } else {
//           reject(res);
//         }
//       },
//       fail: function (res) {
//         reject(res);
//       }
//     });
//   });
// }

function wxlogin(): Promise<UniApp.LoginRes> {
  return new Promise((resolve, reject) => {
    uni.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}

async function nxlogin() {
  const { code } = await wxlogin();
  const { iv, encryptedData } = await wxgetUserInfo();
  return post({
    url: '/app-vip-user/exterior/wxApplet/login',
    noLogin: true,
    data: {
      appid,
      iv,
      encryptedData,
      code
    }
  });
}

