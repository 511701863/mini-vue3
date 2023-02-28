import { checkRes } from '@/api/control';
import { ref, reactive, toRefs, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRequest } from './useRequst';

const defaultQuerise = Symbol('default');

export function useCheckRes<T, P extends any[] = any[]>(
  service: any,
  checkSuccess:any,
  options?:any
  ) {
  let params = {};
  if(options){
    params = ([] as unknown as P);
  }
  const timer: any = ref(null);
  const timerNum = ref<number>(1);
  const querise = reactive<Record<string | symbol, {data:any, status:string}>>({
    [defaultQuerise]: {
      data: null,
      status: ''
    }
  });
  //需要执行远控的方法 开始后进入轮询
  const { run, data, loading } = useRequest(service, {
    manual: true,
    onSuccess: () => {
      polling(() => { return checkResFn(data.value); });
    }
  });
  //开启loading
  watch(() => loading?.value, (nVal) => {
    if(nVal){
      uni.showLoading({ title: '指令正在执行中', mask:true });
    }
  }, {deep:true});
  //检测远控结果
  const { run: checkResFn, data: checkData } = useRequest<Control.CheckResType>(checkRes, {
    manual: true,
    onSuccess: () => {
      timerNum.value++;
      querise[defaultQuerise].status = checkData.value?.operationStatus as string;
      querise[defaultQuerise].data = checkData.value;
      //失败或者超时停止指令 清除定时器 或轮询超过20次
      if (['FAILED', 'TIMEOUT'].includes(checkData.value?.operationStatus || '') || timerNum.value >= 20) {
        clearInterval(timer.value);
        timer.value = null;
        uni.hideLoading();
        uni.showToast({
          title: '指令超时',
          icon: 'error'
        });
      }
      //执行成功后执行成功回调，清除定时器
      if (['SUCCESS'].includes(checkData.value?.operationStatus || '')) {
        clearInterval(timer.value);
        timer.value = null;
        uni.hideLoading();
        checkSuccess(params);
        uni.showToast({
          title: '操作成功',
          icon: 'none'
        });
      }
    },
    onError: () => {
      console.log(11111);
      clearInterval(timer.value);
      timer.value = null;
      uni.hideLoading();
    }
  });
  //定时器清除 还原轮询次数 去除loading
  watch(timer, (nVal) => {
    if(nVal === null){
      timerNum.value = 1;
    }
  });

  //轮询检测 添加定时器
  function polling(cbFn: (...args: any) => any, time = 1000) {
    timer.value = setInterval(cbFn, time);
  }
  return {
    run,
    ...toRefs(querise[defaultQuerise])
  };
}
