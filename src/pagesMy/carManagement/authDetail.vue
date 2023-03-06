<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';

import type { GrantRecordVo } from '../../api/types/carConfigType';

import dayjs from 'dayjs';
import { useRouter } from '@/router/router';
import { gainGrantDetail, defaultVehicle} from '@/api/my/carManagement';
import { useRequest } from '../../hooks/useRequest/useRequst';

const carId:any = ref('');
const { run: defaultVehicleFn } = useRequest<any, any>(defaultVehicle, {
  manual: true,
  onSuccess:() => {
    gainGrantDetailFn({id:carId.value});
  }
});
const { run: gainGrantDetailFn, data: formData } = useRequest<GrantRecordVo>(gainGrantDetail, {
  manual: true
});
const router = useRouter();
onLoad((query) => {
  const { id } = query;
  carId.value = id;
  gainGrantDetailFn({id});
});
function setDefault() {
  uni.showModal({
    title: '默认车辆',
    content: '请确认将此车辆替换为默认车辆？默认车辆将展示在爱车首页',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        defaultVehicleFn({vin:formData.value?.vin});
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const active = ref(0);
</script>

<template>
  <div class="relative bg-pageBg h-100vh">
    <div class="p-32rpx flex formData?s-start bg-pageBg h-200rpx box-border">
      <div>
        <image class="w-320rpx h-148rpx" :src="formData?.modelImage" />
      </div>
      <div class="text-grayText ml-12rpx">
        <div class="text-titleMedium font-bold lh-46rpx">
          {{ formData?.modelShowName }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          车牌号：{{ formData?.carLicense }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          VIN：{{ formData?.vin }}
        </div>
      </div>
    </div>
    <div class="p-32rpx ">
      <div
        class="mb-32rpx relative w-686rpx bg-white rounded-16rpx p-32rpx box-border"
      >
        <div class="flex justify-between">
          <div class="flex">
            <div class="font-bold">
              授权信息
            </div>
            <nx-image
              class="ml-8rpx"
              :src="formData?.grantStatus === 1?'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUsing.png':formData?.grantStatus === 0?'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseEnd.png':'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseBack.png'"
              width="120rpx"
              height="48rpx"
            />
          </div>
          <div @click="router.navigateTo({ name: 'carManagementGainRecord',query:{vin:formData?.vin, name:formData?.modelShowName, carLicense:formData?.carLicense, imgUrl:formData?.modelImage} })">
            控车记录<van-icon name="arrow" />
          </div>
        </div>
        <div class="flex justify-between items-center p-y-48rpx">
          <div class="text-center">
            <p class="text-46rpx font-bold">
              {{ dayjs(formData?.grantStartTime).format('MM月DD日') }}
            </p>
            <p class="text-titleSmall text-lightGrayText">
              {{ dayjs(formData?.grantStartTime).format('HH:mm') }}
            </p>
          </div>
          <div class="border-lightGray border-b-4rpx w-68rpx relative arrow-right">
          </div>
          <div class="text-center">
            <p class="text-46rpx font-bold">
              {{ dayjs(formData?.grantEndTime).format('MM月DD日') }}
            </p>
            <p class="text-titleSmall text-lightGrayText">
              {{ dayjs(formData?.grantEndTime).format('HH:mm') }}
            </p>
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车主账号
          </div>
          <div class="text-lightGrayText">
            {{ formData?.grantUserPhone }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车主姓名
          </div>
          <div class="text-lightGrayText">
            {{ formData?.grantUserName }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            授权钥匙
          </div>
          <div class="text-lightGrayText">
            {{ formData?.grantType === 0?'网络钥匙，蓝牙钥匙':'网络钥匙' }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            授权时间
          </div>
          <div class="text-lightGrayText">
            {{ dayjs(formData?.createTime).format('YYYY年MM月DD日 HH:mm') }}
          </div>
        </div>
        <button
          v-if="formData?.grantStatus === 1"
          class="button-white lh-64rpx h-72rpx"
          @click="setDefault"
        >
          设置默认
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.arrow-right::after {
  display: block;
  content: '';
  position: absolute;
  right: 0;
  bottom:3rpx;
  transform: rotate(60deg);
  height: 4rpx;
  width: 10rpx;
  background-color: #EEEEEE;
}
</style>
