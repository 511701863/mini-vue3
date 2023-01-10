<script setup lang="ts">
import { ref } from 'vue';
import goodsItem from './goodsItem.vue';
// TODO: DELETE
const tempImgSrc = 'https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0';
const activeTypeId = ref(1);

const tabsTypeList = [
  { name: '运动户外', id: 1 },
  { name: '运动户外', id: 2 },
  { name: '运动户外', id: 3 },
  { name: '运动户外', id: 4 },
  { name: '运动户外', id: 5 }
];

</script>

<template>
  <view>
    <!-- 活动专区 -->
    <view class="m-big">
      <view class="h-80rpx flex items-center justify-between">
        <view class="text-titleLarge font-500 color-primaryText opacity-90">
          活动专区
        </view>
        <view class="text-meduim font-400 color-secondaryText">
          更多
        </view>
      </view>
      <view class="h-212rpx flex items-center justify-between">
        <view class="flex-auto w-326rpx">
          <nx-image
            width="326rpx"
            height="212rpx"
            :src="tempImgSrc"
          />
        </view>
        <view class="ml-18rpx flex-auto w-326rpx">
          <nx-image
            width="326rpx"
            height="212rpx"
            :src="tempImgSrc"
          />
        </view>
      </view>
    </view>
    <!-- 好物种草 -->
    <view class="mt-big">
      <view class="mx-big h-80rpx flex items-center justify-between">
        <view class="text-titleLarge font-500 color-primaryText opacity-90">
          好物种草
        </view>
        <view class="text-meduim font-400 color-secondaryText">
          更多
        </view>
      </view>
      <view class="ml-big h-326rpx">
        <scroll-view class="wh-full whitespace-nowrap" scroll-x="true">
          <view v-for="(item, index) in tabsTypeList" :key="item.id" class="inline-block w-272rpx h-326rpx mr-normal" :class="{'mr-big': index === tabsTypeList.length - 1}">
            <view class="w-272rpx h-262rpx">
              <nx-image
                width="272rpx"
                height="262rpx"
                :src="tempImgSrc"
              />
            </view>
            <view class="box-border h-100rpx truncate px-normal leading-100rpx text-meduim color-primaryText opacity-90">
              救命！这也太好用救命！这也太好用
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
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
          运动户外
        </view>
      </scroll-view>
    </view>
    <!-- 分类商品列表 -->
    <view class="mx-big pt-normal flex flex-wrap">
      <view class="w-full card-2 grid-gap-16rpx">
        <goods-item v-for="item in 5" :key="item" />
      </view>
    </view>
  </view>
</template>
