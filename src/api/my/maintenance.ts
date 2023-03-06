import { post, get } from '@/http/index';

export function getList<P = any>(data: P) {
  return get<MyCenter.VehicleMaintenanceAppointmentAppPageAo[]>({
    url: '/tsp-tpm/app/maintenance/getMaintenanceList',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}

export function getProvinceList<P = any>(data: P) {
  return get<MyCenter.AreaVo[]>({
    url: '/tsp-tpm/app/maintenance/getProvinceList',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}

export function getStoreList<P = any>(data: P) {
  return get<MyCenter.DealersAppPageResultAo[]>({
    url: '/tsp-tpm/app/maintenance/get4sList',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}

export function addMaintenance<P = any>(data: P) {
  return post({
    url: '/tsp-tpm/app/maintenance/order/create',
    data,
    customErr:true,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//获取时间
export function getMaintenancePeriod<P = any>(data: P) {
  return get<any>({
    url: '/tsp-tpm/app/maintenance/getMaintenancePeriod',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//详情
export function getMaintenanceDetail<P = any>(data: P) {
  return get<any>({
    url: '/tsp-tpm/app/maintenance/order/detail',
    data,
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
//取消预约
export function getMaintenanceCancel<P = any>(data: P) {
  return post<any>({
    url: '/tsp-tpm/app/maintenance/order/cancel',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//删除
export function getMaintenanceDelete<P = any>(data: P) {
  return post<any>({
    url: '/tsp-tpm/app/maintenance/order/delete',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//评价
export function MaintenanceEvaluate<P = any>(data: P) {
  return post<any>({
    url: '/tsp-tpm/app/maintenance/order/evaluate',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
