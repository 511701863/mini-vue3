<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import dayjs from 'dayjs';
const router = useRouter();
const DatePickerEnd:any =ref(null);
const addFlag =ref(true);
const formData:Record<string, any> = reactive({
  name:'d',
  center:'123',
  start:'',
  end:'',
  type:[true, false]
});
const submitDisabled = computed(() => {
  let flag = false;
  for (const key in formData) {
    if(formData[key] === ''){
      flag = true;
    }
  }
  return flag;
});
watch(() => formData.start, (nVal) => {
  if( formData.end !== ''){
    formData.end = '';
  }
});
watch(() => formData.end, (nVal) => {
  if(formData.start && nVal < formData.start){
    uni.showToast({
      title:'结束时间不能小于开始时间',
      icon:'none'
    });
    formData.end = '';
  }
});
</script>

<template>
  <div class="relative p-32rpx h-100vh box-border auth-page">
    <div class="p-32rpx flex items-start h-200rpx box-border">
      <div>
        <nx-image
          :src="'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_car.png'"
          width="320rpx"
          height="128rpx"
        />
      </div>
      <div class="text-grayText ml-12rpx">
        <div class="text-titleMedium font-bold lh-46rpx">
          凯翼 FX12旗舰版
        </div>
        <div class="text-titleSmall lh-46rpx">
          车牌号:{{ 18234111342 }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          VIN:{{ 18234111342 }}
        </div>
      </div>
    </div>

    <p class="font-bold mb-16rpx mt-48rpx">
      被分享人：
    </p>
    <div class="m-t-16rpx">
      <nxInput
        v-model="formData.name"
        class="m-t-16rpx"
        placeholder="请选输入手机"
        right-icon="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/getphone.png"
        :get-phone-number="true"
      />
    </div>
    <div class="m-t-16rpx">
      <nxInput v-model="formData.center" placeholder="请输入被授权人姓名" />
    </div>
    <p class="font-bold mb-16rpx mt-48rpx">
      有效期：
    </p>
    <div class="m-t-16rpx">
      <nxDatePicker v-model="formData.start" input-align="left" type="datetime" placeholder="请选择有效开始时间" />
    </div>
    <div class="m-t-16rpx">
      <nxDatePicker ref="DatePickerEnd" v-model="formData.end" input-align="left" type="datetime" placeholder="请选择有效结束时间" />
    </div>
    <p class="font-bold mb-16rpx mt-48rpx">
      车辆权限：
    </p>
    <div class="m-t-16rpx p-32rpx bg-pageBg">
      <NxCheckBox v-model="formData.type[0]" checked-color="#1E1E1E" class="mr-52rpx" shape="square" :disabled="true">
        网络钥匙授权
      </NxCheckBox>
    </div>

    <div class="flex justify-center p-t-32rpx">
      <button
        :disabled="submitDisabled"
        class="bg-buttonColor w-686rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
      >
        授权
      </button>
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
