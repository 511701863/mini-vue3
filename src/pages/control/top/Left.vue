<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';

import nxImage from '@/components/nxImage/nxImage.vue';

import { useRouter } from '@/router/router';
import { useRequest } from '@/hooks/useRequest/useRequst';
import dayjs from 'dayjs';

type TopLeftProps = {
  carInfo?: Control.VehiclLoveAo
}

const router = useRouter();
const props = defineProps<TopLeftProps>();

</script>

<template>
  <view>
    <nx-image
      src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_bg.png"
      width="770rpx"
      height="724rpx"
    />
    <div class="car-img">
      <image :src="props.carInfo?.modelImage" />
    </div>
    <div class="car-info container">
      <div class="flex" @click="router.navigateTo({name:'locationService',query:{vin:props.carInfo?.vin}})">
        <div class="address truncate">
          {{ props.carInfo?.vehicleCondition?.reportAddress || '--' }}
        </div>
        <van-icon name="arrow" size="25rpx" color="#262626" />
      </div>
      <div class="time">
        {{ props.carInfo?.vehicleCondition?.reportTime ?
          dayjs(props.carInfo?.vehicleCondition?.reportTime).format('YYYY/MM/DD HH:mm:ss ') : '--' }}
      </div>
      <div class="mile-info">
        <div class="mile-title">
          续航里程
        </div>
        <div class="flex value-box">
          <div class="mile-value">
            {{ props.carInfo?.vehicleCondition?.mileage !== '无效' && props.carInfo?.vehicleCondition?.mileage ? props.carInfo
              ?.vehicleCondition?.mileage : '--' }}
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
            {{ props.carInfo?.vehicleCondition?.oil !== '无效' && props.carInfo?.vehicleCondition?.oil ? props.carInfo
              ?.vehicleCondition?.oil : '--' }}
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
.car-info {
  position: absolute;
  top: 198rpx;
}

.car-img {
  position: absolute;
  left: 90rpx;
  top: 340rpx;

  image {
    width: 610rpx;
    height: 295rpx;
  }
}

.address {
  max-width: 650rpx;
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
  margin-top: 48rpx;
  font-size: 24rpx;

  .value-box {
    margin-left: -8rpx;
    align-items: flex-end;
    text-align: center;
    letter-spacing: 0rpx;

    .mile-value {
      margin-top: 6rpx;
      font-size: 62rpx;
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

