import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { UserState } from '../../types/user';
// import { useRequest } from '../../hooks/useRequest/useRequst';
type Obj = Record<string, any>;
// const { run: userLoginFn, data: carList } = useRequest(userLogin, {
//   manual: true,
//   onSuccess: () => {
//     console.log(carList);
//   }
// });
export const useUser = defineStore('user', () => {
  const userState: UserState = reactive({
    appid: 'wx2642e761518bb7d5',
    userInfo: {
      headPortrait: '',
      nickName: '',
      phoneNo:'',
      userId:''
    },
    token: ''
  });
  function wxgetUserInfo(): Promise<UniApp.GetUserInfoRes> {
    return new Promise((resolve, reject) => {
      uni.getUserInfo({
        success: function (res) {
          console.log(res);
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
    const params = {
      appid:userState.appid,
      code,
      iv,
      encryptedData
    };

    return Promise.resolve(params);
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
