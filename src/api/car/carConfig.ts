import {post, get} from '@/http/index';

export async function carHub() {
  return post({
    url: '/app-buy-car/modelHub/getModelHub'
  });
}
export async function carTrim() {
  return post({
    url: '/app-buy-car/innerDecorate/getInnerDecorate'
  });
}

// 获取车型列表
export async function getModel() {
  return post<OrderBuy.ModelResponse[]>({
    url: '/app-buy-car/model/getModel'
  });
}

// 获取车型配置
export async function getModelConfigure(modelCode = ''){
  return post<OrderBuy.GetModelConfigureResponse>({
    url: '/app-buy-car/model/getModelConfigure',
    data: {
      modelCode
    }
  });
}

//
export async function createWishOrder(data: OrderBuy.WishOrder){
  return post({
    url: '/app-buy-car/wishOrder/createWishOrder',
    data
  });
}
