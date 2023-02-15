<script setup lang="ts">
import { ref, reactive, Ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();
</script>

<template>
  <div class="relative">
    <nxScrollView :cb-fn="getList">
      <template #list="{ list }">
        <div class="p-32rpx">
          <div v-for="(item,index) in list" :key="index">
            <van-swipe-cell :right-width="64">
              <div slot="right" class="text-white flex items-center justify-center w-128rpx h-540rpx">
                <nx-image
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/delete_icon.png"
                  width="96rpx"
                  height="96rpx"
                />
              </div>
              <div class="w-686rpx bg-white mb-32rpx rounded-16rpx" @click="router.navigateTo({ name:'electronicDetail'})">
                <div class="flex justify-between p-32rpx">
                  <div>围栏名称</div>
                  <div class="text-gray">
                    凯翼研究院
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>围栏中心</div>
                  <div class="text-gray">
                    凯翼研究院
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>监控时段</div>
                  <div class="text-gray">
                    凯翼研究院
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>监控车辆</div>
                  <div class="text-gray">
                    凯翼研究院
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>告警提醒</div>
                  <div class="text-gray">
                    凯翼研究院
                  </div>
                </div>
              </div>
            </van-swipe-cell>
          </div>
        </div>
      </template>
    </nxScrollView>
    <div class="text-center absolute top-50rpx right-0 rounded-l-14rpx bg-white w-96rpx h-96rpx p-10rpx shadow" @click="router.navigateTo({ name:'electronicAdd',query:{add:true}})">
      <nx-image
        src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/addElectronic.png"
        width="48rpx"
        height="48rpx"
      />
      <div class="text-24rpx">
        新增
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
