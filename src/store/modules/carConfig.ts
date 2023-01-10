import { defineStore } from 'pinia';
import { computed, reactive, ref, toRef } from 'vue';

function toPrice(price: number | string | undefined) {
  return parseInt(price as string) || 0;
}

export const useCarConfig = defineStore('carConfig', () => {
  const model = reactive<OrderBuy.CarConfig['model']>({});
  const inner = reactive<OrderBuy.CarConfig['inner']>({});
  const hub = reactive<OrderBuy.CarConfig['hub']>({});
  const outer = reactive<OrderBuy.CarConfig['outer']>({});
  const server = reactive<OrderBuy.CarConfig['server']>({});

  const allConfig = reactive<OrderBuy.CarConfig>({
    model,
    inner,
    hub,
    outer,
    server
  });

  const changeOut = (config: OrderBuy.ModelColor) => {
    allConfig.outer = config;
    outerPrice.value = config.outerPrice;
  };
  const changeInner = (config: OrderBuy.InnerDecorateResponse) => {
    allConfig.inner = config;
    innerPrice.value = config.innerPrice;
  };
  const changeHub = (config: OrderBuy.ModelHubResponse) => {
    allConfig.hub = config;
    hubPrice.value = config.hubPrice;
  };
  const changeServer = (config: OrderBuy.ModelServer) => {
    allConfig.server = config;
    serverPrice.value = config.price;
  };

  // 价格计算
  const modelPrice = toRef(model, 'modelPrice');
  const outerPrice = toRef(outer, 'outerPrice');
  const hubPrice = toRef(hub, 'hubPrice');
  const innerPrice = toRef(inner, 'innerPrice');
  const serverPrice = toRef(server, 'price');

  const totalPrice = computed(() => {
    let price = 0;

    price += toPrice(modelPrice.value);
    price += toPrice(outerPrice.value);
    price += toPrice(hubPrice.value);
    price += toPrice(innerPrice.value);
    price += toPrice(serverPrice.value);

    return price;
  });

  return {
    allConfig,
    totalPrice,
    changeOut,
    changeHub,
    changeInner,
    changeServer
  };
});
