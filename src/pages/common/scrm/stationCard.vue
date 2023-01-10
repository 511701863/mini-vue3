<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
import * as appoint from '@/interface/service/appointRepair';
import { useRouter } from '@/router/router';
import { ref } from 'vue';

const router = useRouter();

interface Props {
  data: appoint.getLatestStation
}

const props = defineProps<Props>();

function toNumber(price: number | string | undefined) {
  return parseInt(price as string) || 0;
}

function toCall(phone: any) {
  if (phone) {
    uni.makePhoneCall({
      phoneNumber: phone
    });
  }else{
    uni.showToast({
      title: '获取电话失败',
      icon: 'error',
      duration: 2000
    });
  }
}
const btnControl=() => {
  uni.openLocation({
      latitude: Number(props.data.serviceStationLatitude),
      longitude: Number(props.data.serviceStationLongitude),
      address:props.data.serviceStationAddress || '',
        success: function () {
          console.log('success');
        }
      });
};
</script>

<template>
  <view>
    <view class="h-320rpx m-t-22rpx m-b-medium">
      <nx-image
        width="670rpx"
        height="320rpx"
        static="dealer.png"
      />
    </view>
    <view class="h-92rpx flex justify-between p-b-20rpx">
      <view class="flex-1">
        <view class="text-titleMeduim font-500">
          {{ data.serviceStationName }}
        </view>
        <view class="text-meduim color-secondaryText">
          {{ (toNumber(data.distance) / 1000).toFixed(2) }}km | {{ data.serviceStationAddress }}
        </view>
      </view>

      <view class="m-x-20rpx max-w-140rpx" @click="toCall(data.serviceStationAllhoursPhone)">
        <nx-image width="48rpx" height="48rpx" static="phone-line.png" />
        <view class="text-meduim">
          致电
        </view>
      </view>
      <view @click.stop="btnControl">
        <nx-image width="48rpx" height="48rpx" static="navigation.png" />
        <view class="text-meduim">
          导航
        </view>
      </view>
    </view>
  </view>
</template>

