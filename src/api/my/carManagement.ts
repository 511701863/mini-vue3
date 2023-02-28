import { post, get } from '@/http/index';

//爱车首页-已绑定车辆
export function getCarList<P = any>(data: P) {
  return get<MyCenter.VehicleLoveList[]>({
    url: '/bss/app/vehicle/findVehicleList',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}

//车辆管理-查询我的车辆
export function findMyVehicleList<P = any>(data: P) {
  return get<any>({
    url: '/bss/app/vehicle/findMyVehicleList',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//车辆管理-被授权车辆
export function findAuthorizedVehicleList<P = any>(data: P) {
  return get<any>({
    url: '/bss/app/vehicle/findAuthorizedVehicleList',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//控车记录
export function recordHistory<P = any>(data: P) {
  return get<any>({
    url: '/dk/control/recordHistoryCombine',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//车辆管理-查询车辆授权记录
export function findRemoteGrantRecords<P = any>(data: P) {
  return get<any>({
    url: '/dk/grant/findRemoteGrantRecords',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//车辆详情
export function findVehicleDetailInfo<P = any>(data: P) {
  return get<any>({
    url: '/bss/app/vehicle/findVehicleDetailInfo',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}

//被授权车辆详情
export function gainGrantDetail<P = any>(data: P) {
  return get<any>({
    url: '/dk/grant/gainGrantDetail',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//撤销授权
export function revokeGrant(data:any) {
  return post<any>({
    url: `/dk/grant/revokeGrant/${data}`,
    data,
    loading: true,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}
//设为默认车辆
export function defaultVehicle(data:any) {
  return post<any>({
    url: '/tsp-member/member/user/defaultVehicle',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//车辆授权
export function grantCar<T>(data:T) {
  return post<any>({
    url: '/dk/grant/grant',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//判断当前用户是否绑定车辆
export function judgeBindVehicle(data:any) {
  return post<any>({
    url: '/tsp-member/member/user/judgeBindVehicle',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//验证车辆是否被绑定
export function judgeVehicleUserByVin(data:any) {
  return post<any>({
    url: '/tsp-member/member/user/judgeVehicleUserByVin',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//手动输入-查询车辆绑定信息
export function findVehicleInfo<P = any>(data: P) {
  return get<any>({
    url: '/bss/app/vehicle/findVehicleInfo',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}

///扫描-查询车辆绑定信息
export function findVehicleInfoByScan<P = any>(data: P) {
  return get<any>({
    url: '/bss/app/vehicle/findVehicleInfoByScan',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//解绑车辆
export function unBindVehicle(data:any) {
  return post<any>({
    url: '/tsp-member/member/user/unBindVehicle',
    data,
    loading: true,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}
//绑定车辆
export function bindVehicle(data:any) {
  return post<any>({
    url: '/tsp-member/member/user/bindVehicle',
    data,
    loading: true,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}
