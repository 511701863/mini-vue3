import { post, get } from '@/http/index';

//获取车辆位置
export function getCarLocation<P = any>(data: P) {
  return get<Control.VehicleLocationAo>({
    url: '/tsp-address/vehicle/location',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//发送到车机
export function sendToCar<P = any>(data: P) {
  return post<any>({
    url: '/tsp-address/vehicle/sendToCar',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}

