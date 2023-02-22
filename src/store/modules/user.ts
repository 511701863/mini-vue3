import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { UserState } from '../../types/user';

type Obj = Record<string, any>;

export const useUser = defineStore('user', () => {
  const userState: UserState = reactive({
    userInfo: {
      openId: '',
      nickName: '开发001',
      mobile:'13708148577',
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
      openId: '123',
      avatar: ''
    };
    const cookiePArams ='userid=144200110000073911; usersig=AAAAELEHl74mMoYUSa33MyxjbVo+F3yiGNMhp8ruMCjmt6VLqfvrohpv0rtcE9W/ICA/qK5YIz4PpesXRl5rztFSLqM9pIhrNncXav834/Sw83HB9D+I8NsTrFM+lll7TZP9TrWKKVx3hldj8oel7pVIFN9OMJOLW4KhW7h5gNbBCyC7B7AUbYAjc99P/5LBb3HjDM8yI1C6btWLuqYgrESN5IcRcXYofXBjBOxKXXJ8f6OyMSHDj4cgtgL4Pz2xNvoxFLwSrb0hDp7r4cLd7q0PBDYnLIcvm44B16JmCgZuSQ4j; IOV_ACCOUNT_SESSIONID=Zjg3Yjc2MTktNTNhOC00NTQzLTk5NWEtZDYzMmY3NDU3N2Nk';
    uni.setStorageSync('COOKIE', cookiePArams);
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
