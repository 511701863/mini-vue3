import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useStore = defineStore('store', () => {
  const storeState: MyCenter.DealersAppPageResultAo = reactive({
    name:'',
    code: ''
  });
  function setStore(item:MyCenter.DealersAppPageResultAo){
    storeState.name = item.name;
    storeState.code = item.code;
  }
  return {
    setStore,
    storeState
  };
});
