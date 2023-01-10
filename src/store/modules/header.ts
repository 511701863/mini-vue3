import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
interface Header {
  cookie: string;
  device: string,
  deviceSN: string,
}

export const useHeader = defineStore('header', () => {
  const store: Header = reactive({
    cookie: '',
    device: '1111',
    deviceSN: '2222'
  });

  function changeCookie(cookie: Header['cookie']) {
    if(cookie){
      store.cookie = cookie;
    }
  }

  function hasCookie():boolean {
    return !!store.cookie;
  }
  return {
    ...toRefs(store),
    changeCookie,
    hasCookie
  };
});
