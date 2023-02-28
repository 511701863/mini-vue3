<script setup lang="ts">
import { ref, reactive, Ref, computed, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import PinInput from '@/components/pinInput/myp-one.vue';

import type { VehicleAppDetailAo } from '../../api/types/carConfigType';

import { findVehicleDetailInfo, defaultVehicle, unBindVehicle } from '@/api/my/carManagement';
import { checkRes, stolenAlarm } from '../../api/control/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useConfig } from '../../store/modules/config';
import { useCheckRes } from '../../hooks/useRequest/useCheckRes';

const { setPin, config } = useConfig();
const router = useRouter();
const { run: defaultVehicleFn } = useRequest<any, any>(defaultVehicle, {
  manual: true,
  onSuccess:() => {
    findVehicleDetailInfoFn({ vin:carVin.value });
  }
});
const carVin: any = ref('');
const { run: findVehicleDetailInfoFn, data: carData } = useRequest<VehicleAppDetailAo>(findVehicleDetailInfo, {
  manual: true
});
const { run: unBindVehicleFn} = useRequest(unBindVehicle, {
  manual: true,
  onSuccess:() => {
    router.navigateBack({});
  }
});
onLoad((query) => {
  const { vin } = query;
  carVin.value = vin;
  findVehicleDetailInfoFn({ vin });
});
function setDefault() {
  uni.showModal({
    title: '默认车辆',
    content: '请确认将此车辆替换为默认车辆？默认车辆将展示在爱车首页',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        defaultVehicleFn({vin:carVin.value});
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const authType = {
  1: '未实名',
  2: '认证中',
  3: '认证成功',
  '-1': '认证失败'
};
function unBind() {
  uni.showModal({
    title: '撤销授权',
    content: `您正在解绑车牌号为${carData.value?.carLicense}的车辆，请确认是否继续?`,
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        setPin(true, 0, () => {unBindVehicleFn({vin:carVin.value});});
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}

const { run:runCheck, data:checkData } = useCheckRes(stolenAlarm, findVehicleDetailInfoFn, {params:{ vin:carVin.value }});

function changeWarning() {
  return () => {
    runCheck({ vin: carVin.value, destStatus: carData.value?.isTheftAlarm ? 'OFF' : 'ON' });
  };
}

</script>

<template>
  <div class="relative bg-pageBg h-100vh p-32rpx box-border">
    <div class="mt-180rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border">
      <div class="flex flex-wrap justify-center items-center">
        <div class="flex mt-123rpx">
          <div
            v-if="carData?.defaultFlag"
            class="w-64rpx h-36rpx border-1rpx border-buttonColor mr-6rpx text-24rpx lh-36rpx text-center"
          >
            默认
          </div>
          <div class="font-bold">
            {{ carData?.modelShowName }}
          </div>
        </div>
        <div class="mt-14rpx text-24rpx text-grayText w-622rpx text-center">
          VIN：{{ carData?.vin }}
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx mt-80rpx">
          <div>
            4S店
          </div>
          <div>
            {{ carData?.salesAreaName }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            发动机号
          </div>
          <div>
            {{ carData?.engineNumber }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车牌号
          </div>
          <div>
            {{ carData?.carLicense }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            实名认证
          </div>
          <div>
            {{ authType[carData?.authState || -1] }}
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            防盗告警
          </div>
          <div>
            <van-switch
              :checked="carData?.isTheftAlarm"
              active-color="#00C682"
              @change="setPin(true, 0, changeWarning())"
            />
          </div>
        </div>
      </div>
      <div class="absolute top--132rpx right-45rpx">
        <image
          class="w-600rpx h-258rpx"
          :src="carData?.modelImage"
        />
      </div>
    </div>
    <div>
      <button v-if="!carData?.defaultFlag" class="button-white" @click="setDefault">
        设为默认车辆
      </button>
      <button class="button-primary w-686rpx  mt-16rpx" @click="unBind">
        解绑车辆
      </button>
    </div>
  </div>
  <PinInput type="box" />
</template>
<style scoped lang="scss">
.car-number:nth-child(2) {
  position: relative;
  margin-right: 24rpx;
}

.car-number:nth-child(2)::after {
  position: absolute;
  content: '·';
  right: -22rpx;
}
</style>
