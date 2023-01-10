<script setup lang="ts">
import Dialog from '@/wxcomponents/vant/dialog/dialog';
import nxImage from '@/components/nxImage/nxImage.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from '@/router/router';
const router = useRouter();

const carLists = ref([]);
const defaultCar=ref();
async function fncarList(pageIndex: number) {
  const params = {
    userName: '18717380379' || uni.getStorageSync('userInfo').phone,
    // userName: '19828478257',
    pageIndex: pageIndex,
    pageSize: 50
  };
  const result:any = {};
  // if(result && result.dataList.length > 0){
  //   uni.setStorageSync('hasCar', true);
  //   result.dataList.forEach((item: any) => {
  //     if (item.status === 'default') {
  //       defaultCar.value=item;
  //     }
  //   });
  //   carLists.value.push(...result.dataList);
  // }else{
  //   uni.setStorageSync('hasCar', false);
  // }
}

onMounted(() => {
  fncarList(1);
});
</script>

<template>
  <van-dialog id="van-dialog" confirm-button-color="#376C80" />

  <view v-if="carLists.length===0" class="relative m-t-16rpx" @click="router.navigateTo({ name: 'addCarSelect' });">
    <view>
      <nxImage
        static="my-bg-car.png"
        width="670rpx"
        height="260rpx"
      />
    </view>
    <view class="absolute bottom-82rpx left-48rpx">
      <view class="w-160rpx h-60rpx bg-white text-titleMeduim text-center leading-60rpx">
        添加爱车
      </view>
      <view class="text-meduim color-whiteText m-t-24rpx">
        添加爱车即享专属权益
      </view>
    </view>
  </view>
  <view v-else class="m-t-16rpx bg-white shadow h-220rpx p-24rpx">
    <view class="flex-between">
      <view class="text-titleLarge font-600">
        {{ defaultCar.nickName }}
      </view>
      <view class="text-titleSmall color-secondaryText" @click="router.navigateTo({name:'myCarList'})">
        车辆管理
      </view>
    </view>
    <view class="flex-between m-t-30rpx">
      <view class="text-titleSmall">
        <view>{{ defaultCar.licensePlate }}</view>
        <view>{{ defaultCar.brandName }}</view>
      </view>
      <view>
        <nxImage :src="defaultCar.modelImageUrl" width="260rpx" height="114rpx" />
      </view>
    </view>
  </view>
  <!-- <swiper v-else class="h-220rpx" :indicator-dots="true">
    <swiper-item v-for="item in carLists" :key="item + '1'">
      <view class="m-t-16rpx bg-white shadow h-220rpx p-24rpx">
        <view class="flex-between">
          <view class="text-titleLarge font-600">
            {{ item.nickName }}
          </view>
          <view class="text-titleSmall color-secondaryText" @click="router.navigateTo({name:'myCarList'})">
            车辆管理
          </view>
        </view>
        <view class="flex-between m-t-30rpx">
          <view class="text-titleSmall">
            <view>{{ item.licensePlate }}</view>
            <view>{{ item.brandName }}</view>
          </view>
          <view>
            <nxImage :src="item.modelImageUrl" width="260rpx" height="114rpx" />
          </view>
        </view>
      </view>
    </swiper-item>
  </swiper> -->
</template>
