<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { CarInfo, controlItem } from '../type';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { getList, getList2 } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';

type TopLeftProps = {
  carInfo?:CarInfo
}

const router = useRouter();
const props = defineProps<TopLeftProps>();
console.log(props.carInfo);

const state = reactive({
});
</script>

<template>
  <view>
    <image src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_bg.png" />
    <div class="car-img">
      <image src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_car.png" />
    </div>
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
            {{ props.carInfo?.mile }}
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
            {{ props.carInfo?.electricity }}
          </div>
          <div class="mile-icon">
            %
          </div>
        </div>
      </div>
    </div>
  </view>
</template>
<style lang="scss" scoped>
image {
  width: 770rpx;
  height: 794rpx;
}

.car-info {
  position: absolute;
  top: 198rpx;
}

.car-img {
  position: absolute;
  right: 0;
  top: 350rpx;

  image {
    width: 638rpx;
    height: 288rpx;
  }
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
</style>

