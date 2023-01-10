<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
import { MyInformation } from '@/interface/my/myFriends';
import { toLogin } from '@/helper/login/index';
import { useRouter } from '@/router/router';
const router = useRouter();

interface Props {
  props: MyInformation,
}
const propsData= defineProps<Props>();

function login() {
  // const my = uni.getStorageSync('myInfo');
  if (!propsData.props.id) {
    toLogin();
  }
}

</script>

<template>
  <view class="flex-between">
    <view
      class="flex items-center"
      @click="login"
    >
      <view class="relative">
        <view v-if="propsData.props.icon">
          <nx-image
            :src="propsData.props.icon"
            width="124rpx"
            height="124rpx"
            :round="true"
          />
        </view>
        <view v-else>
          <nx-image
            src="https://cos-app-uat.dflzm.com/official/defaultAvatar.png"
            width="124rpx"
            height="124rpx"
            :round="true"
          />
        </view>
        <!-- <view
          v-if="props"
          class="absolute bottom--10rpx right--10rpx"
        >
          <nx-image
            static="logo.png"
            width="60rpx"
            height="60rpx"
            :round="true"
          />
        </view> -->
      </view>
      <view class="m-l-24rpx">
        <view class="flex items-center">
          <view v-if="propsData.props.id" class="text-titleBig font-600">
            {{ propsData.props?.nickname || '' }}
          </view>
          <view v-else class="text-titleBig font-600">
            登录/注册
          </view>
          <view
            v-if="props && propsData.props.rankName"
            class="m-l-8rpx p-x-4rpx  bg-money"
          >
            {{ propsData.props.rankName }}
          </view>
        </view>
        <view v-if="propsData.props.id" class="m-t-8rpx text-titleSmall color-secondaryText" @click="router.navigateTo({ name: 'autograph', query: { autograph: propsData.props.autograph || '' }})">
          {{ propsData.props.autograph ? propsData.props.autograph :'点击设置个性签名' }}
        </view>
        <view v-else class="m-t-8rpx text-titleSmall color-secondaryText">
          登录后获取更多精彩内容
        </view>
      </view>
    </view>
    <view />
  </view>
</template>
