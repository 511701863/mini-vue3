<script setup lang="ts">
import { ref, reactive, Ref, computed, watch, nextTick } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import nxScrollView from '@/components/nxScrollView/index.vue';
import ElectronicDiaLog from './components/ElectronicDiaLog.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { getList } from '@/api/my/maintenance';
import { useRouter } from '@/router/router';
import dayjs from 'dayjs';

const scrollRef: any = ref(null);
onShow(() => {
  nextTick(() => {
    scrollRef?.value?.forEach((item: any) => {
      item.search();
    });
  });
});
const router = useRouter();
const tabNameList = [{
  label: '全部',
  status: ''
}, {
  label: '预约中',
  status: 1
}, {
  label: '待维保',
  status: 2
}, {
  label: '已完成',
  status: 4
}, {
  label: '已取消',
  status: 3
}, {
  label: '已过期',
  status: 5
}, {
  label: '已失效',
  status: -1
}];
const imgList: Record<any, string> = {
  '1': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_pending.png',
  '2': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_prepare.png',
  '3': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_cancel.png',
  '4': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_down.png',
  '5': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_timeOut.png',
  '-1': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_failure.png'
};
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
      <van-tab v-for="(tabItem) in tabNameList" :key="tabItem.label" :title="tabItem.label">
        <div>
          <nxScrollView
            ref="scrollRef"
            :cb-fn="getList"
            :header-height="64"
            :params="{ pageSize: 10, status: tabItem.status }"
            :manual="true"
          >
            <template #list="{ list }">
              <div class="p-32rpx">
                <div v-for="(item, index) in list as MyCenter.VehicleMaintenanceAppointmentAppPageAo[]" :key="index">
                  <div
                    class="w-686rpx bg-white mb-32rpx rounded-16rpx p-t-16rpx p-b-32rpx p-x-32rpx box-border"
                    @click="router.navigateTo({ name: 'maintenanceDetail', query: { id: item.id } })"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <div class="flex">
                          <div
                            :class="item.repairType === 1 ? 'bg-buttonColor' : 'bg-warn'"
                            class="color-white w-96rpx mr-32rpx text-center rounded-8rpx lh-44rpx"
                          >
                            {{ item.repairType === 1 ? '保养' : '维修' }}
                          </div>
                          <div class="font-bold">
                            {{ item.licensePlate ?
                              item?.licensePlate?.slice(0, 2) + '·' + item?.licensePlate?.slice(2,
                                                                                                item?.licensePlate?.length) : item.vin
                            }}
                          </div>
                        </div>
                        <div class="text-gray mt-14rpx text-medium">
                          预约日期：{{ dayjs(item.planArriveDate).format('YYYY年MM月DD日') + item.planArriveTime }}
                        </div>
                      </div>
                      <nx-image v-if="item?.status" :src="imgList[item.status + '']" width="150rpx" height="150rpx" />
                    </div>
                    <div v-if="item.status === 4" class="flex justify-between">
                      <div class="flex-1"></div>
                      <button
                        class="bg-white text-grayText text-28rpx border-gray border-1rpx rounded-50rpx w-148rpx h-64rpx lh-64rpx mt-16rpx"
                        @click="router.navigateTo({ name: 'evaluation',query:{id:item?.id,name:item?.dealerName} })"
                      >
                        去评价
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </nxScrollView>
        </div>
      </van-tab>
    </van-tabs>
    <div
      class="text-center absolute top-98rpx right-0 rounded-l-14rpx bg-white w-96rpx h-96rpx p-10rpx shadow"
      @click="router.navigateTo({ name: 'maintenanceAdd', query: { add: true } })"
    >
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
<style scoped lang="scss"></style>
