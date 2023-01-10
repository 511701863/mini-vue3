<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
import { useRouter } from '@/router/router';
const router = useRouter();

interface Props {
  integral?:string,
  growthValue?: string,
  signIn?:boolean
}
defineProps<Props>();
</script>

<template>
  <view class="h-192rpx bg-secondaryLight m-t-32rpx shadow" @click="router.navigateTo({ name:'userTaskCenter'})">
    <view class="flex-between p-t-30rpx p-b-22rpx p-x-22rpx">
      <view class="text-titleLarge font-600">
        任务中心 >
      </view>
      <view>
        <button class="button-primary-small">
          {{ signIn ?'已签到':'签到' }}
        </button>
      </view>
    </view>
    <view class="flex-between p-24rpx ">
      <view class="flex-between w-5/12">
        <view class="flex">
          <nx-image
            static="my-money.png"
            width="40rpx"
            height="40rpx"
          />
          <view class="text-titleMeduim font-600 m-l-2rpx">
            风行币
          </view>
        </view>
        <view class="color-primary text-titleMeduim">
          {{ integral!==null?integral:'0' }}
        </view>
      </view>
      <view class="flex-between w-5/12">
        <view class="flex">
          <nx-image
            static="my-lv.png"
            width="40rpx"
            height="40rpx"
          />
          <view class="text-titleMeduim font-600 m-l-2rpx">
            成长值
          </view>
        </view>
        <view class="color-primary text-titleMeduim">
          {{ growthValue!==null?growthValue:'0' }}
        </view>
      </view>
    </view>
  </view>
</template>
