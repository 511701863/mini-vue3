<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
import { useRouter } from '@/router/router';
const router = useRouter();
</script>

<template>
  <view class="h-302rpx bg-white m-t-16rpx shadow">
    <view class="h-30rpx p-24rpx text-titleLarge font-600">
      我的订单
    </view>
    <view class="h-236rpx flex-between p-b-40rpx p-x-48rpx">
      <view @click="router.navigateTo({ name:'buyOrder'})">
        <nx-image
          static="my-car.png"
          width="108rpx"
          height="108rpx"
        />
        <view class="text-titleSmall text-center">
          购车订单
        </view>
      </view>
      <view @click="router.navigateTo({ name:'testDrive'})">
        <nx-image
          static="my-testdrive.png"
          width="108rpx"
          height="108rpx"
        />
        <view class="text-titleSmall text-center">
          试驾订单
        </view>
      </view>
      <view @click="router.navigateTo({name:'mallOrder'})">
        <nx-image
          static="my-mall.png"
          width="108rpx"
          height="108rpx"
        />
        <view class="text-titleSmall text-center">
          商城订单
        </view>
      </view>
      <view @click="router.navigateTo({ name:'record'})">
        <nx-image
          static="my-server.png"
          width="108rpx"
          height="108rpx"
        />
        <view class="text-titleSmall text-center">
          服务记录
        </view>
      </view>
    </view>
  </view>
</template>
