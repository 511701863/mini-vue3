<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();
const tabNameList = [{
  label:'我的车辆'
}, {
  label:'被授权车辆'
}];
const active = ref(0);
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
      <van-tab v-for="(tabItem,tabIndex) in tabNameList" :key="tabItem.label" :title="tabItem.label">
        <div>
          <nxScrollView :cb-fn="getList" :header-height="64" :params="{pageSize:3}" :is-lower-bottom="false">
            <template #list="{ list }">
              <div class="p-32rpx">
                <div v-for="(item,index) in list" :key="index">
                  <div class="mt-180rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border" @click="router.navigateTo({name:tabIndex===0?'carManagementDetail':'carManagementAuthDetail',query:{item}})">
                    <div v-if="tabIndex===0" class="flex flex-wrap justify-center items-center">
                      <div class="flex mt-123rpx">
                        <div v-if="item.modelName === '轩度26553'" class="w-64rpx h-36rpx border-1rpx border-buttonColor mr-6rpx text-24rpx lh-36rpx text-center">
                          默认
                        </div>
                        <div class="font-bold">
                          COWIN FX12旗舰版
                        </div>
                      </div>
                      <div class="mt-14rpx text-24rpx text-grayText w-622rpx text-center">
                        VIN：COWINKEY00000000
                      </div>
                      <div class="flex items-center mt-32rpx">
                        <div v-for="(nItem,nIndex) in '川A123456'.split('')" :key="nIndex" class="car-number w-52rpx h-72rpx rounded-8rpx border-1rpx border-lightGray text-center lh-64rpx m-x-4rpx">
                          {{ nItem }}
                        </div>
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx mt-32rpx">
                        <div class="font-bold">
                          实名认证
                        </div>
                        <div class="text-buttonColorBlue">
                          去认证 <van-icon name="arrow" />
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
                          @click.stop="router.navigateTo({name:'carManagementRecord'})"
                        >
                          控车记录
                        </button>
                        <button
                          class="button-white lh-64rpx h-72rpx w-196rpx border-lightGray mr-16rpx"
                          @click.stop="router.navigateTo({name:'carManagementAuthRecord'})"
                        >
                          授权记录
                        </button>
                        <button
                          class="button-white lh-64rpx h-72rpx w-196rpx border-lightGray"
                          @click.stop="router.navigateTo({name:'carManagementCarAuth'})"
                        >
                          车辆授权
                        </button>
                      </div>
                    </div>
                    <div v-else class="flex flex-wrap justify-center items-center">
                      <div class="flex mt-123rpx relative">
                        <div class="font-bold">
                          {{ item.modelName === '轩度26553'?'川A·VV666':'暂无车牌' }}
                        </div>
                        <nx-image
                          class="absolute right--154rpx top-0"
                          :src="item.modelName === '轩度26553'?'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUsing.png':'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseEnd.png'"
                          width="120rpx"
                          height="48rpx"
                        />
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx mt-32rpx">
                        <div class="font-bold">
                          授权信息
                        </div>
                        <div @click="router.navigateTo({name:'carManagementRecord'})">
                          控车记录 <van-icon name="arrow" />
                        </div>
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx">
                        <div class="font-bold">
                          钥匙类型
                        </div>
                        <div>
                          网络钥匙
                        </div>
                      </div>
                      <div class="w-622rpx flex justify-between p-y-32rpx">
                        <div class="font-bold">
                          有效期
                        </div>
                        <div>
                          07月12日12:00 至 07月14日12:00
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
                </div>
                <div v-if="tabIndex === 0" class="mt-48rpx w-686rpx bg-white mb-32rpx rounded-16rpx p-32rpx box-border text-center">
                  <div class="text-grayText text-titleMedium">
                    车辆未在列表中？请点击添加车辆完成绑定
                  </div>
                  <button
                    class="button-white lh-64rpx h-72rpx w-196rpx"
                    @click="router.navigateTo({name:'carManagementBindCar'})"
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
                  {{ tabIndex===0?'车辆未在列表中？请点击添加车辆完成绑定':'暂无授权车辆' }}
                </div>
                <button
                  v-if="tabIndex===0"
                  class="button-primary mt-72rpx"
                  @click="router.navigateTo({name:'carManagementBindCar'})"
                >
                  添加车辆
                </button>
              </div>
            </template>
          </nxScrollView>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style scoped lang="scss">
.car-number:nth-child(2){
  position: relative;
  margin-right: 24rpx;
}
.car-number:nth-child(2)::after{
  position: absolute;
  content:'·';
  right:-22rpx;
}
</style>
