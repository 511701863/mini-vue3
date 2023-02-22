<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';

import nxImage from '@/components/nxImage/nxImage.vue';

import { useRouter } from '@/router/router';

const router = useRouter();
const swiperIndex = ref<number>(0);
const controlIndex = ref<number>(1);
const carSelectShow = ref<boolean>(false);
const state = reactive({

});

const airList = ref([{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8_s.png',
  check: false,
  name: '急速升温'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7_s.png',
  check: false,
  name: '极速降温'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_9.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_9_s.png',
  check: false,
  name: '前除霜'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_10.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_10_s.png',
  check: false,
  name: '空气净化'
}]);
// onMounted(() => {
// });

function closeSelect() {
  carSelectShow.value = false;
}
function selectCar() {
  carSelectShow.value = true;
}
function clickTab(e: any) {
  controlIndex.value = e.target.dataset.index;
  // wx.exitMiniProgram({
  //     success: function(res:any) {
  //       console.log(res);

  //     }
  // });
}
function changeSwiper(e: any) {
  let current = e.detail.current;
  controlIndex.value = current;
}
// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
// function bottomAnimationfinish(e: any) {
//   let current = e.detail.current;
//   controlIndex.value = current;
// }

function clickControl(item: any) {
  item.check = !item.check;
}
function goToAir() {
  router.navigateTo({ name: 'airControl' });
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
        <image
          src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221209/web/1670576520958-517-air.png"
        />
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
        <swiper-item class="control-swiper-item">
          <h1 class="text-xl font-bold">
            空调
          </h1>
          <p class="text-gray400 text-sm mt-normal">
            温馨提示：空调开启10分钟后将自动关闭
          </p>
          <div class="flex justify-center pt-68rpx">
            <span class="text-68rpx text-grayText font-bold">--</span>
          </div>
          <div class="text-medium mt-mini text-center pb-68rpx">
            空调温度
          </div>
          <div class="control-card">
            <div class="flex justify-between">
              <div v-for="(item, index) in airList" :key="index" class="icon-box" @click="clickControl(item)">
                <nx-image
                  :src="item.check ? item.checkSrc : item.src"
                  width="96rpx"
                  height="96rpx"
                />
                <div class="text-medium mt-mini">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <van-button round type="default" size="large">
              关闭空调
            </van-button>
          </div>
        </swiper-item>
        <swiper-item class="control-swiper-item">
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
              <div class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  主驾加热
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_11.png"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
              <div class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  副驾加热
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_12.png"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
            </div>
            <div class="flex set-icon2">
              <div class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  主驾通风
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_13.png"
                >
                <img
                  class="set-img"
                  src="https://staging-tsp-1308146855.cos.ap-shanghai.myqcloud.com/20221230/web/1672370875096-259-setImg.png"
                >
              </div>
              <div class="text-center relative">
                <p class="text-sm ml-3 mb-mini">
                  副驾通风
                </p>
                <img
                  class="set-img-top absolute top-68rpx left-49rpx"
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_14.png"
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
  </view>
</template>
<style lang="scss" scoped>
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
  width: 686rpx;
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

