<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { pushMsg, getList } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';

const router = useRouter();
const carInfo = ref({
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
    title: '撤销授权',
    content: `您正在解绑车牌号为${'川A·88888'}的车辆，请确认是否继续?`,
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击qr');
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const { run, data } = useRequest(getList, {
  manual: true,
  onSuccess: () => {
    carInfo.value.warning = !carInfo.value.warning;
  }
});
</script>

<template>
  <div class="relative bg-pageBg h-100vh p-32rpx box-border">
    <div class="mt-160rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border">
      <div class="flex flex-wrap justify-center items-center mt-132rpx">
        <div class="font-bold">
          COWIN FX12旗舰版
        </div>
        <div class="mt-14rpx text-24rpx text-grayText w-622rpx text-center">
          VIN：COWINKEY00000000
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx mt-80rpx">
          <div>
            4S店
          </div>
          <div>
            成都国贸经销商
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            发动机号
          </div>
          <div>
            FDJ80991
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车牌号
          </div>
          <div>
            川A·VV666
          </div>
        </div>
      </div>
      <div class="absolute top--132rpx right-45rpx">
        <image
          class="w-600rpx h-258rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_car.png"
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
