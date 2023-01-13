<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { CarInfo, controlItem } from './type';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { getList, getList2 } from '@/api/car/index';
import { debounce } from '../../utils/tool/index';

const router = useRouter();
const swiperIndex = ref<number>(0);
const controlIndex = ref<number>(0);
const swiperCurrent = ref<number>(0);
const carSelectShow = ref<boolean>(false);
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
const airList = ref<controlItem[]>([{
  src: '../../static/carIcon/air-up.png',
  checkSrc: '../../static/carIcon/air-up-s.png',
  check: false,
  name: '急速升温'
},
{
  src: '../../static/carIcon/air-low.png',
  checkSrc: '../../static/carIcon/air-low-s.png',
  check: false,
  name: '极速降温'
}]);
const btnList = ref<controlItem[]>([{
  src: '../../static/carIcon/home_icon_lock_sel.png',
  checkSrc: '../../static/carIcon/home_icon_lock_sel_check.png',
  check: false,
  name: '门锁'
},
{
  src: '../../static/carIcon/home_icon_win_nor.png',
  checkSrc: '../../static/carIcon/home_icon_win_nor_check.png',
  check: false,
  name: '寻车'
},
{
  src: '../../static/carIcon/home_icon_skylight_nor.png',
  checkSrc: '../../static/carIcon/home_icon_skylight_nor_check.png',
  check: false,
  name: '后备箱'
},
{
  src: '../../static/carIcon/home_icon_engine_nor.png',
  checkSrc: '../../static/carIcon/home_icon_engine_nor_check.png',
  check: false,
  name: '发动机'
}
]);
type GetBanner = Array<{ type: string }>
type GetBannerParams = {
  name: string;
}
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
const number = ref('test');

const { run, data} = useRequest<GetBanner, GetBannerParams[]>(getList2, {
  manual: true
});
watch(data, (n) => {
  const num = data.value ?? [];
  number.value = 'build';
  console.log(num);
});
const { run: run2, data: data2} = useRequest<GetBanner, GetBannerParams[]>(getList, {
  manual: false,
  defaultParmas:[{name:'3333'}],
  refreshDeps:[() => number],
  refreshDepsParams:computed(() => [{name:'12345'}])
});

// onMounted(() => {
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
  controlIndex.value = e.target.dataset.index;
}
function changeSwiper(e: any) {
  let current = e.detail.current;
  swiperIndex.value = current;
  run({ name: 'kkkk' });
}

function changeBottomSwiper(e: any) {
  let current = e.detail.current;
  controlIndex.value = current;
}
// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
// function animationfinish(e: any) {
//   let current = e.detail.current;
//   swiperIndex.value = current;
// }

// function bottomAnimationfinish(e: any) {
//   let current = e.detail.current;
//   controlIndex.value = current;
// }

function clickControl(item: controlItem) {
  // run2({ name: '12345' });
  item.check = !item.check;
}
function goToAir() {
  router.navigateTo({ name: 'airControl' });
}
</script>

