export const appid = 'wxf9efa882020a21c0'; // 小程序appid

export const trackerkey = '1eb0474388f4865752e57335f275b001'; // 企点埋点appkey
export const trackerHost = 'https://v-cdp-dev.dflzm.com'; // 企点埋点上报 服务器地址

// export const etcAppid = 'wxb987499af62b5b97';

type Env = 'dev' | 'uat'

const envConfig = {
  dev: {
    baseURL: 'https://lqdm-app-dev.dflzm.com/customer',
    baseH5: 'https://lqdm-h5-dev.dflzm.com'
  },
  uat: {
    baseURL: 'https://lqdm-app-uat.dflzm.com/customer',
    baseH5: 'https://lqdm-h5-uat.dflzm.com'
  }
};
export function getEnv(){
  const env:Env = uni.getStorageSync('ENV') || 'dev';

  return envConfig[env];
}
