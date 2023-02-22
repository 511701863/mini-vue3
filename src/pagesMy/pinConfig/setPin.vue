<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import PinInput from './components/myp-one.vue';

import { checkHasSetPin, verifyPin, getPublicKey, resetByOldPin, resetPinByPhone, setPin } from '@/api/my/pinConfig';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import {setPublicKey, getRsaPin} from '@/utils/rsa/index';
const {run:checkPinFn, data:hasPin} = useRequest<boolean>(checkHasSetPin, {
  manual:true,
  onSuccess:(res) => {
    if(res.data){
      flag.value = 0;
      title.value = '请输入原PIN码';
    }
  }
});
const {run:getPublicKeyFn, data:publicKeyData} = useRequest<{publicKey:string}>(getPublicKey, {
  manual:true,
  onSuccess:(res) => {
    setPublicKey(publicKeyData.value?.publicKey);
    const rsaPin = getRsaPin(oldPin.value);
    verifyPinFn({pin:rsaPin});
  }
});
const {run:verifyPinFn} = useRequest<boolean>(verifyPin, {
  manual:true,
  onSuccess:(res) => {
    console.log(res);
    flag.value++;
    title.value = '请设置PIN码';
  }
});
const {run:resetByOldPinFn} = useRequest<boolean>(resetByOldPin, {
  manual:true,
  onSuccess:setPinSuccess
});
const {run:resetPinByPhoneFn} = useRequest<boolean>(resetPinByPhone, {
  manual:true,
  onSuccess:setPinSuccess
});
const {run:setPinFn} = useRequest<boolean>(setPin, {
  manual:true,
  onSuccess:setPinSuccess
});
const router = useRouter();
const pinInputRef:any = ref(null);
const pin:Ref<string>= ref('');
const firstPin:Ref<string>= ref('');
const oldPin:Ref<string>= ref('');
const mobile:Ref<string>= ref('');
//验证码
const phoneCode:Ref<string> = ref('');
const title:Ref<string>= ref('请设置PIN码');
//步骤 0 需要输入原始pin  1 设置pin  2 确认pin
const flag = ref(1);
const setType = ref(1);
const delta = ref(2);
function nextTap(){
  if(flag.value === 0){
    oldPin.value = pin.value;
    getPublicKeyFn();
    pinInputRef?.value?.clear();
    return;
  }
  if(flag.value === 1){
    firstPin.value = pin.value;
    flag.value++;
    title.value = '请再次确认PIN码';
    pinInputRef?.value?.clear();
    return;
  }
  if(flag.value === 2){
    if(firstPin.value !== pin.value){
      uni.showToast({
        title:'两次输入PIN不一致',
        icon:'none'
      });
      return;
    }
    const rsaPin = getRsaPin(oldPin.value);
    const newPin = getRsaPin(pin.value);
    pinInputRef?.value?.clear();
    if(oldPin.value){
      resetByOldPinFn({
        pin:newPin,
        oldPin:rsaPin
      });
      return;
    }
    if(mobile.value){
      resetPinByPhoneFn({
        pin:newPin,
        code:phoneCode.value,
        mobile:mobile.value
      });
      return;
    }
    setPinFn({
        pin:newPin
      });
    // router.navigateBack({delta:delta.value});
  }

}
function setPinSuccess(res:any){
  if(res.data){
    router.navigateBack({delta:delta.value});
  }
}
onLoad((query) => {
  const { original, phone, code } = query;
  if (original) {
    delta.value =2;
    mobile.value = phone ?? '';
    phoneCode.value = code ?? '';
  }else{
    delta.value =1;
    checkPinFn();
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
