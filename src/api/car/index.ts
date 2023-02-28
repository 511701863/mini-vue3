import {post, get} from '@/http/index';

export function getList<P=any, T=any>(data:P) {
  return get<T>({
    url: '/tsp-tpm/app/maintenance/getMaintenanceList',
    data,
    loading: false,
    loadingMask:true,
    header:{
      OrgId:'100000000000000000000'
    }
  });
}
export function getList2<P=any, T=any>(data:P) {
  return get<T>({
    url: '/app-buy-car/banner/getBanner',
    data,
    loading: false,
    loadingMask:true,
    header:{
      OrgId:'100000000000000000000'
    }
  });
}
export function pushMsg<P=any, T=any>(...arg:any[]):Promise<any> {
  return new Promise((res, rej) => {
    uni.showLoading({
      title: '指令发送中',
      mask: true
    });
    setTimeout(() => {
      uni.hideLoading();
      res({data:123});
    }, 1000);
  });
}

export function userLogin<P=any, T=any>(data:P) {
  return post<T>({
    url: '/v1/account/wx_applet/login?device=wx-applet',
    data,
    loading: false,
    loadingMask:true,
    header:{
      deviceSN:'wx-applet',
      CompanyID:1
    }
  });
}

export function userInfo<P=any, T=any>() {
  return post<T>({
    url: '/bss/inside/user/get',
    loading: false,
    loadingMask:true,
    header:{
      deviceSN:'wx-applet',
      CompanyID:1
    }
  });
}
