<script setup lang="ts">
import userInfo from './components/userinfo.vue';
import myPost from './components/myPost.vue';
import taskCenter from './components/taskCenter.vue';
import myOrder from './components/myOrder.vue';
import myCar from './components/myCar.vue';
import exclusive from './components/exclusive.vue';
import nxImage from '@/components/nxImage/nxImage.vue';
import { useRouter } from '@/router/router';
import { ref } from 'vue';
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app';
const router = useRouter();

onPullDownRefresh(async () => {
  fnUserInfo();
  uni.stopPullDownRefresh();
});

const user = ref();

async function fnUserInfo() {
  // const data = await myInfo();
}

onShow(() => {
  fnUserInfo();
  // const my = uni.getStorageSync('myInfo');
  // user.value = my;
});

function navigateToByName(name: string) {
  router.navigateTo({ name });
}

const call = () => {
  uni.makePhoneCall({
    phoneNumber: '400-8877-668',
    success: function () {
      console.log('拨打电话成功');
    },
    fail() {
      console.log('打电话失败了');
    }
  });
};
</script>

<template>
  <van-dialog id="van-dialog" confirm-button-color="#376C80" />
  <view class="fixed bottom-40rpx right-20rpx" @click="call">
    <nx-image
      static="my-customer-primary.png"
      width="96rpx"
      height="96rpx"
      :round="true"
    />
  </view>
  <view class="h-screen bg-gradient p-x-40rpx p-t-24rpx">
    <view class="h-88rpx flex-between">
      <view>
        <nx-image
          static="main-logo.png"
          width="192rpx"
          height="52rpx"
        />
      </view>
      <view class="flex flex-row-reverse">
        <view @click="router.navigateTo({ name: 'setup' })">
          <nx-image
            static="my-setting.png"
            width="48rpx"
            height="48rpx"
          />
        </view>
        <view class="m-r-40rpx" @click="router.navigateTo({ name: 'myMessage' })">
          <nx-image
            static="my-message.png"
            width="48rpx"
            height="48rpx"
          />
        </view>
        <view class="m-r-40rpx">
          <nx-image
            static="my-code.png"
            width="48rpx"
            height="48rpx"
          />
        </view>
      </view>
    </view>

    <my-post
      :fans-number="(user?.fansNumber as string)"
      :follow-number="(user?.followNumber as string)"
      :like-and-collect-number="(user?.likeAndCollectNumber as string)"
      :publish-number="(user?.publishNumber as string)"
      :goods-collect-number="(user?.goodsCollectNumber as string)"
    />
    <task-center
      :integral="(user?.integral as string)"
      :growth-value="(user?.growthValue as string)"
      :sign-in="(user?.signIn)"
    />
    <my-car />
    <my-order />
    <exclusive />
    <view
      class="h-104rpx text-center p-t-114rpx"
      @click="navigateToByName('testEnv')"
    >
      <nx-image
        static="logobottom.png"
        width="144rpx"
        height="40rpx"
      />
    </view>
    <agreement-dialog />
  </view>
</template>
