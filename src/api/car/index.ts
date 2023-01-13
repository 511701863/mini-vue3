import {post, get} from '@/http/index';

export function getList<P=any, T=any>(data:P) {
  return get<T>({
    url: '/app-buy-car/banner/getBanner1',
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
