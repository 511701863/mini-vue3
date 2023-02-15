<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import PinInput from './components/myp-one.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
const router = useRouter();
const pinInputRef:any = ref(null);
const pin:Ref<string>= ref('');
const firstPin:Ref<string>= ref('');
const title:Ref<string>= ref('请设置PIN码');
const flag = ref(0);
const delta = ref(2);
function nextTap(){
  if(flag.value === 0){
    firstPin.value = pin.value;
    flag.value++;
    title.value = '请再次确认PIN码';
    pinInputRef?.value?.clear();
    return;
  }
  if(flag.value === 1){
    if(firstPin.value !== pin.value){
      uni.showToast({
        title:'两次输入PIN不一致',
        icon:'none'
      });
      return;
    }
    pinInputRef?.value?.clear();
    router.navigateBack({delta:delta.value});
  }

}
onLoad((query) => {
  const { original } = query;
  if (original) {
    delta.value =2;
  }else{
    delta.value =1;
  }
  console.log(delta.value);
});
function inputPin(val:any){
  pin.value = val;
}
</script>

<template>
  <div class="relative p-y-44rpx p-x-64rpx bg-pageBg h-100vh box-border">
    <div class="text-titleLogin font-bold">
      {{ title }}
    </div>
    <div class="text-titleSmall mt-12rpx mb-72rpx text-gray">
      PIN码为远程控制车辆需要输入的安全验校验码请妥善保管
    </div>
    <PinInput ref="pinInputRef" type="box" :auto-clear="false" @input="inputPin" />
    <div class="mt-88rpx">
      提示
    </div>
    <div class="text-titleSmall mt-12rpx text-gray">
      <p>1、同一APP账号绑定的车联网车辆使用同一PIN码；</p>
      <p>2、当前设置的PIN码适用于后续该账号下关联的所有联网车辆;</p>
      <p>3、PIN码修改后均适用于当前账单绑定的所有车辆</p>
    </div>
    <view class="h-150rpx m-b-40rpx absolute bottom-0 left-32rpx">
      <div>
        <button class="button-primary w-686rpx  mt-16rpx" :disabled="pin.length<4" @click="nextTap">
          下一步
        </button>
      </div>
    </view>
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
.label-class{
  color: #000000!important;
}
</style>
