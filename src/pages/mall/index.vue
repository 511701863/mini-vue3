<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance, computed } from 'vue';
import { useRouter } from '@/router/router';
import { onLoad, onUnload } from '@dcloudio/uni-app';
import Life from '@/pages/mall/components/life.vue';
import VehicleSupplies from '@/pages/mall/components/vehicleSupplies.vue';
import BrandGoods from '@/pages/mall/components/brandGoods.vue';
import Fengxing from '@/pages/mall/components/fengxing.vue';

const router = useRouter();
const activeTabId = ref('key-2');
const activeTabIndex = computed(() => {
  return tabsList.findIndex((x) => x.id === activeTabId.value);
});
const activeLineStyle = reactive({
  left: '',
  width: ''
});
const tabsList = reactive([
  { name: '生活', id: 'key-1' },
  { name: '车品', id: 'key-2' },
  { name: '品牌', id: 'key-3' },
  { name: '积分兑换', id: 'key-4' }
]);
const bannerChange = (event: any) => {
  activeTabId.value = tabsList[event.detail.current].id;
};
const instance = getCurrentInstance();
onLoad(() => {
  // active tab 动画
  const stopWatch = watch(activeTabId, (val, val2) => {
    if(val === val2){
      return;
    }
    const query = uni.createSelectorQuery().in(instance);
    query.selectAll(`#tab-box,#${val}`).boundingClientRect(([node1, node2]: any) => {
      const left = node1.left || 0;
      const nodeWidth = node2.width || 0;
      const nodeLeft = node2.left || 0;
      activeLineStyle.left = `${nodeLeft - left + nodeWidth / 4}px`;
      activeLineStyle.width = `${nodeWidth / 2}px`;
    });
    query.exec();

  }, { immediate: true });
  onUnload(() => {
    stopWatch();
  });
});
</script>

<template>
  <view class="relative">
    <view class="absolute z-1 w-full left-0 top-0">
      <view class="flex mx-big h-88rpx items-center">
        <view class="w-172rpx h-48rpx flex-auto">
          <nx-image width="172rpx" height="48rpx" static="main-logo.png" />
        </view>
        <view clas="flex-auto w-1rpx" />
        <view class="w-48rpx h-48rpx">
          <nx-image width="48rpx" height="48rpx" static="main-logo.png" />
        </view>
        <view class="ml-big w-48rpx h-48rpx">
          <nx-image
            width="48rpx"
            height="48rpx"
            static="main-logo.png"
          />
        </view>
      </view>
      <view id="tab-box" class="relative box-border pb-20rpx flex mx-big h-76rpx items-end">
        <view
          v-for="item in tabsList"
          :id="item.id"
          :key="item.id"
          class="mr-48rpx text-titleLarge color-whiteText"
          :class="{'font-bold': activeTabId === item.id}"
          @click="activeTabId = item.id"
        >
          {{ item.name }}
        </view>
        <view
          class="w-24rpx h-4rpx absolute left-20rpx bottom-small  bg-white rounded-54rpx transition-all"
          :style="activeLineStyle"
        />
      </view>
    </view>
    <swiper
      class="swiper h-800rpx"
      circular
      :current="activeTabIndex"
      :indicator-dots="true"
      :duration="500"
      indicator-color="rgba(255,255,255,0.4)"
      indicator-active-color="rgba(255,255,255,0.9)"
      @change="bannerChange"
    >
      <swiper-item v-for="item in tabsList" :key="item.id">
        <nx-image
          width="750rpx"
          height="800rpx"
          src="https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0"
        />
      </swiper-item>
    </swiper>
    <Life v-if="activeTabId === 'key-1'" />
    <vehicle-supplies v-if="activeTabId === 'key-2'" />
    <brand-goods v-if="activeTabId === 'key-3'" />
    <Fengxing v-if="activeTabId === 'key-4'" />
  </view>
</template>
