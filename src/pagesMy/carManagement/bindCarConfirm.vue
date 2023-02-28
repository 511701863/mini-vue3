<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { bindVehicle } from '@/api/my/carManagement';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';

const router = useRouter();
const carInfo:any = ref({
  warning: false
});
const checkout = ref(false);
const agree = () => {
  checkout.value = !checkout.value;
};
function UserPrivacy() {
  router.navigateTo({
    name: 'baseH5',
    query: {
      path: '/privacy'
    }
  });
}
function bindCar() {
  uni.showModal({
    title: '绑定车辆',
    content: '您正绑定车辆，请确认是否继续?',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        run({vin:carInfo.value?.vin});
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
onLoad((query) => {
 const {info} = query;
 console.log(info);

  carInfo.value = JSON.parse(info || '');
});
const { run} = useRequest(bindVehicle, {
  manual: true,
  onSuccess: () => {
    uni.showToast({
      title:'操作成功',
      icon:'none'
    });
    router.navigateBack({delta:2});
  }
});
</script>

<template>
  <div class="relative bg-pageBg h-100vh p-32rpx box-border">
    <div class="mt-160rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border">
      <div class="flex flex-wrap justify-center items-center mt-132rpx">
        <div class="font-bold">
          {{ carInfo?.modelShowName }}
        </div>
        <div class="mt-14rpx text-24rpx text-grayText w-622rpx text-center">
          VIN：{{ carInfo?.vin }}
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx mt-80rpx">
          <div>
            4S店
          </div>
          <div>
            {{ carInfo?.salesAreaName }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            发动机号
          </div>
          <div>
            {{ carInfo?.engineNumber }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车牌号
          </div>
          <div>
            {{ carInfo?.carLicense }}
          </div>
        </div>
      </div>
      <div class="absolute top--132rpx right-45rpx">
        <image
          class="w-600rpx h-258rpx"
          :src="carInfo?.modelImage"
        />
      </div>
    </div>

    <view class="h-150rpx m-b-40rpx absolute bottom-0 left-32rpx">
      <view class="flex justify-center items-center flex-wrap">
        <view v-show="!checkout" class="lh-32rpx h-32rpx" @click="agree">
          <image
            src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_check.png"
            class="w-32rpx h-32rpx lh-32rpx"
          />
        </view>
        <view v-show="checkout" class="lh-32rpx h-32rpx" @click="agree">
          <image
            src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/check.png"
            class="w-32rpx h-32rpx lh-32rpx"
          />
        </view>
        <view class="flex items-start">
          <text class="text-24rpx color-neutral m-l-8rpx">
            用户同意
          </text>
          <text class="text-24rpx color-linkText" @click="UserPrivacy">
            《隐私协议》
          </text>
        </view>
      </view>
      <div>
        <button class="button-primary w-686rpx  mt-16rpx" :disabled="!checkout" @click="bindCar">
          绑定车辆
        </button>
      </div>
    </view>
  </div>
</template>
<style scoped lang="scss">
.car-number:nth-child(2) {
  position: relative;
  margin-right: 24rpx;
}

.car-number:nth-child(2)::after {
  position: absolute;
  content: '·';
  right: -22rpx;
}
</style>