<template>
  <view class="content">
    <div class="top-box">
      <div class="car-title" @click="selectCar">
        <div class="platNo">
          {{ state.carInfo.label }}
        </div>
        <van-icon name="arrow-down" size="20rpx" />
      </div>
      <div class="dot-box">
        <div :class="swiperIndex === 0 ? 'active-dot' : ''"></div>
        <div :class="swiperIndex === 1 ? 'active-dot' : ''"></div>
      </div>
      <div class="blue-box">
        <image src="../../static/carIcon/checkBlu.png" />
      </div>
      <div class="control-tab" @click="clickTab">
        <div :class="controlIndex === 0 ? 'active-tab' : ''" data-index="0" class="mr-64rpx">
          远程控制
        </div>
        <div :class="controlIndex === 1 ? 'active-tab' : ''" data-index="1">
          车主服务
        </div>
        <div>{{ data }}</div>
      </div>
      <swiper :current="swiperCurrent" class="swiper-box" :duration="250" @change="changeSwiper">
        <swiper-item class="swiper-item">
          <image
            src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221122/web/1669107933232-938-carConfig.png"
          />
          <div class="car-info container">
            <div class="flex">
              <div class="address">
                成都市高新区茂业中心
              </div>
              <u-icon name="arrow-right" color="#262626" size="20" />
            </div>
            <div class="time">
              2022/06/16 15:24:41
            </div>
            <div class="mile-info">
              <div class="mile-title">
                续航里程
              </div>
              <div class="flex value-box">
                <div class="mile-value">
                  {{ state.carInfo.mile }}
                </div>
                <div class="mile-icon">
                  km
                </div>
              </div>
            </div>
            <div class="mile-info">
              <div class="mile-title">
                剩余油量
              </div>
              <div class="flex value-box">
                <div class="mile-value">
                  {{ state.carInfo.electricity }}
                </div>
                <div class="mile-icon">
                  %
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item class="swiper-item">
          <image
            src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672383193724-129-home2.png"
          />
        </swiper-item>
      </swiper>
    </div>
    <div class="bottom-box container">
      <swiper
        :current="controlIndex"
        :duration="250"
        class="control-swiper-box"
        :style="{ height: controlIndex === 0 ? '950rpx' : '1300rpx' }"
        @change="changeBottomSwiper"
      >
        <swiper-item class="control-swiper-item">
          <div class="control-card flex justify-between flex-wrap">
            <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="clickControl(item)">
              <img :src="item.check ? item.checkSrc : item.src">
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div class="control-card">
            <div class="mb-normal flex justify-between items-start">
              <div>
                空调
              </div>
              <van-icon name="arrow" size="24rpx" @click="goToAir" />
            </div>
            <div class="flex justify-between flex-wrap">
              <div class="icon-box">
                <div class="h-104rpx">
                  <span class="text-72rpx">19</span><span>.5℃</span>
                </div>
                <div>空调温度</div>
              </div>
              <div v-for="(item, index) in airList" :key="index" class="icon-box" @click="clickControl(item)">
                <img :src="item.check ? item.checkSrc : item.src">
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item class="control-swiper-item">
          <div class="control-card  flex justify-between flex-wrap">
            <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="clickControl(item)">
              <img :src="item.check ? item.checkSrc : item.src">
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div class="control-card  flex justify-between flex-wrap">
            <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="clickControl(item)">
              <img :src="item.check ? item.checkSrc : item.src">
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div class="control-card  flex justify-between flex-wrap">
            <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="clickControl(item)">
              <img :src="item.check ? item.checkSrc : item.src">
              <div>{{ item.name }}</div>
            </div>
          </div>
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
      width: 96rpx;
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
      background-color: #8A8E91;

      &:first-child {
        border-radius: 6rpx 0 0 6rpx;
      }

      &:nth-child(2) {
        border-radius: 0 6rpx 6rpx 0;
      }
    }

    .active-dot {
      transition: background-color 0.4s;
      background-color: #E1E3E8;
    }
  }

  .swiper-box {
    width: 770rpx;
    height: 794rpx;
  }

  image {
    width: 770rpx;
    height: 794rpx;
  }

  .car-title {
    font-size: 36rpx;
    display: flex;
    margin-bottom: 20rpx;
    position: absolute;
    z-index: 200;
    margin-left: 32rpx;
    top: 128rpx;

    .platNo {
      margin-right: 22rpx;
    }
  }

  .car-info {
    position: absolute;
    top: 198rpx;
  }

  .address {
    margin-right: 26rpx;
  }

  .time {
    margin-top: 8rpx;
    margin-bottom: 32px;
    font-size: 24rpx;
    color: #999999;
  }

  .mile-info {
    margin-left: 40rpx;
    margin-top: 28rpx;
    font-size: 24rpx;

    .value-box {
      margin-left: -8rpx;
      align-items: flex-end;
      text-align: center;
      letter-spacing: 0rpx;

      .mile-value {
        margin-top: 6rpx;
        font-size: 72rpx;
        font-weight: bold;
      }

      .mile-icon {
        margin-left: 8rpx;
        margin-bottom: 14rpx;
        color: #666666;
      }
    }

  }
}

.bottom-box {
  padding-top: 64rpx;
  width: 100%;
  min-height: 700rpx;
  background: linear-gradient(180deg, #f7f7f7 0%, #DADFE6 100%);
}

.control-card {
  padding: 32rpx;
  padding-bottom: 0rpx;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  background-color: #fff;
  box-sizing: border-box;
  width: 686rpx;

  .icon-box {
    margin: 0 35rpx;
    box-sizing: border-box;
    margin-bottom: 32rpx;
    text-align: center;
  }

  image {
    width: 96rpx;
    height: 96rpx;
  }
}
</style>

