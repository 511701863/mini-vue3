<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import PinInput from '@/components/pinInput/myp-one.vue';

import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { findVehicleDefault, collection, controlAir, controlHeating, controlVentilation } from '../../api/control/index';
import { controlItem } from '../../pages/control/type';
import { useConfig } from '@/store/modules/config';
import { useCheckRes } from '../../hooks/useRequest/useCheckRes';
const { setPin, config } = useConfig();
const router = useRouter();
const controlIndex = ref<number>(0);
//起始温度
const acTemp: any = ref('');
//起始挡位
const acGear: any = ref('');
const hasCollecList: any = ref([]);
const { run: collectionFnLeft, data: abilityListLeft } = useRequest<Control.AbilityVo>(collection, {
  manual: true,
  onSuccess: () => {
    hasCollecList.value = abilityListLeft.value?.abilityCollections?.map((item) => item.ability);
    airList.value = airSource.map((item) => {
      if (item.checkCode) {
        if (carInfo?.value?.vehicleCondition?.engineSts && carInfo?.value?.vehicleCondition?.acWorkingSts) {
          item.check = carInfo.value?.vehicleCondition?.[item.checkCode];
        } else {
          item.check = false;
        }
      }
      return item;
    });
    if (hasCollecList.value.includes('acControl')) {
      swiperList.value = airLevel.value;
      if ((carInfo?.value?.vehicleCondition?.acTemp ?? null) && carInfo?.value?.vehicleCondition?.engineSts && carInfo?.value?.vehicleCondition?.acWorkingSts) {
        acTemp.value = carInfo?.value?.vehicleCondition?.acTemp ? +carInfo.value.vehicleCondition.acTemp : '';
        airIndex.value = airLevel.value.findIndex((item) => item.value === acTemp.value);
      } else {
        acTemp.value = '';
        airIndex.value = 0;
      }
    } else {
      swiperList.value = airGrade.value;
      if ((carInfo.value && carInfo.value.vehicleCondition.acGear.indexOf('档') > -1) && carInfo?.value?.vehicleCondition?.engineSts && carInfo?.value?.vehicleCondition?.acWorkingSts) {
        acGear.value = carInfo.value.vehicleCondition.acGear.substring(0, carInfo.value.vehicleCondition.acGear.indexOf('档'));
        airIndex.value = airGrade.value.findIndex((item) => item.value === +acGear.value);
      } else {
        acGear.value = '';
        airIndex.value = 0;
      }
    }

  }
});
const airList = ref<controlItem[]>([]);
const airSource: controlItem[] = [{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8_s.png',
  check: false,
  checkCode: 'acHeatUpSts',
  id: 7,
  name: '急速升温'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7_s.png',
  check: false,
  checkCode: 'acHeatDownSts',
  id: 8,
  name: '极速降温'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_9.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_9_s.png',
  check: false,
  checkCode: 'frontDefrostSts',
  id: 9,
  name: '前除霜'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_10.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_10_s.png',
  check: false,
  checkCode: 'airCleanSts',
  id: 10,
  name: '空气净化'
}];

function clickTab(e: any) {
  controlIndex.value = e.target.dataset.index;
}
function changeSwiper(e: any) {
  let current = e.detail.current;
  controlIndex.value = current;
}

