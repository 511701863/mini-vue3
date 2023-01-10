<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
import { useRouter } from '@/router/router';
const router = useRouter();

const navigateTo=(pageName:string) => {
  router.navigateTo({name:pageName});
};

</script>

<template>
  <view class="h-714rpx bg-white m-t-16rpx shadow">
    <view class="h-30rpx p-24rpx text-titleLarge font-600">
      风行尊享
    </view>
    <view class="h-236rpx  p-b-40rpx p-x-48rpx">
      <view class="flex-between m-t-40rpx">
        <view @click="navigateTo('myClub')">
          <nx-image
            static="my-club.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            我的俱乐部
          </view>
        </view>
        <view @click="navigateTo('cardCenter')">
          <nx-image
            static="my-coupon.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            卡券中心
          </view>
        </view>
        <view @click="navigateTo('myShopCart')">
          <nx-image
            static="my-shopping.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            我的购物车
          </view>
        </view>
      </view>
      <view
        class="flex-between m-t-40rpx"
      >
        <view @click="navigateTo('myRecommend')">
          <nx-image
            static="my-like.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            我的推荐
          </view>
        </view>
        <view @click="navigateTo('myActivity')">
          <nx-image
            static="my-activity.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            我的活动
          </view>
        </view>
        <view @click.stop="navigateTo('certificate')">
          <nx-image
            static="my-sanbao.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            三包凭证
          </view>
        </view>
      </view>
      <view class="flex-between m-t-40rpx">
        <view @click.stop="navigateTo('customerService')">
          <nx-image
            static="my-customer.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            在线客服
          </view>
        </view>
        <view @click="router.navigateTo({ name:'feedback'})">
          <nx-image
            static="my-opinion.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            意见反馈
          </view>
        </view>
        <view @click.stop="navigateTo('partnerPlanIndex')">
          <nx-image
            static="my-plan.png"
            width="108rpx"
            height="108rpx"
          />
          <view class="text-titleSmall text-center">
            合伙人计划
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
