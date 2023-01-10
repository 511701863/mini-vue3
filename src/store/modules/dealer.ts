import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

type Obj = Record<string, any>;

export const useDealer = defineStore('dealer', () => {
  const dealer: Scrm.Dealer = reactive({
    id: 0,
    address: '',
    code: '',
    hotPhone: '',
    name: '',
    onlineAddress: ''
  });

  function assign(obj: Obj, newObj: Obj) {
    for (const key in obj) {
      obj[key] = newObj[key];
    }
  }

  function changeDealer(newDealer: Scrm.Dealer) {
    assign(dealer, newDealer);
  }

  function clear() {
    assign(dealer, {
      id: 0,
      address: '',
      code: '',
      hotPhone: '',
      name: '',
      onlineAddress: ''
    });
  }
  return {
    dealer,
    changeDealer,
    clear
  };
});