const airLevel = ref<Record<'label' | 'value', any>[]>([{ 'label': '--', 'value': '' }, { 'label': 'LO', 'value': 17.5 }, { 'label': 18, 'value': 18 }, { 'label': 18.5, 'value': 18.5 }, { 'label': 19, 'value': 19 }, { 'label': 19.5, 'value': 19.5 }, { 'label': 20, 'value': 20 }, { 'label': 20.5, 'value': 20.5 }, { 'label': 21, 'value': 21 }, { 'label': 21.5, 'value': 21.5 }, { 'label': 22, 'value': 22 }, { 'label': 22.5, 'value': 22.5 }, { 'label': 23, 'value': 23 }, { 'label': 23.5, 'value': 23.5 }, { 'label': 24, 'value': 24 }, { 'label': 24.5, 'value': 24.5 }, { 'label': 25, 'value': 25 }, { 'label': 25.5, 'value': 25.5 }, { 'label': 26, 'value': 26 }, { 'label': 26.5, 'value': 26.5 }, { 'label': 27, 'value': 27 }, { 'label': 27.5, 'value': 27.5 }, { 'label': 28, 'value': 28 }, { 'label': 28.5, 'value': 28.5 }, { 'label': 29, 'value': 29 }, { 'label': 29.5, 'value': 29.5 }, { 'label': 30, 'value': 30 }, { 'label': 30.5, 'value': 30.5 }, { 'label': 31, 'value': 31 }, { 'label': 31.5, 'value': 31.5 }, { 'label': 32, 'value': 32 }, { 'label': 'Hi', 'value': 32.5 }]);
const airGrade = ref<Record<'label' | 'value', any>[]>([{ 'label': '--', 'value': '' }, { 'label': 'LO', 'value': 1 },
{ 'label': '2档', 'value': 2 }, { 'label': '3档', 'value': 3 }, { 'label': '4档', 'value': 4 },
{ 'label': '5档', 'value': 5 }, { 'label': '6档', 'value': 6 },
{ 'label': '7档', 'value': 7 }, { 'label': '8档', 'value': 8 },
{ 'label': '9档', 'value': 9 }, { 'label': '10档', 'value': 10 },
{ 'label': '11档', 'value': 11 }, { 'label': '12档', 'value': 12 },
{ 'label': '13档', 'value': 13 }, { 'label': '14档', 'value': 14 },
{ 'label': '15档', 'value': 15 }, { 'label': 'Hi', 'value': 16 }]);
const swiperList: any = ref([]);
const airIndex: any = ref(0);
const { run: findVehicleDefaultFn, data: carInfo } = useRequest<Control.VehiclLoveAo>(findVehicleDefault, {
  manual: false,
  onSuccess: () => {
    collectionFnLeft({ vin: carInfo.value?.vin, abilityType: 0 });

  }
});
function animationFinishFn(e: any) {

  let current = +e.detail.current;
  airIndex.value = current;
  //如果是原来的数值 则不执行
  let flag: any = '';
  if (hasCollecList.value.includes('acControl')) {
    flag = acTemp.value;
  } else {
    flag = acGear.value;
  }
  if (+e.detail.currentItemId !== +flag) {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
    timer.value = setTimeout(() => {
      if (carInfo.value?.authState !== 3) {
        uni.showModal({
          title: '提示',
          content: `当前默认车辆“${carInfo.value?.vin}”还未进行实名认证，请前往APP认证`,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
        return;
      }
      if (current === 0) {
        setPin(true, 0, controlAirFn, { vin: carInfo.value?.vin, destStatus: 'OFF' });
        return;
      }
      if (hasCollecList.value.includes('acControl')) {
        const params = { vin: carInfo.value?.vin, temperature: +e.detail.currentItemId, destStatus: 'ON' };
        setPin(true, 0, controlAirFn, params);
      } else {
        const params = { vin: carInfo.value?.vin, tempLevel: +e.detail.currentItemId, destStatus: 'ON' };
        setPin(true, 0, controlAirFn, params);
      }
    }, 2000);
  }
}
//空调
const { run: controlAirFn } = useCheckRes(controlAir, findVehicleDefaultFn);
//座椅加热
const { run: controlHeatingFn } = useCheckRes(controlHeating, findVehicleDefaultFn);
//座椅通风
const { run: controlVentilationFn } = useCheckRes(controlVentilation, findVehicleDefaultFn);
const timer: any = ref(null);
function changeAirSwiper(e: any) {
  console.log(1);
}
function transitionSwiper() {
  clearInterval(timer.value);
  timer.value = null;
}
function clickControl(item: controlItem) {
  if (carInfo.value?.authState !== 3) {
    uni.showModal({
      title: '提示',
      content: `当前默认车辆“${carInfo.value?.vin}”还未进行实名认证，请前往APP认证`,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
    return;
  }
  switch (item.id) {
    case 5:
      controlAirFn({ vin: carInfo.value?.vin, destStatus: 'OFF' });
      break;
    case 7:
      if (hasCollecList.value.includes('acControl')) {
        controlAirFn({ vin: carInfo.value?.vin, temperature: 31.5, destStatus: 'ON' });
      } else {
        controlAirFn({ vin: carInfo.value?.vin, tempLevel: 15, destStatus: 'ON' });
      }
      break;
    case 8:
      if (hasCollecList.value.includes('acControl')) {
        controlAirFn({ vin: carInfo.value?.vin, temperature: 19.5, destStatus: 'ON' });
      } else {
        controlAirFn({ vin: carInfo.value?.vin, tempLevel: 1, destStatus: 'ON' });
      }
      break;
    case 9:
      controlAirFn({ vin: carInfo.value?.vin, defrost: !item.check, destStatus: 'ON' });
      break;
    case 10:
      controlAirFn({ vin: carInfo.value?.vin, cleanAir: !item.check, destStatus: 'ON' });
      break;
    case 11:
      controlHeatingFn({ vin: carInfo.value?.vin, destLevel: item.check ? 'LEVEL0' : 'LEVEL3', destSeat: 'LF' });
      break;
    case 12:
      controlHeatingFn({ vin: carInfo.value?.vin, destLevel: item.check ? 'LEVEL0' : 'LEVEL3', destSeat: 'RF' });
      break;
    case 13:
      controlVentilationFn({ vin: carInfo.value?.vin, destLevel: item.check ? 'LEVEL0' : 'LEVEL3', destSeat: 'LF' });
      break;
    case 14:
      controlVentilationFn({ vin: carInfo.value?.vin, destLevel: item.check ? 'LEVEL0' : 'LEVEL3', destSeat: 'RF' });
      break;
    default:
      console.log('无');
  }
}
</script>

<template>
  <view class="content">
    <div class="top-box">
      <div class="control-tab" @click="clickTab">
        <div :class="controlIndex === 0 ? 'active-tab' : ''" data-index="0" class="tab-box">
          空调
        </div>
        <div :class="controlIndex === 1 ? 'active-tab' : ''" data-index="1" class="tab-box">
          座椅
        </div>
        <div :class="controlIndex === 1 ? 'right-flag' : 'left-flag'" class="select-flag"></div>
      </div>
      <div class="swiper-item">
        <image src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221209/web/1670576520958-517-air.png" />
      </div>
    </div>
    <div class="bottom-box container">
      <swiper
        :current="controlIndex"
        :duration="250"
        class="control-swiper-box"
        :style="{ height: controlIndex === 0 ? '950rpx' : '1300rpx' }"
        @change="changeSwiper"
      >
        <swiper-item class="control-swiper-item" :catchtouchmove="false">
          <h1 class="text-xl font-bold">
            空调
          </h1>
          <p class="text-gray400 text-sm mt-normal">
            温馨提示：空调开启10分钟后将自动关闭
          </p>
          <div class="flex justify-center pt-68rpx">
            <div class="relative">
              <swiper
                v-if="swiperList.length"
                :current="airIndex"
                :duration="250"
                previous-margin="268rpx"
                next-margin="180rpx"
                class="h-80rpx w-700rpx flex items-end"
                @animationfinish="animationFinishFn"
                @change="changeAirSwiper"
                @transition="transitionSwiper"
              >
                <swiper-item
                  v-for="(item, index) in swiperList"
                  :key="item.value"
                  :class="airIndex === index ? 'active-dot' : ''"
                  :item-id="item.value"
                  class="swiper-item-air"
                >
                  {{ item.label }}
                </swiper-item>
              </swiper>
              <div class="transBox h-80rpx w-120rpx absolute left-0 bottom-0">
              </div>
              <div class="transBoxRight h-80rpx w-120rpx absolute right-0 bottom-0">
              </div>
            </div>
          </div>
          <div class="text-medium mt-mini text-center pb-68rpx">
            {{ hasCollecList.includes('acControl') ? '空调温度' : '空调档位' }}
          </div>
          <div class="control-card">
            <div class="flex justify-between">
              <div
                v-for="(item, index) in airList"
                :key="index"
                class="icon-box"
                @click="setPin(true, 0, clickControl, item)"
              >
                <nx-image :src="item.check ? item.checkSrc : item.src" width="96rpx" height="96rpx" />
                <div class="text-medium mt-mini">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <van-button
              :disabled="!carInfo?.vehicleCondition?.engineSts || !carInfo?.vehicleCondition?.acWorkingSts"
              round
              type="default"
              size="large"
              @click="setPin(true, 0, clickControl, { id: 5 })"
            >
              关闭空调
            </van-button>
          </div>
        </swiper-item>
        <swiper-item class="control-swiper-item" :catchtouchmove="false">
          <h1 class="text-xl font-bold">
            座椅
          </h1>
          <p class="text-gray400 text-sm mt-normal">
            温馨提示：座椅加热通风只有主驾副驾有此功
          </p>
          <div class="set-box">
            <img
              src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370835156-427-setBox.png"
            >
            <div class="flex set-icon">
              <div v-if="hasCollecList.includes('seatHeateDriver')" class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  主驾加热
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  :src="carInfo?.vehicleCondition?.['lfSeatHeatSts'] ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_11_s.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_11.png'"
                  @click="setPin(true, 0, clickControl, { id: 11, check: carInfo?.vehicleCondition?.['lfSeatHeatSts'] })"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
              <div v-if="hasCollecList.includes('seatHeateCopilot')" class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  副驾加热
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  :src="carInfo?.vehicleCondition?.['rfSeatHeatSts'] ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_12_s.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_12.png'"
                  @click="setPin(true, 0, clickControl, { id: 12, check: carInfo?.vehicleCondition?.['rfSeatHeatSts'] })"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
            </div>
            <div class="flex set-icon2">
              <div v-if="hasCollecList.includes('seatVentilateDriver')" class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  主驾通风
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  :src="carInfo?.vehicleCondition?.['lfSeatVentilateSts'] ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_13_s.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_13.png'"
                  @click="setPin(true, 0, clickControl, { id: 13, check: carInfo?.vehicleCondition?.['lfSeatVentilateSts'] })"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
              <div v-if="hasCollecList.includes('seatVentilateCopilot')" class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  副驾通风
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  :src="carInfo?.vehicleCondition?.['rfSeatVentilateSts'] ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_14_s.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_14.png'"
                  @click="setPin(true, 0, clickControl, { id: 14, check: carInfo?.vehicleCondition?.['rfSeatVentilateSts'] })"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <NxTab />
    <!-- <u-select v-model="carSelectShow" :list="carList" @confirm="confirm" /> -->
    <PinInput type="box" />
  </view>
</template>
<style lang="scss" scoped>
.transBox {
  background: linear-gradient(90deg, rgba(255, 255, 255, .9) 30%, rgba(255, 255, 255, .3) 100%);
}

.transBoxRight {
  background: linear-gradient(90deg, rgba(255, 255, 255, .3) 30%, rgba(255, 255, 255, .9) 100%);
}

.swiper-item-air {
  width: 160rpx !important;
  height: 60rpx !important;
  font-size: 40rpx;
  margin-top: 16rpx;
  display: table-cell;
  vertical-align: bottom;
  text-align: center;
}

.active-dot {
  font-size: 60rpx;
  margin-top: 0rpx;
  font-weight: bold;
  height: 100% !important;
}

.top-box {
  width: 100%;
  position: relative;

  .control-tab {
    display: flex;
    justify-content: space-between;
    position: absolute;
    height: 96rpx;
    width: 750rpx;
    line-height: 96rpx;
    top: 0;
    z-index: 201;
    text-align: center;
    font-size: 32rpx;

    .active-tab {
      font-weight: bold;
    }

    .select-flag {
      z-index: 201;
      width: 100rpx;
      height: 6rpx;
      background-color: #000;
      position: absolute;
      bottom: 10rpx;
    }

    .right-flag {
      transition: right 0.2s;
      right: 140rpx;
    }

    .left-flag {
      transition: right 0.2s;
      right: 510rpx;
    }

    .tab-box {
      position: relative;
      width: 50%;
    }
  }

  image {
    width: 750rpx;
    height: 950rpx;
    position: relative;
    top: -200rpx;
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
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 40rpx;
  box-sizing: border-box;
  width: 750rpx;
  height: 764rpx;
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
}

.set-box {
  position: relative;
  display: flex;
  justify-content: center;

  image {
    width: 536rpx;
    height: 648rpx;
  }

  .set-icon {
    position: absolute;
    top: 70rpx;
    left: 160rpx;
  }

  .set-img {
    margin-left: 24rpx;
    width: 144rpx;
    height: 208rpx;
  }

  .set-img-top {
    width: 96rpx;
    height: 96rpx;
  }

  .set-icon2 {
    position: absolute;
    top: 330rpx;
    left: 160rpx;
  }
}

.control-card {
  padding: 32rpx 16rpx 32rpx 16rpx;
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

