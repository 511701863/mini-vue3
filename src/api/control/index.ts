import { post, get } from '@/http/index';

//控车结果查询
export function checkRes(data:any) {
  return get<any>({
    url: `/tsp-subscription/v1/remote-operation/result/${data}`,
    data,
    loading: false,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}

//防盗告警
export function stolenAlarm<P = any>(data: P) {
  return post<any>({
    url: '/tsp-subscription/v1/remote-operation/stolen-alarm',
    data,
    loading: false,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}

//获取车型能力
export function collection(data:any) {
  return get<any>({
    url: '/bss/app/modelAbility/collection',
    data,
    loading: false,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}

//查询车型能力的实时状态
export function findVehicleDefault(data:any) {
  return get<any>({
    url: '/bss/app/vehicle/findVehicleDefault',
    data,
    loading: false,
    loadingMask: true,
    checkPin:true,
    header: {
    }
  });
}
//控车
//车门锁
export function controlDoor<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/door',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//车门锁
export function controlTrunk<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/trunk',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//发动机
export function controlEngine<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/engine',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//空调
export function controlAir<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/air-condition',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//寻车
export function controlFindCar<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/find_car',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//闪灯
export function controlLight<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/light',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//鸣笛
export function controlAlarm<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/alarm',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//车窗
export function controlWindow<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/window',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
//天窗
export function controlSunroof<P = any>(data: P) {
  return post<any>({
    url: '/tsp-remote-operation/v1/remote-operation/sunroof',
    data,
    loading: false,
    checkPin:true,
    header: {
    }
  });
}
