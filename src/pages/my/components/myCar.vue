<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import { RoutesNamesType } from '../../../router/types';

import nxImage from '@/components/nxImage/nxImage.vue';
import { useRouter } from '@/router/router';
const router = useRouter();
const isLogin = ref(false);
onShow(() => {
  isLogin.value = uni.getStorageSync('isLogin');
});
function clickIcon(name:RoutesNamesType){
  if (!isLogin.value) {
    router.navigateTo({
      name: 'login'
    });
    return;
  }
  router.navigateTo({
      name
    });
}
</script>

<template>
  <view class="bg-white rounded-16rpx">
    <view class="h-30rpx p-32rpx text-titleLarge font-600 pb-0">
      我的车辆
    </view>
    <view class="flex-between p-y-42rpx p-x-48rpx">
      <view class="text-center" @click="clickIcon('carManagement')">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/management.png"
          width="48rpx"
          height="48rpx"
        />
        <view class="text-titleSmall text-center">
          车辆管理
        </view>
      </view>
      <view class="text-center" @click="clickIcon('pinConfig')">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/pin.png"
          width="48rpx"
          height="48rpx"
        />
        <view class="text-titleSmall text-center">
          PIN码设置
        </view>
      </view>
      <view class="text-center" @click="clickIcon('electronic')">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/electronic.png"
          width="48rpx"
          height="48rpx"
        />
        <view class="text-titleSmall text-center">
          电子围栏
        </view>
      </view>
      <view class="text-center" @click="clickIcon('maintenance')">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/weibao.png"
          width="48rpx"
          height="48rpx"
        />
        <view class="text-titleSmall text-center">
          我的维保
        </view>
      </view>
    </view>
    <view class="flex-between p-b-42rpx p-x-48rpx">
      <view class="text-center" @click="clickIcon('message')">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/message.png"
          width="48rpx"
          height="48rpx"
        />
        <view class="text-titleSmall text-center">
          消息中心
        </view>
      </view>
    </view>
  </view>
</template>
