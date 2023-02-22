import { post, get } from '@/http/index';

//围栏首页-已设置围栏
export function getSetElectricList<P = any>(data: P) {
  return get<MyCenter.ElectricFenceVo[]>({
    url: '/tsp-address/electricFence/userlist',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//删除围栏
export function deleteElectric<P = any>(data: P) {
  return post<boolean>({
    url: `/tsp-address/electricFence/delete/${data}`,
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//围栏列表
export function getElectricList<P = any>(data: P) {
  return get<MyCenter.ElectricFenceVo[]>({
    url: '/tsp-address/electricFence/userPage',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//围栏列表
export function getElectricDetail<P = any>(data: P) {
  return get<MyCenter.ElectricFenceVo>({
    url: '/tsp-address/electricFence/detail',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//新增
export function addElectric<P = any>(data: P) {
  return post<MyCenter.ElectricFenceVo>({
    url: '/tsp-address/electricFence/add',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//编辑
export function updateElectric<P = any>(data: P) {
  return post<MyCenter.ElectricFenceVo>({
    url: '/tsp-address/electricFence/update',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
