import {post, get} from '@/http/index';

export function getList(params:any) {
  return get({
    url: '/app-buy-car/banner/getBanner1',
    params,
    loading: false,
    loadingMask:true,
    header:{
      OrgId:'100000000000000000000'
    }
  });
}
