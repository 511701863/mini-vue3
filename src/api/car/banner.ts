import {post, get} from '@/http/index';

export async function getBanner() {
  return get({
    url: '/app-buy-car/banner/getBanner'
    // noLogin:true
  });
}
