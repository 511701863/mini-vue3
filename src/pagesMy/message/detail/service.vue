<script setup lang="ts">
import { ref, reactive, Ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../../hooks/useRequest/useRequst';

const router = useRouter();
</script>

<template>
  <div class="relative">
    <nxScrollView :cb-fn="getList">
      <template #list="{ list }">
        <div v-for="(item,index) in list" :key="index">
          <van-swipe-cell :right-width="64">
            <div slot="right" class="text-white flex items-center justify-center w-128rpx h-100% bg-pageBg">
              <nx-image
                src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/delete_icon.png"
                width="96rpx"
                height="96rpx"
              />
            </div>
            <div class="p-y-32rpx p-x-64rpx bg-white">
              <div class="text-center text-lightGrayText text-titleSmall">
                2022-07-06 12:47:38
              </div>
              <div class="text-titleLarge font-bold mt-24rpx">
                预约提醒
              </div>
              <div class="text-lightGrayText text-26rpx mt-8rpx">
                尊敬的车主您好，您已为车辆{车牌号}成功预约{日期：年月日}的维修保养业务，如有行程变更，可致电4S店变更预约。
                4S店信息:{成都恒盛恒远商贸有限责任公司}
                {成都市高新区茂业中心北侧100米}
                服务热线：{028-89030806}
              </div>
              <div class="flex flex-between text-26rpx mt-24rpx">
                <div></div>
                <div @click="router.navigateTo({name:'maintenanceDetail'})">
                  查看订单<van-icon name="arrow" />
                </div>
              </div>
            </div>
          </van-swipe-cell>
        </div>
      </template>
    </nxScrollView>
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
