import { get } from '@/utils/request';

interface Area {
  areaId:number,
  areaName: string,
  areaLevel: 1 | 2 | 3
}

interface AreaRes{
  list: Area[]
}
export async function getProvince():Promise<AreaRes>{
  return get(
    {
      url: '/base-data/v1/basedata/area/rootList'
    }
  );
}

export async function getAllArea():Promise<AreaRes>{
  return get(
    {
      url: '/base-data/v1/basedata/area/allList'
    }
  );
}
export async function cityList() {
  return get(
    {
      url: '/base-data/v1/basedata/area/cityList'
    }
  );
}
