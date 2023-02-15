<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import PinInput from '@/components/pinInput/myp-one.vue';

import { pushMsg, getList } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';
import { useConfig } from '../../store/modules/config';

const { setPin, config } = useConfig();
const router = useRouter();
const carInfo = ref({
  warning: false
});
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
function unBind() {
  uni.showModal({
    title: '撤销授权',
    content: `您正在解绑车牌号为${'川A·88888'}的车辆，请确认是否继续?`,
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
const { run, data } = useRequest(getList, {
  manual: true,
  onSuccess: () => {
    carInfo.value.warning = !carInfo.value.warning;
  }
});
function changeWarning(num:number) {
  return () => {
    run({ pageSize: num, pageIndex: 2 });
  };
}
</script>

<template>
  <div class="relative bg-pageBg h-100vh p-32rpx box-border">
    <div class="mt-180rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border">
      <div class="flex flex-wrap justify-center items-center">
        <div class="flex mt-123rpx">
          <div class="w-64rpx h-36rpx border-1rpx border-buttonColor mr-6rpx text-24rpx lh-36rpx text-center">
            默认
          </div>
          <div class="font-bold">
            COWIN FX12旗舰版
          </div>
        </div>
        <div class="mt-14rpx text-24rpx text-grayText w-622rpx text-center">
          VIN：COWINKEY00000000
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx mt-80rpx">
          <div>
            4S店
          </div>
          <div>
            成都国贸经销商
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            发动机号
          </div>
          <div>
            FDJ80991
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            车牌号
          </div>
          <div>
            川A·VV666
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            实名认证
          </div>
          <div>
            未认证
          </div>
        </div>
        <div class="w-622rpx flex justify-between p-y-32rpx">
          <div>
            防盗告警
          </div>
          <div>
            <van-switch :checked="carInfo.warning" active-color="#00C682" @change="setPin(true, 0, changeWarning(4))" />
          </div>
        </div>
      </div>
      <div class="absolute top--132rpx right-45rpx">
        <image
          class="w-600rpx h-258rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_car.png"
        />
      </div>
    </div>
    <div>
      <button class="button-white" @click="setDefault">
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
