<script setup lang="ts">
import { useRouter } from '@/router/router';
import nxImage from '@/components/nxImage/nxImage.vue';
const router = useRouter();
</script>

<template>
  <view>
    <view class="m-t-28rpx">
      <swiper
        class="w-670rpx h-670rpx"
        :autoplay="true"
        interval="3000"
        :indicator-dots="true"
        :circular="true"
      >
        <swiper-item class="bg-pink">
          <view class="wh-full">
            <img
              class="wh-full"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668674793&t=59d618eef1678c20e05d0f23d5d7892c"
              alt=""
            >
          </view>
        </swiper-item>
        <swiper-item class="bg-blue">
          <view class="wh-full">
            <img
              class="wh-full"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668674793&t=59d618eef1678c20e05d0f23d5d7892c"
              alt=""
            >
          </view>
        </swiper-item>
        <swiper-item class="bg-green">
          <view class="wh-full">
            <img
              class="wh-full"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668674793&t=59d618eef1678c20e05d0f23d5d7892c"
              alt=""
            >
          </view>
        </swiper-item>
        <swiper-item class="bg-red">
          <view class="wh-full">
            <img
              class="wh-full"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668674793&t=59d618eef1678c20e05d0f23d5d7892c"
              alt=""
            >
          </view>
        </swiper-item>
      </swiper>

      <view class="text-normal m-t-28rpx font-600">
        ????????????
      </view>
      <view class="m-t-20rpx flex justify-between">
        <view>
          <nx-image
            static="shijia.png"
            width="200rpx"
            height="200rpx"
          />
        </view>
        <view>
          <nx-image
            static="lookcar.png"
            width="200rpx"
            height="200rpx"
          />
        </view>
        <view @click="router.navigateTo({name:'popularPlan'})">
          <nx-image
            static="hehuoren.png"
            width="200rpx"
            height="200rpx"
          />
        </view>
      </view>
      <view class="flex justify-between m-t-56rpx">
        <view class="text-titleLarge font-600">
          ????????????
        </view>
        <view
          class="text-titleSmall color-secondaryText"
          @click="router.navigateTo({ name: 'topic' })"
        >
          ??????
        </view>
      </view>
      <view>
        <swiper
          :display-multiple-items="2.1"
          :duration="1000"
          class="m-t-20rpx h-200rpx"
        >
          <swiper-item>
            <view>
              <img
                src="@/static/logo.png"
                class="w-300rpx h-200rpx"
              >
            </view>
          </swiper-item>
          <swiper-item>
            <view>
              <img
                src="@/static/logo.png"
                class="w-300rpx h-200rpx"
              >
            </view>
          </swiper-item>
          <swiper-item>
            <view>
              <img
                src="@/static/logo.png"
                class="w-300rpx h-200rpx"
              >
            </view>
          </swiper-item>
        </swiper>
      </view>
      <!-- ???????????? -->
      <view class="m-t-28rpx p-b-40rpx border-b border-gray-200">
        <!-- ???????????? -->
        <view>
          <!-- ??????????????? -->
          <view class="flex-between">
            <view class="flex items-center">
              <!-- <img src="@/static/logo.png" class="w-100rpx h-100rpx rounded-full" alt=""> -->
              <view class="relative">
                <view>
                  <img
                    src="@/static/logo.png"
                    class="w-100rpx h-100rpx rounded-full "
                    alt=""
                  >
                </view>
                <view class="absolute bottom-0 right-0">
                  <img
                    src="@/static/logo.png"
                    class="w-40rpx h-40rpx"
                    alt=""
                  >
                </view>
              </view>
              <view class="m-l-24rpx">
                Joanna
              </view>
              <view class="m-l-8rpx">
                A
              </view>
            </view>
            <view class="w-120rpx h-60rpx text-center leading-60rpx border-gray-400 border-1rpx">
              ??????
            </view>
          </view>
        </view>
        <!-- ???????????? -->
        <view class="m-t-24rpx">
          <view class="font-semibold">
            ????????????
          </view>
          <p class="m-t-8rpx line-clamp">
            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <view class="m-t-8rpx">
            <text class="bg-background p-5rpx m-r-10rpx">
              #???????????????
            </text>
            <text class="bg-background p-5rpx m-r-10rpx">
              #????????????
            </text>
            <text class="bg-background p-5rpx m-r-10rpx">
              #??????
            </text>
          </view>
        </view>
        <!-- ????????? -->
        <dynamic-img />
        <!-- ???????????? -->
        <browse-comments />
      </view>
      <!-- ???????????? -->
      <view class="m-t-28rpx">
        <text>??????APP???????????????????????????????????????</text>
        <view class="flex flex-wrap justify-between m-t-16rpx">
          <view class=" w-330rpx h-200rpx m-t-20rpx">
            <img
              class="w-full h-200rpx"
              src="@/static/images/lookcar.png"
              alt=""
            >
          </view>
          <view class="w-330rpx h-200rpx m-t-20rpx">
            <img
              class="w-full h-200rpx"
              src="@/static/images/shijia.png"
              alt=""
            >
          </view>
        </view>
        <view class="flex justify-between m-t-16rpx">
          <view>
            <button class="w-330rpx h-70rpx leading-70rpx bg-primary color-white text-normal">
              ??????
            </button>
          </view>
          <view>
            <button class="w-330rpx h-70rpx leading-70rpx bg-primary color-white text-normal">
              ??????
            </button>
          </view>
        </view>
      </view>
      <view class="m-t-45rpx">
        <text>??????APP???????????????????????????????????????</text>
        <view class="flex flex-wrap justify-between m-t-16rpx">
          <view class=" w-330rpx h-200rpx m-t-20rpx">
            <img
              class="w-full h-200rpx"
              src="@/static/images/lookcar.png"
              alt=""
            >
          </view>
          <view class="w-330rpx h-200rpx m-t-20rpx">
            <img
              class="w-full h-200rpx"
              src="@/static/images/shijia.png"
              alt=""
            >
          </view>
        </view>
        <view class="flex m-t-16rpx">
          <button class="w-330rpx">
            ??????
          </button>
          <button class="w-330rpx">
            ??????
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
