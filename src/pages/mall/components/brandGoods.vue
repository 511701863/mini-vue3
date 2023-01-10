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
  <!-- 分类 tab -->
  <view class="mt-big mx-big h-76rpx">
    <!-- <scroll-view v-if="false" class="wh-full whitespace-nowrap" scroll-x="true">
      <view
        v-for="item in tabsTypeList"
        :key="item.id"
        class="inline-block mr-big text-titleLarge color-secondaryText"
        :class="{'color-primaryText': activeTypeId === item.id}"
        @click="activeTypeId = item.id"
      >
        {{ item.name }}
      </view>
    </scroll-view> -->
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
