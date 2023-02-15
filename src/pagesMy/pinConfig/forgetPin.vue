<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import PinInput from './components/myp-one.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
const router = useRouter();
const time =ref(60 * 1000);
const reloadFlag = ref(false);
const pin:Ref<string>= ref('');

watch(pin, (newPin) => {
  if(newPin){
    router.navigateTo({name:'pinConfigSetPin', query:{original:true}});
  }
});
function reSend(){
  reloadFlag.value = false;
}
</script>

<template>
  <div class="relative p-y-44rpx p-x-64rpx bg-pageBg h-100vh box-border">
    <div class="text-titleLogin font-bold">
      请输入验证码
    </div>
    <div class="text-titleSmall mt-12rpx mb-72rpx text-gray">
      验证码已发送至 <span class="text-warn">18483923840</span>
    </div>
    <PinInput v-model="pin" type="box" :maxlength="6" />
    <div class="text-center text-warn text-titleMedium">
      <van-count-down v-if="!reloadFlag" :time="time" format="ss秒后重新获取验证码" @finish="reloadFlag = true" />
      <span v-else @click="reSend">重新发送验证码</span>
    </div>
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
