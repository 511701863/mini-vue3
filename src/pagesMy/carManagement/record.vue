<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import dayjs from 'dayjs';
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
    <nxScrollView :cb-fn="getList" :header-height="200" :params="{pageSize:2}" :is-lower-bottom="false">
      <template #list="{ list }">
        <div class="p-32rpx">
          <div v-for="(item,index) in list" :key="index">
            <div class="mb-32rpx relative w-686rpx bg-white rounded-16rpx p-32rpx box-border" @click="router.navigateTo({name:'maintenanceDetail',query:{item}})">
              <div class="w-622rpx flex justify-between p-y-18rpx text-medium border-b-1rpx border-gray-300">
                <div class="text-gray-400">
                  {{ dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss') }}
                </div>
                <div class="text-success">
                  操作成功
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-12rpx text-titleMedium">
                <div class="text-grayText">
                  操作内容
                </div>
                <div>
                  车窗打开
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-12rpx text-titleMedium">
                <div class="text-grayText">
                  操作账号
                </div>
                <div>
                  123456
                </div>
              </div>
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
            暂无控车记录
          </div>
        </div>
      </template>
    </nxScrollView>
  </div>
</template>
<style scoped lang="scss">
</style>
