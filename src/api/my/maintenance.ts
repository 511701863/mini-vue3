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
    loading: false,
    loadingMask: true,
    header: {
    }
  });
}
