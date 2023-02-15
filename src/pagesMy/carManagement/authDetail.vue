<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import PinInput from '@/components/pinInput/myp-one.vue';

import dayjs from 'dayjs';
import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';
import { useConfig } from '../../store/modules/config';
const router = useRouter();
const {setPin, config} = useConfig();
const tabNameList = [{
  label: '我的车辆'
}, {
  label: '被授权车辆'
}];
function setDefault() {
  uni.showModal({
    title: '撤销授权',
    content: '请确认将此车辆替换为默认车辆？默认车辆将展示在爱车首页',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        setPin(true);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const active = ref(0);
</script>

<template>
  <div class="relative bg-pageBg h-100vh">
    <div class="p-32rpx flex items-start h-200rpx box-border">
      <div>
        <nx-image
          :src="'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_car.png'"
          width="320rpx"
          height="128rpx"
        />
      </div>
      <div class="text-grayText ml-12rpx">
        <div class="text-titleMedium font-bold lh-46rpx">
          凯翼 FX12旗舰版
        </div>
        <div class="text-titleSmall lh-46rpx">
          车牌号:{{ 18234111342 }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          VIN:{{ 18234111342 }}
        </div>
      </div>
    </div>
    <div class="p-32rpx ">
      <div
        class="mb-32rpx relative w-686rpx bg-white rounded-16rpx p-32rpx box-border"
      >
        <div class="flex justify-between">
          <div class="flex">
            <div class="font-bold">
              授权信息
            </div>
            <nx-image
              class="ml-8rpx"
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUsing.png"
              width="120rpx"
              height="48rpx"
            />
          </div>
          <div @click="router.navigateTo({ name: 'carManagementRecord' })">
            控车记录<van-icon name="arrow" />
          </div>
        </div>
        <div class="flex justify-between items-center p-y-48rpx">
          <div class="text-center">
            <p class="text-46rpx font-bold">
              12月07日
            </p>
            <p class="text-titleSmall text-lightGrayText">
              12:52
            </p>
          </div>
          <div class="border-lightGray border-b-4rpx w-68rpx relative arrow-right">
          </div>
          <div class="text-center">
            <p class="text-46rpx font-bold">
              12月07日
            </p>
            <p class="text-titleSmall text-lightGrayText">
              12:52
            </p>
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车主账号
          </div>
          <div class="text-lightGrayText">
            12345
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车主姓名
          </div>
          <div class="text-lightGrayText">
            网络钥匙
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            授权钥匙
          </div>
          <div class="text-lightGrayText">
            网络钥匙
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            授权时间
          </div>
          <div class="text-lightGrayText">
            2022年07月15日17:10
          </div>
        </div>
        <button
          class="button-white lh-64rpx h-72rpx"
          @click="setDefault"
        >
          设置默认
        </button>
      </div>
    </div>
    <PinInput type="box" />
  </div>
</template>
<style scoped lang="scss">
.arrow-right::after {
  display: block;
  content: '';
  position: absolute;
  right: 0;
  bottom:3rpx;
  transform: rotate(60deg);
  height: 4rpx;
  width: 10rpx;
  background-color: #EEEEEE;
}
</style>
