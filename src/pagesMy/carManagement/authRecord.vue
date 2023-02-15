<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';
import PinInput from '@/components/pinInput/myp-one.vue';

import dayjs from 'dayjs';
import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';
import { useConfig } from '../../store/modules/config';
const router = useRouter();
const {setPin, config} = useConfig();
const tabNameList = [{
  label: '我的车辆'
}, {
  label: '被授权车辆'
}];
function cancelAuth(){
  uni.showModal({
    title:'撤销授权',
    content:'确认撤销车辆京A·70499给18284032743的授权? 撤销后被授权人将失去对车辆的控制权，撤销前请确认被分享人用车安全。注:撤销车辆授权，同时也会撤销蓝牙钥匙的分享',
    confirmColor:'#FF933B',
    success: function (res) {
		if (res.confirm) {
  setPin(true);
		} else if (res.cancel) {
			console.log('用户点击取消');
		}
	}
  });
}
const active = ref(0);
</script>

<template>
  <div class="relative">
    <div class="p-32rpx flex items-start bg-pageBg h-200rpx box-border">
      <div>
        <nx-image
          :src="'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_car.png'"
          width="320rpx"
          height="128rpx"
        />
      </div>
      <div class="text-grayText ml-12rpx">
        <div class="text-titleMedium font-bold lh-46rpx">
          凯翼 FX12旗舰版
        </div>
        <div class="text-titleSmall lh-46rpx">
          车牌号:{{ 18234111342 }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          VIN:{{ 18234111342 }}
        </div>
      </div>
    </div>
    <nxScrollView :cb-fn="getList" :header-height="200" :params="{ pageSize: 2 }" :is-lower-bottom="false">
      <template #list="{ list }">
        <div class="p-32rpx">
          <div v-for="(item, index) in list" :key="index">
            <div
              class="mb-32rpx relative w-686rpx bg-white rounded-16rpx p-32rpx box-border"
            >
              <div class="flex justify-between">
                <div class="flex">
                  <div class="font-bold">
                    授权信息
                  </div>
                  <nx-image
                    class="ml-8rpx"
                    :src="item.modelName === '轩度26553' ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUsing.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseEnd.png'"
                    width="120rpx"
                    height="48rpx"
                  />
                </div>
                <div @click="router.navigateTo({ name: 'carManagementRecord', query: { item } })">
                  控车记录<van-icon name="arrow" />
                </div>
              </div>
              <div class="flex justify-between items-center p-y-48rpx">
                <div class="text-center">
                  <p class="text-46rpx font-bold">
                    12月07日
                  </p>
                  <p class="text-titleSmall text-lightGrayText">
                    12:52
                  </p>
                </div>
                <div class="border-lightGray border-b-4rpx w-68rpx relative arrow-right">
                </div>
                <div class="text-center">
                  <p class="text-46rpx font-bold">
                    12月07日
                  </p>
                  <p class="text-titleSmall text-lightGrayText">
                    12:52
                  </p>
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  被授权账号
                </div>
                <div class="text-lightGrayText">
                  12345
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  被授权人姓名
                </div>
                <div class="text-lightGrayText">
                  网络钥匙
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  授权钥匙
                </div>
                <div class="text-lightGrayText">
                  网络钥匙
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  授权时间
                </div>
                <div class="text-lightGrayText">
                  2022年07月15日17:10
                </div>
              </div>
              <button
                class="button-white lh-64rpx h-72rpx"
                @click="cancelAuth"
              >
                撤销授权
              </button>
            </div>
          </div>
        </div>
      </template>
      <template #noData>
        <div class="text-center mt-360rpx">
          <nx-image
            src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_data.png"
            width="360rpx"
            height="300rpx"
          />
          <div class="text-titleMedium text-grayText">
            暂无授权记录
          </div>
        </div>
      </template>
    </nxScrollView>
    <PinInput type="box" />
  </div>
</template>
<style scoped lang="scss">
.arrow-right::after {
  display: block;
  content: '';
  position: absolute;
  right: 0;
  bottom:3rpx;
  transform: rotate(60deg);
  height: 4rpx;
  width: 10rpx;
  background-color: #EEEEEE;
}
</style>
