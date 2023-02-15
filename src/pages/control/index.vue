<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import NoCar from './noCar/index.vue';
import TopLeft from './top/left.vue';
import TopRight from './top/right.vue';
import BottomLeft from './bottom/left.vue';
import BottomRight from './bottom/right.vue';
import ControlDiaLog from './components/ControlDiaLog.vue';
import PinInput from '@/components/pinInput/myp-one.vue';
import { CarInfo, controlItem } from './type';

import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { getList, getList2 } from '@/api/car/index';
import { debounce } from '../../utils/tool/index';

const router = useRouter();
const swiperIndex = ref<number>(0);
const controlIndex = ref<number>(0);
const swiperCurrent = ref<number>(0);
const carSelectShow = ref<boolean>(false);
const isLogin = ref(false);

onShow(() => {
  isLogin.value = uni.getStorageSync('isLogin');
});
const state = reactive({
  carInfo: {
    value: '1234',
    label: '川A123456',
    mile: '456',
    electricity: '70'
  } as CarInfo
});
const carList = ref<CarInfo[]>([
  {
    value: '1234',
    label: '川A123456',
    mile: '456',
    electricity: '75'
  },
  {
    value: '1334',
    label: '川A12256',
    mile: '480',
    electricity: '80'
  },
  {
    value: '1434',
    label: '川A128856',
    mile: '490',
    electricity: '90'
  }
]);
const selectList: CarInfo[] = carList.value.map((item) => {
  return { ...item, name: item.label };
});

const isShow = ref(false);
const btnId = ref(2);

// type GetBanner = Array<{ type: string }>
// type GetBannerParams = {
//   name: string;
// }
// getList2<GetBannerParams, GetBanner>({ name: '12345' }).then((res) => {
//   console.log(res[0].type);
// });
// function getUsername(): Promise<any> {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(`${String(Date.now())}`);
// 		}, 1000);
// 	});
// }
// const number = ref('test');

// const { run, data} = useRequest<GetBanner, GetBannerParams[]>(getList2, {
//   manual: true
// });
// watch(data, (n) => {
//   const num = data.value ?? [];
//   number.value = 'build';
//   console.log(num);
// });
// const { run: run2, data: data2} = useRequest<GetBanner, GetBannerParams[]>(getList, {
//   manual: true,
//   defaultParmas:[{name:'3333'}],
//   refreshDeps:[() => number],
//   refreshDepsParams:computed(() => [{name:'12345'}])
// });

// onMounted(() => {
//   getList();
// });
function confirm(i: any) {
  state.carInfo = carList.value.find((item) => item.value === i.detail.value) as CarInfo;
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

</script>

<template>
  <NoCar v-if="!isLogin" />
  <view v-else class="content">
    <div class="top-box">
      <div class="car-title" @click="selectCar">
        <div class="mr-22rpx">
          {{ state.carInfo.label }}
        </div>
        <van-icon name="play" size="32rpx" class="rotate-90" />
      </div>
      <div class="dot-box">
        <div :class="swiperIndex === 0 ? 'active-dot' : ''"></div>
        <div :class="swiperIndex === 1 ? 'active-dot' : ''"></div>
      </div>
      <div class="blue-box">
        <image src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/4G_s.png" />
      </div>
      <div class="control-tab" @click="clickTab">
        <div :class="controlIndex === 0 ? 'active-tab' : ''" data-index="0" class="mr-64rpx">
          远程控制
        </div>
        <div :class="controlIndex === 1 ? 'active-tab' : ''" data-index="1">
          车主服务
        </div>
      </div>
      <swiper :current="swiperCurrent" class="w-770rpx h-794rpx" :duration="250" @change="changeSwiper">
        <swiper-item class="swiper-item">
          <TopLeft :car-info="state.carInfo" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <TopRight />
        </swiper-item>
      </swiper>
    </div>
    <div class="bottom-box container pt-92rpx">
      <swiper :current="controlIndex" :duration="250" class="h-1000rpx" @change="changeBottomSwiper">
        <swiper-item class="control-swiper-item">
          <BottomLeft v-model:dialog="isShow" v-model:id="btnId" />
        </swiper-item>
        <swiper-item class="control-swiper-item">
          <BottomRight />
        </swiper-item>
      </swiper>
    </div>
    <van-action-sheet
      title="选择车辆"
      :show="carSelectShow"
      :actions="selectList"
      close-on-click-overlay
      close-on-click-action
      @select="confirm"
      @close="closeSelect"
    />
  </view>
  <PinInput type="box" />
  <ControlDiaLog v-model="isShow" :btn-id="btnId" />
</template>
<style lang="scss" scoped>
.top-box {
  width: 100%;
  position: relative;

  .control-tab {
    display: flex;
    left: 32rpx;
    position: absolute;
    bottom: -40rpx !important;
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
    bottom: 36rpx !important;
    z-index: 1;
    text-align: center;

    image {
      width: 48rpx;
      height: 48rpx;
    }
  }

  .dot-box {
    width: 100%;
    position: absolute;
    bottom: 116rpx !important;
    z-index: 1;
    display: flex;
    justify-content: center;

    view {
      height: 8rpx;
      width: 48rpx;
      background-color: #ffffff;

      &:first-child {
        border-radius: 6rpx 0 0 6rpx;
      }

      &:nth-child(2) {
        border-radius: 0 6rpx 6rpx 0;
      }
    }

    .active-dot {
      transition: background-color 0.3s;
      background-color: #1E1E1E;
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

