import { get, post } from '@/utils/request';

export async function getBanner() {
  return get({
    url: '/app-buy-car/banner/getBanner'
    // noLogin:true
  });
}
