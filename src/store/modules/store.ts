import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Store } from '../../types/store';

export const useStore = defineStore('store', () => {
  const storeState: Store = reactive({
    name:'',
    code: ''
  });
  function setStore(item:Store){
    storeState.name = item.name;
    storeState.code = item.code;
  }
  return {
    setStore,
    storeState
  };
});
