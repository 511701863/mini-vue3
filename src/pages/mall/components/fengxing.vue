<script setup lang="ts">
import { ref } from 'vue';
import goodsItem from './goodsItem.vue';
const activeTypeId = ref(1);

const tabsTypeList = [
  { name: '华为', id: 1 },
  { name: '小米', id: 2 },
  { name: '格力', id: 3 },
  { name: '金龙鱼', id: 4 },
  { name: '风行', id: 5 }
];

</script>

<template>
  <!-- 风行币 -->
  <view class="mx-big mt-64rpx h-112rpx flex justify-between items-stretch">
    <view class="h-full flex flex-col justify-between text-center">
      <view class="color-primaryText text-meduim">
        当前风行币
      </view>
      <view class="text-48rpx font-500 color-primaryText">
        3568
      </view>
    </view>
    <view class="h-full flex flex-col items-center justify-center text-center">
      <view class="w-48rpx h-48rpx">
        <nx-image
          class="wh-full"
          width="48rpx"
          height="48rpx"
          static="main-logo.png"
        />
      </view>
      <view class="mt-small text-center flex-center">
        <view class="text-meduim color-secondaryText">
          获取更多风行币
        </view>
        <view class="ml-2rpx w-28rpx h-28rpx">
          <nx-image
            class="wh-full"
            width="28rpx"
            height="28rpx"
            static="main-logo.png"
          />
        </view>
      </view>
    </view>
  </view>
  <!-- 分类 tab -->
  <view class="mt-big mx-big h-76rpx">
    <view class="h-full flex items-center justify-between">
      <view
        v-for="item in tabsTypeList"
        :key="item.id"
        class="text-titleLarge color-secondaryText"
        :class="{'color-primaryText': activeTypeId === item.id}"
        @click="activeTypeId = item.id"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
  <!-- 分类商品列表 -->
  <view class="mx-big pt-normal flex flex-wrap">
    <view class="w-full card-2 grid-gap-16rpx">
      <goods-item v-for="item in 5" :key="item" />
    </view>
  </view>
</template>
