<script setup lang="ts">
import { ref, reactive, Ref, computed, nextTick } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';
import PinInput from '@/components/pinInput/myp-one.vue';

import type { VehicleExteriorAo } from '@/api/types/carConfigType';

import dayjs from 'dayjs';
import { findMyVehicleList, findAuthorizedVehicleList } from '@/api/my/carManagement';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useConfig } from '../../store/modules/config';

// const { run: findMyVehicleListFn, data: carList } = useRequest<VehicleExteriorAo>(findMyVehicleList, {
//   manual: false,
//   onSuccess: () => {
//     console.log(carList);
//   }
// });
const noticeShow = ref(false);
const scrollRef: any = ref(null);
const router = useRouter();
const { setPin, config } = useConfig();
const tabNameList = [{
  label: '我的车辆'
}, {
  label: '被授权车辆'
}];
const authType = {
  1: '未实名',
  2: '认证中',
  3: '认证成功',
  '-1': '认证失败'
};
onShow(() => {
  nextTick(() => {
    console.log(scrollRef.value);
    scrollRef.value.forEach((item: any) => {
      item.search();
    });
  });
});
const active = ref(0);
const authCarITem = ref<VehicleExteriorAo>({
});
function clickBtn(name: any, item: VehicleExteriorAo, auth = true) {
  if (item.authState !== 3 && auth) {
    uni.showToast({
      title: '功能不可用,请前往凯翼汽车APP完成实名认证',
      icon: 'none'
    });
    return;
  }
  if (name === 'carManagementCarAuth') {
    authCarITem.value = item;
    noticeShow.value = true;
    return;
  }
  router.navigateTo({ name: name, query: { id: item.id, vin: item.vin, name: item.modelShowName, carLicense: item.carLicense, imgUrl: item.modelImage } });
}
function goToAuth(){
  setPin(true, 0, () => {router.navigateTo({name:'carManagementCarAuth', query:{...authCarITem.value}});});
}

function UserPrivacy() {
  router.navigateTo({
    name: 'baseH5',
    query: {
      path: '/privacy'
    }
  });
}
const checkout = ref(false);
const agree = () => {
  checkout.value = !checkout.value;
};
</script>

