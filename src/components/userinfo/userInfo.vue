<script setup lang="ts">
import * as problem from '@/api/find/problem';
import nxImage from '@/components/nxImage/nxImage.vue';
const userId=uni.getStorageSync('userId');
interface Props {
  userinfo?: {
    designation?: string;
    follow?: number;
    icon?: string;
    id?: string;
    medalId?: number;
    nickname?: string;
    obtainMedalIcon?: string;
    rankIcon?: string;
    applyReason?:string,
    roleCode?:number
  },
  reply?: string,
  model?:string
}
const props = defineProps<Props>();

interface FollowProps {
  (event: 'followClick', param: any): void
}
const emit = defineEmits<FollowProps>();
const userFollow = async (follow: number) => {
  if (follow === 0) {
    await problem.follow({ id: props.userinfo?.id });
    emit('followClick', { id: props.userinfo?.id as string, types: 'follow' });
  } else {
    await problem.cancelFollow({ id: props.userinfo?.id });
    emit('followClick', { id: props.userinfo?.id as string, types: 'cancelFollow' });
  }
};
</script>

<template>
  <view>
    <!-- 用户头像栏 -->
    <view class="flex-between">
      <view class="flex items-center">
        <!-- <img src="@/static/logo.png" class="w-100rpx h-100rpx rounded-full" alt=""> -->
        <view class="relative">
          <view>
            <nx-image
              :src="props.userinfo?.icon"
              :width="props?.reply ? '48rpx' : '80rpx'"
              :height="props?.reply ? '48rpx' : '80rpx'"
              :round="props?.reply?true:false"
            />
          </view>
          <view
            v-if="props.userinfo?.designation"
            class="absolute bottom-0 right-0"
          >
            <nx-image
              :src="props.userinfo?.designation"
              :width="props?.reply ? '16rpx' : '32rpx'"
              :height="props?.reply ? '16rpx' : '32rpx'"
              :round="props?.reply?true:false"
            />
          </view>
        </view>
        <view class="m-l-24rpx">
          <view class="flex ">
            <view class="text-titleMedium font-500">
              {{ props.userinfo?.nickname }}
            </view>
            <view class="m-l-8rpx">
              <nx-image
                :src="props.userinfo?.rankIcon"
                width="48rpx"
                height="32rpx"
              />
            </view>
          </view>
          <view class="flex">
            <view class="text-small color-mantle m-r-20rpx">
              {{ props.model }}
            </view>
            <view>
              <nx-image
                :src="props.userinfo?.rankIcon"
                width="48rpx"
                height="32rpx"
              />
            </view>
          </view>
        </view>
      </view>
      <template>
        <slot>
          <view
            v-if="props.userinfo?.id !== userId"
            class="w-126rpx h-60rpx text-center leading-60rpx border-stroke border-1rpx text-medium"
            @click="userFollow(props.userinfo?.follow as number)"
          >
            {{ props.userinfo?.follow === 1 ? '已关注' : '关注' }}
          </view>
        </slot>
      </template>
    </view>
  </view>
</template>
