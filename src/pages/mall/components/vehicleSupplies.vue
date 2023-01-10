<script setup lang="ts">
import { ref } from 'vue';
import goodsItem from './goodsItem.vue';
const activeTypeId = ref(1);

const tabsTypeList = [
  { name: '服务套餐', id: 1 },
  { name: '改装配件', id: 2 }
];

</script>

<template>
  <!-- 分类 tab -->
  <view class="mt-big ml-big h-76rpx">
    <scroll-view class="wh-full whitespace-nowrap" scroll-x="true">
      <view
        v-for="item in tabsTypeList"
        :key="item.id"
        class="inline-block mr-big text-titleLarge color-secondaryText"
        :class="{'color-primaryText': activeTypeId === item.id}"
        @click="activeTypeId = item.id"
      >
        {{ item.name }}
      </view>
    </scroll-view>
  </view>
  <!-- 分类商品列表 -->
  <view class="mx-big pt-normal flex flex-wrap">
    <view class="w-full card-2 grid-gap-16rpx">
      <goods-item v-for="item in 5" :key="item" />
    </view>
  </view>
</template>
