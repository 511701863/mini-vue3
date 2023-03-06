<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import type { GrantCarType } from '@/api/types/carConfigType';

import { grantCar } from '@/api/my/carManagement';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import dayjs from 'dayjs';

const { run: grantCarFn, data: grantData } = useRequest<any, GrantCarType[]>(grantCar, {
  manual: true,
  onSuccess: (res) => {
    uni.showToast({
      title: '授权成功',
      icon: 'none'
    });
    router.navigateBack({});
  }
});
const router = useRouter();
const DatePickerEnd: any = ref(null);
const formData: Record<string, any> = reactive({
  gainUserName: '',
  gainUserPhone: '',
  grantStartTime: '',
  grantEndTime: '',
  grantType: 1,
  grantUserPhone: uni.getStorageSync('userInfo').phoneNo,
  vin: '',
  type: [true, false]
});
const submitDisabled = computed(() => {
  let flag = false;
  for (const key in formData) {
    if (formData[key] === '') {
      flag = true;
    }
  }
  return flag;
});
const params = reactive({
  modelName: '',
  imgUrl: '',
  carLicense: ''
});
onLoad((query) => {
  const { vin, modelShowName, carLicense, modelImage } = query;
  formData.vin = vin ?? '';
  params.modelName = modelShowName ?? '';
  params.carLicense = carLicense ?? '';
  params.imgUrl = modelImage ?? '';
});
watch(() => formData.grantStartTime, (nVal) => {
  if (formData.grantEndTime !== '') {
    formData.grantEndTime = '';
  }
});
watch(() => formData.grantEndTime, (nVal) => {
  if (formData.grantStartTime && nVal < formData.grantStartTime) {
    uni.showToast({
      title: '结束时间不能小于开始时间',
      icon: 'none'
    });
    formData.grantEndTime = '';
  }
});
function grant() {
  console.log(formData);
  const params = { ...formData };
  delete params.type;
  grantCarFn(params);
}
</script>

<template>
  <div class="relative p-32rpx h-100vh box-border auth-page">
    <div class="p-32rpx flex items-grantStartTime bg-pageBg h-200rpx box-border">
      <div>
        <image class="w-320rpx h-148rpx" :src="params.imgUrl" />
      </div>
      <div class="text-grayText ml-12rpx">
        <div class="text-titleMedium font-bold lh-46rpx">
          {{ params.modelName }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          车牌号：{{ params.carLicense }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          VIN：{{ formData.vin }}
        </div>
      </div>
    </div>
    <p class="font-bold mb-16rpx mt-48rpx">
      被分享人：
    </p>
    <div class="m-t-16rpx">
      <nxInput
        v-model="formData.gainUserPhone"
        class="m-t-16rpx"
        placeholder="请选输入手机"
        right-icon="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/getphone.png"
        :get-phone-number="true"
      />
    </div>
    <div class="m-t-16rpx">
      <nxInput v-model="formData.gainUserName" placeholder="请输入被授权人姓名" />
    </div>
    <p class="font-bold mb-16rpx mt-48rpx">
      有效期：
    </p>
    <div class="m-t-16rpx">
      <nxDatePicker
        v-model="formData.grantStartTime"
        :min-date="new Date().getTime()"
        input-align="left"
        type="datetime"
        placeholder="请选择有效开始时间"
      />
    </div>
    <div class="m-t-16rpx">
      <nxDatePicker
        ref="DatePickerEnd"
        v-model="formData.grantEndTime"
        :min-date="new Date().getTime() + 1000 * 60 * 5"
        input-align="left"
        type="datetime"
        placeholder="请选择有效结束时间"
      />
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
        @click="grant"
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

.label-class {
  color: #000000 !important;
}
</style>
