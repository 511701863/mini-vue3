<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();
const tabNameList = [{
  label:'全部'
}, {
  label:'预约中'
}, {
  label:'待维保'
}, {
  label:'已完成'
}, {
  label:'已取消'
}, {
  label:'已过期'
}, {
  label:'已失效'
}];
const active = ref(0);
function getType (type:any){
  console.log(type);

}
console.log(Math.random());

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
      <van-tab v-for="(tabItem) in tabNameList" :key="tabItem.label" :title="tabItem.label">
        <div>
          <nxScrollView :cb-fn="getList" :header-height="64" :params="{pageSize:10}">
            <template #list="{ list }">
              <div class="p-32rpx">
                <div v-for="(item,index) in list" :key="index">
                  <div class="w-686rpx bg-white mb-32rpx rounded-16rpx p-y-14rpx p-x-32rpx box-border" @click="router.navigateTo({name:'maintenanceDetail',query:{item}})">
                    <div class="flex justify-between items-center">
                      <div>
                        <div class="flex">
                          <div :class="item.modelName === '轩度26553'?'bg-buttonColor':'bg-buttonColorBlue'" class="color-white w-96rpx mr-32rpx text-center rounded-8rpx lh-44rpx">
                            {{ '保养' }}
                          </div>
                          <div class="font-bold">
                            川A·88888
                          </div>
                        </div>
                        <div class="text-gray mt-14rpx text-medium">
                          {{ '预约日期：2022年08月12日13:0' }}
                        </div>
                      </div>
                      <nx-image
                        :src="item.modelName === '轩度26553'?'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_cancel.png':'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_down.png'"
                        width="150rpx"
                        height="150rpx"
                      />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </template>
          </nxScrollView>
        </div>
      </van-tab>
    </van-tabs>
    <div class="text-center absolute top-98rpx right-0 rounded-l-14rpx bg-white w-96rpx h-96rpx p-10rpx shadow" @click="router.navigateTo({ name:'maintenanceAdd',query:{add:true}})">
      <nx-image
        src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/addElectronic.png"
        width="48rpx"
        height="48rpx"
      />
      <div class="text-24rpx">
        维保预约
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>
