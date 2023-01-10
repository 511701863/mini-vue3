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
        快捷入口
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
          热门话题
        </view>
        <view
          class="text-titleSmall color-secondaryText"
          @click="router.navigateTo({ name: 'topic' })"
        >
          更多
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
      <!-- 用户动态 -->
      <view class="m-t-28rpx p-b-40rpx border-b border-gray-200">
        <!-- 用户信息 -->
        <view>
          <!-- 用户头像栏 -->
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
              关注
            </view>
          </view>
        </view>
        <!-- 动态内容 -->
        <view class="m-t-24rpx">
          <view class="font-semibold">
            圆梦新疆
          </view>
          <p class="m-t-8rpx line-clamp">
            请注意，所谓的好车并不是豪车；而这辆车让人放心，不会在你的自家过程中出什么故障，这样不但安全并且不会阿斯顿撒打算地方官梵蒂冈反对
          </p>
          <view class="m-t-8rpx">
            <text class="bg-background p-5rpx m-r-10rpx">
              #新疆自驾游
            </text>
            <text class="bg-background p-5rpx m-r-10rpx">
              #自家车队
            </text>
            <text class="bg-background p-5rpx m-r-10rpx">
              #售后
            </text>
          </view>
        </view>
        <!-- 动态图 -->
        <dynamic-img />
        <!-- 动态浏览 -->
        <browse-comments />
      </view>
      <!-- 支持反对 -->
      <view class="m-t-28rpx">
        <text>支持APP智能控车代替传统车钥匙么？</text>
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
              支持
            </button>
          </view>
          <view>
            <button class="w-330rpx h-70rpx leading-70rpx bg-primary color-white text-normal">
              反对
            </button>
          </view>
        </view>
      </view>
      <view class="m-t-45rpx">
        <text>支持APP智能控车代替传统车钥匙么？</text>
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
            支持
          </button>
          <button class="w-330rpx">
            反对
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