<template>
  <div class="relative">
    <van-tabs
      class="bg-pageBg"
      :active="active"
      title-active-color="#000000"
      swipeable
      color="#F8F9F9"
      animated
      sticky
    >
      <van-tab v-for="(tabItem, tabIndex) in tabNameList" :key="tabItem.label" :title="tabItem.label">
        <div>
          <nxScrollView
            ref="scrollRef"
            :cb-fn="tabIndex === 0 ? findMyVehicleList : findAuthorizedVehicleList"
            :header-height="64"
            :is-lower-bottom="false"
            :manual="true"
          >
            <template #list="{ list }">
              <div class="p-32rpx">
                <div v-for="(item, index) in list as VehicleExteriorAo[]" :key="index">
                  <div
                    class="mt-180rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border"
                    @click="clickBtn(tabIndex === 0 ? 'carManagementDetail' : 'carManagementAuthDetail', item,false)"
                  >
                    <div v-if="tabIndex === 0" class="flex flex-wrap justify-center items-center">
                      <div class="flex mt-123rpx items-center">
                        <div
                          v-if="item.defaultFlag"
                          class="w-64rpx h-36rpx border-1rpx border-buttonColor mr-6rpx text-24rpx lh-36rpx text-center"
                        >
                          默认
                        </div>
                        <div class="font-bold">
                          {{ item.modelShowName }}
                        </div>
                      </div>
                      <div class="mt-14rpx text-24rpx text-grayText w-622rpx text-center">
                        VIN：{{ item.vin }}
                      </div>
                      <div class="flex items-center mt-32rpx">
                        <div
                          v-for="(nItem, nIndex) in (item.carLicense ? item.carLicense : '-------').split('')"
                          :key="nIndex"
                          class="car-number w-52rpx h-72rpx rounded-8rpx border-1rpx border-lightGray text-center lh-64rpx m-x-4rpx"
                        >
                          {{ nItem }}
                        </div>
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx mt-32rpx">
                        <div class="font-bold">
                          实名认证
                        </div>
                        <div>
                          {{ authType[item.authState || -1] }}
                        </div>
                      </div>
                      <!-- <div class="w-622rpx flex justify-between p-y-32rpx">
                            <div class="font-bold">
                              蓝牙钥匙
                            </div>
                            <div>
                              已激活
                            </div>
                          </div> -->
                      <div class="mt-32rpx flex justify-around">
                        <button
                          class="button-white lh-64rpx h-72rpx w-196rpx border-lightGray mr-16rpx"
                          @click.stop="clickBtn('carManagementRecord', item)"
                        >
                          控车记录
                        </button>
                        <button
                          class="button-white lh-64rpx h-72rpx w-196rpx border-lightGray mr-16rpx"
                          @click.stop="clickBtn('carManagementAuthRecord', item)"
                        >
                          授权记录
                        </button>
                        <button
                          class="button-white lh-64rpx h-72rpx w-196rpx border-lightGray"
                          @click.stop="clickBtn('carManagementCarAuth', item)"
                        >
                          车辆授权
                        </button>
                      </div>
                    </div>
                    <div v-else class="flex flex-wrap justify-center items-center">
                      <div class="flex mt-123rpx relative">
                        <div class="font-bold">
                          {{ item.carLicense ? item.carLicense : '暂无车牌' }}
                        </div>
                        <nx-image
                          class="absolute right--154rpx top-0"
                          :src="item.grantStatus === 1 ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUsing.png' : item.grantStatus === 0 ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseEnd.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseBack.png'"
                          width="120rpx"
                          height="48rpx"
                        />
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx mt-32rpx">
                        <div class="font-bold">
                          授权信息
                        </div>
                        <div @click="clickBtn('carManagementGainRecord', item)">
                          控车记录 <van-icon name="arrow" />
                        </div>
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx">
                        <div class="font-bold">
                          钥匙类型
                        </div>
                        <div>
                          {{ item.grantType === 0 ? '网络钥匙，蓝牙钥匙' : '网络钥匙' }}
                        </div>
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx">
                        <div class="font-bold">
                          有效期
                        </div>
                        <div>
                          {{ dayjs(item.grantStartTime).format('MM月DD日 HH:mm') }} {{
                            dayjs(item.grantEndTime).format('MM月DD日 HH:mm') }}
                        </div>
                      </div>
                    </div>
                    <div class="absolute top--132rpx right-45rpx">
                      <image class="w-600rpx h-258rpx" :src="item.modelImage" />
                    </div>
                  </div>
                </div>
                <div
                  v-if="tabIndex === 0"
                  class="mt-48rpx w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border text-center"
                >
                  <div class="text-grayText text-titleMedium">
                    车辆未在列表中？请点击添加车辆完成绑定
                  </div>
                  <button
                    class="button-white lh-64rpx h-72rpx w-196rpx"
                    @click="router.navigateTo({ name: 'carManagementBindCar' })"
                  >
                    添加车辆
                  </button>
                </div>
              </div>
            </template>
            <template #noData>
              <div class="text-center mt-360rpx">
                <nx-image
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_car.png"
                  width="360rpx"
                  height="300rpx"
                />
                <div class="text-titleMedium text-grayText">
                  {{ tabIndex === 0 ? '车辆未在列表中？请点击添加车辆完成绑定' : '暂无授权车辆' }}
                </div>
                <button
                  v-if="tabIndex === 0"
                  class="button-primary mt-72rpx"
                  @click="router.navigateTo({ name: 'carManagementBindCar' })"
                >
                  添加车辆
                </button>
              </div>
            </template>
          </nxScrollView>
        </div>
      </van-tab>
    </van-tabs>
    <van-dialog
      title="用户车辆授权协议"
      use-slot
      :show="noticeShow"
      :show-confirm-button="checkout"
      show-cancel-button
      @cancel="noticeShow = false"
      @confirm="goToAuth"
      @close="noticeShow = false"
    >
      <view class="p-40rpx rounded-16rpx">
        <view class="flex justify-center items-center flex-wrap">
          <view v-show="!checkout" class="lh-32rpx h-32rpx" @click="agree">
            <image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_check.png"
              class="w-32rpx h-32rpx lh-32rpx"
            />
          </view>
          <view v-show="checkout" class="lh-32rpx h-32rpx" @click="agree">
            <image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/check.png"
              class="w-32rpx h-32rpx lh-32rpx"
            />
          </view>
          <view class="flex items-start">
            <text class="text-24rpx color-neutral m-l-8rpx">
              我已阅读并同意
            </text>
            <text class="text-24rpx color-linkText" @click="UserPrivacy">
              《隐私协议》
            </text>
          </view>
        </view>
      </view>
    </van-dialog>
    <PinInput type="box" />
  </div>
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
