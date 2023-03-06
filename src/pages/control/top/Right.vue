<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';

const router = useRouter();
type TopLeftProps = {
  carInfo?:Control.VehiclLoveAo
}
const props = defineProps<TopLeftProps>();
</script>

<template>
  <view>
    <image src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/swiper_2.png" class="relative bottom-60rpx" />
    <div class="car-info container left-8rpx">
      <div class="mile-info mt-76rpx">
        <div class="text-medium">
          左前轮胎温/胎压
        </div>
        <div class="flex value-box">
          <div class="mile-value">
            <span>{{ props.carInfo?.vehicleCondition?.lfTemperature || '--' }}</span>
            <span class="mile-icon text-medium">
              ℃ /
            </span>
            <span>{{ props.carInfo?.vehicleCondition?.lfPsi || '--' }}</span>
            <span class="mile-icon text-medium">
              Bar
            </span>
          </div>
        </div>
      </div>
      <div class="mile-info mt-130rpx">
        <div class="text-medium">
          左后轮胎温/胎压
        </div>
        <div class="flex value-box">
          <div class="mile-value">
            <span>{{ props.carInfo?.vehicleCondition?.lrTemperature || '--' }}</span>
            <span class="mile-icon text-medium">
              ℃ /
            </span>
            <span>{{ props.carInfo?.vehicleCondition?.lrPsi || '--' }}</span>
            <span class="mile-icon text-medium">
              Bar
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="car-info container right-8rpx">
      <div class="mile-info mt-76rpx">
        <div class="text-medium">
          右前轮胎温/胎压
        </div>
        <div class="flex value-box">
          <div class="mile-value">
            <span>{{ props.carInfo?.vehicleCondition?.rfTemperature || '--' }}</span>
            <span class="mile-icon text-medium">
              ℃ /
            </span>
            <span>{{ props.carInfo?.vehicleCondition?.rfPsi || '--' }}</span>
            <span class="mile-icon text-medium">
              Bar
            </span>
          </div>
        </div>
      </div>
      <div class="mile-info mt-130rpx">
        <div class="text-medium">
          右后轮胎温/胎压
        </div>
        <div class="flex value-box">
          <div class="mile-value">
            <span>{{ props.carInfo?.vehicleCondition?.rrTemperature || '--' }}</span>
            <span class="mile-icon text-medium">
              ℃ /
            </span>
            <span>{{ props.carInfo?.vehicleCondition?.rrPsi || '--' }}</span>
            <span class="mile-icon text-medium">
              Bar
            </span>
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

.mile-info {
  font-size: 24rpx;

  .value-box {
    margin-left: -8rpx;
    align-items: flex-end;
    text-align: center;
    letter-spacing: 0rpx;

    .mile-value {
      margin-top: 12rpx;
      font-size: 48rpx;
      font-weight: bold;
    }

    .mile-icon {
      font-weight: 300;
      margin-bottom: 14rpx;
      color: #666666;
    }
  }

}
</style>

