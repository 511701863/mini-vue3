<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { onHide, onShow } from '@dcloudio/uni-app';

import NoCar from './noCar/index.vue';
import TopLeft from './top/left.vue';
import TopRight from './top/right.vue';
import BottomLeft from './bottom/left.vue';
import BottomRight from './bottom/right.vue';
import ControlDiaLog from './components/ControlDiaLog.vue';
import PinInput from '@/components/pinInput/myp-one.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { debounce } from '../../utils/tool/index';
import { getCarList, defaultVehicle } from '../../api/my/carManagement';
import { findVehicleDefault } from '../../api/control/index';

const router = useRouter();
const swiperIndex = ref<number>(0);
const controlIndex = ref<number>(0);
const swiperCurrent = ref<number>(0);
const carSelectShow = ref<boolean>(false);
const isLogin = ref(false);
const scrollRef: any = ref(null);

const { run: getCarListFn, data: carList } = useRequest<MyCenter.VehicleLoveList[]>(getCarList, {
  manual: true,
  onSuccess: () => {
    scrollRef.value?.search();
  }
});
//切换默认车辆
const { run: defaultVehicleFn } = useRequest<any, any>(defaultVehicle, {
  manual: true,
  onSuccess: () => {
    getCarListFn();
  }
});
const timer: any = ref(null);
onShow(() => {
  isLogin.value = uni.getStorageSync('isLogin');
  if (isLogin.value) {
    getCarListFn();
  }
});
onHide(() => {
  clearInterval(timer.value);
  timer.value = null;
});
const isShow = ref(false);
const btnId = ref(2);

function confirm(i: any) {
  defaultVehicleFn({ vin: i.detail.value });
}
function closeSelect() {
  carSelectShow.value = false;
}
function selectCar() {
  carSelectShow.value = true;
}
function clickTab(e: any) {
  controlIndex.value = +e.target.dataset.index;
}
function changeSwiper(e: any) {
  let current = e.detail.current;
  swiperIndex.value = current;
  // run({ name: 'kkkk' });
}

function changeBottomSwiper(e: any) {
  let current = e.detail.current;
  controlIndex.value = current;
}
const carDetail: any = ref({});
function searchSuccess(value: any) {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  timer.value = setInterval(() => {
    getCarListFn();
  }, 6000);
  carDetail.value = value;
}
</script>

<template>
  <div style="overflow:hidden">
    <NoCar v-show="!isLogin" />
    <div v-show="isLogin">
      <nxScrollView
        ref="scrollRef"
        :cb-fn="findVehicleDefault"
        :is-lower-bottom="false"
        :params="{ pageSize: 10 }"
        :manual="true"
        @on-success="searchSuccess"
      >
        <template #list="{ list: detail }">
          <view class="content">
            <div class="top-box">
              <div class="car-title" @click="selectCar">
                <div class="mr-22rpx">
                  {{ detail.carLicense || detail.modelShowName }}
                </div>
                <van-icon name="play" size="32rpx" class="rotate-90" />
              </div>
              <div class="blue-box">
                <nx-image
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/4G_s.png"
                  width="48rpx"
                  height="48rpx"
                />
              </div>
              <div class="dot-box">
                <div :class="swiperIndex === 0 ? 'active-dot' : ''"></div>
                <div :class="swiperIndex === 1 ? 'active-dot' : ''"></div>
              </div>
              <div class="control-tab" @click="clickTab">
                <div :class="controlIndex === 0 ? 'active-tab' : ''" data-index="0" class="mr-64rpx">
                  远程控制
                </div>
                <div :class="controlIndex === 1 ? 'active-tab' : ''" data-index="1">
                  车主服务
                </div>
              </div>
              <swiper :current="swiperCurrent" class="w-770rpx h-724rpx" :duration="249" @change="changeSwiper">
                <swiper-item class="swiper-item">
                  <TopLeft :car-info="detail" />
                </swiper-item>
                <swiper-item class="swiper-item">
                  <TopRight :car-info="detail" />
                </swiper-item>
              </swiper>
            </div>
            <div class="bottom-box container pt-120rpx">
              <swiper :current="controlIndex" :duration="250" class="h-1000rpx" @change="changeBottomSwiper">
                <swiper-item class="control-swiper-item">
                  <BottomLeft
                    v-model:dialog="isShow"
                    v-model:id="btnId"
                    :car-info="detail"
                    @control-success="scrollRef?.search"
                  />
                </swiper-item>
                <swiper-item class="control-swiper-item">
                  <BottomRight :car-info="detail" />
                </swiper-item>
              </swiper>
            </div>
          </view>
        </template>
        <template #noData>
          <view class="content-box h-100vh w-100vw text-center">
            <image
              class="w-360rpx h-300rpx mt-494rpx"
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_car.png"
            />
            <p class="text-gray text-titleMedium">
              暂无车辆，请前往添加
            </p>
            <button
              class="mt-72rpx rounded-50rpx w-320rpx h-100rpx bg-buttonColor text-white text-32rpx lh-100rpx"
              @click="router.navigateTo({ name: 'carManagementBindCar' })"
            >
              添加车辆
            </button>
          </view>
        </template>
      </nxScrollView>
    </div>
    <PinInput type="box" />
    <van-action-sheet
      title="选择车辆"
      :show="carSelectShow"
      :actions="carList?.map(item => { return { name: (item.carLicense || '无车牌') + (item.defaultFlag ? '（默认车辆）' : ''), value: item.vin, subname: (item.vin + `(${item.isGrant ? '授权车辆' : ''})`) } }) || []"
      close-on-click-overlay
      close-on-click-action
      @select="confirm"
      @close="closeSelect"
    />
    <ControlDiaLog v-model="isShow" :btn-id="btnId" :car-info="carDetail" @control-success="scrollRef?.search" />
  </div>
</template>
<style lang="scss" scoped>
.top-box {
  width: 100%;
  position: relative;

  .control-tab {
    display: flex;
    left: 32rpx;
    position: absolute;
    bottom: -70rpx !important;
    z-index: 200;
    text-align: center;
    font-size: 32rpx;

    .active-tab {
      font-weight: bold;
    }
  }

  .blue-box {
    width: 100%;
    position: absolute;
    bottom: 5rpx !important;
    z-index: 1;
    text-align: center;
  }

  .dot-box {
    width: 100%;
    position: absolute;
    bottom: -15rpx !important;
    z-index: 1;
    display: flex;
    justify-content: center;

    view {
      height: 8rpx;
      width: 82rpx;
      background-color: #1E1E1E;
      margin-right: 8rpx;
      margin-left: 8rpx;
      border-radius: 8rpx;
      // &:first-child {
      //   border-radius: 8rpx;
      // }

      // &:nth-child(2) {
      //   border-radius: 0 8rpx 8rpx 0;
      // }
    }

    .active-dot {
      transition: background-color 0.3s;
      background-color: #ffffff;
    }
  }

  .car-title {
    font-size: 36rpx;
    display: flex;
    margin-bottom: 20rpx;
    position: absolute;
    z-index: 200;
    margin-left: 32rpx;
    top: 128rpx;
  }
}

.bottom-box {
  width: 100%;
  min-height: 700rpx;
  background: linear-gradient(180deg, #eef0f3 0%, #DADFE6 100%);
}
</style>

