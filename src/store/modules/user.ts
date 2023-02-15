import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { UserState } from '../../types/user';

type Obj = Record<string, any>;

export const useUser = defineStore('user', () => {
  const userState: UserState = reactive({
    userInfo: {
      openId: '',
      nickName: '开发001',
      avatar: ''
    },
    token: ''
  });
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
  async function login() {
    const { code } = await wxlogin();
    const { iv, encryptedData } = await wxgetUserInfo();
    console.log({code, iv, encryptedData});
    userState.userInfo = {
      openId: '',
      avatar: ''
    };
    uni.setStorageSync('isLogin', true);
    return Promise.resolve({ code: 201 });
    // return new Promise((resolve, reject) => {

    // })
  }
  function logout() {
    uni.removeStorageSync('COOKIE');
    uni.removeStorageSync('userId');
    uni.removeStorageSync('userInfo');
    uni.reLaunch({url:'/pages/my/index'});
    uni.setStorageSync('isLogin', false);

  }
  return {
    userState,
    login,
    logout
  };
});
