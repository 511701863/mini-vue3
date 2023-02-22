import { post, get } from '@/http/index';

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

