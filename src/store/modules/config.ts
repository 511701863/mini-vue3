import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { useUser } from './user';
import { AppConfig, EnvType, StorageType } from '../../types/config';

const { logout } = useUser();

export const useConfig = defineStore('config', () => {
  const config: AppConfig = reactive({
    baseURL: 'https://fdt-gateway-customer-tspstaging.dm.newcowin.com',
    baseH5: 'https://tsp-community-webapp.kayyi.com/#/community/agreement',
    ENV: 'dev',
    etcAppid: '',
    timer: null,
    //pin有效期
    pinTime: 0,
    pinShow: false,
    pin: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callBack: () => { },
    params: '',
    pinFocus: false
  });
  const envConfig = {
    'dev': {
      url: 'https://fdt-gateway-customer-tspstaging.dm.newcowin.com',
      h5Url: 'https://tsp-community-webapp.kayyi.com/#/community/agreement',
      ENV: 'dev'
    },
    'prod': {
      url: 'https://lqdm-app-dev.dflzm.com/customer',
      h5Url: 'https://tsp-community-webapp.kayyi.com/#/community/agreement',
      ENV: 'prod'
    },
    'uat': {
      url: 'https://fdt-gateway-bside-tspstaging.dm.newcowin.com',
      h5Url: 'https://tsp-community-webapp.kayyi.com/#/community/agreement',
      ENV: 'uat'
    }
  };
  function setConfigStorage() {
    // config.pinShow = false;
    config.pinFocus = false;
    config.pinTime = 0;
    uni.setStorageSync('config', config);
  }
  function getConfigInStorage() {
    const res = uni.getStorageSync('config');
    if (res) {
      for (const key in res) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        config[key as keyof typeof config] = res[key];
      }
    }
  }
  watch(() => config.pinShow, (nVal) => {
    if (!nVal) {
      uni.hideKeyboard();
    } else {
      //因为小程序弹出层得focus 有问题 所以需要进入后再触发
      setTimeout(() => {
        config.pinFocus = true;
      }, 300);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function setPin(visible: boolean, time = 0, callBack: (...arg: any[]) => any = () => { }, params: any = '') {
    if (params) {
      config.params = params;
    }
    //打开pin输入之前验证pin是否过期 没过期直接执行操作 执行后清除参数
    if (visible && config.pinTime > Date.now()) {
      if (!config.timer) {
        callBack(config.params);
        config.params = '';
      }
      config.timer=setTimeout(() => {
        config.timer = null;
      }, 1000);
      return;
    }
    config.pinShow = visible;
    //过期后打开pin验证并存入操作函数
    if (visible) {
      config.callBack = callBack;
    }
    //每次重新输入成功后存储输入时间 执行操作 执行后清除参数
    if (time) {
      if (!config.timer) {
        config.callBack(config.params);
        config.pinTime = time + 900000;
        config.params = '';
      }
      config.timer=setTimeout(() => {
        config.timer = null;
      }, 1000);

      //  config.pinTime = time + 900000;
    }
  }
  function getBaseUrl() {
    getConfigInStorage();
    return config.baseURL;
  }
  function getBaseH5() {
    getConfigInStorage();
    return config.baseH5;
  }
  function switchENV(env: EnvType) {
    config.baseURL = envConfig[env].url;
    config.baseH5 = envConfig[env].h5Url;
    config.ENV = envConfig[env].ENV;
    setConfigStorage();
    logout();
  }

  return {
    config,
    switchENV,
    setConfigStorage,
    getBaseUrl,
    getBaseH5,
    setPin
  };
});
