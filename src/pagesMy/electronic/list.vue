<script setup lang="ts">
import { ref, reactive, Ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { getElectricList, deleteElectric} from '@/api/my/electronic';

import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();
const scrollViewRef = ref<any>(null);
const { run:deleteElectricFn, data } = useRequest<any, any>(deleteElectric, {
  manual: true,
  onSuccess:() => {
    scrollViewRef.value.search();
  }
});
onShow(() => {
  scrollViewRef?.value?.search();
});
function deleteFn(item:any) {
  uni.showModal({
    title: '撤销授权',
    content: '电子围栏删除后，将不在该区域对车辆进行监控。请确认是否继续？',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        deleteElectricFn(item.fenceId);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }});
}
const isNextDay =(item:any) => {
  const flag = Number(item?.endTime?.slice(0, 2)) <= Number(item?.startTime?.slice(0, 2));
  return flag? '次日':'';
};
</script>

<template>
  <div class="relative">
    <nxScrollView ref="scrollViewRef" :cb-fn="getElectricList">
      <template #list="{ list }">
        <div class="p-32rpx">
          <div v-for="(item,index) in list as MyCenter.ElectricFenceVo[]" :key="index">
            <van-swipe-cell :right-width="64">
              <div slot="right" class="text-white flex items-center justify-center w-128rpx h-540rpx" @click="deleteFn(item)">
                <nx-image
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/delete_icon.png"
                  width="96rpx"
                  height="96rpx"
                />
              </div>
              <div class="w-686rpx bg-white mb-32rpx rounded-16rpx" @click="router.navigateTo({ name:'electronicDetail',query:{id:item.fenceId}})">
                <div class="flex justify-between p-32rpx">
                  <div>围栏名称</div>
                  <div class="text-gray">
                    {{ item.fenceName || '名称' }}
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>围栏中心</div>
                  <div class="text-gray">
                    {{ item.fenceCenter || '名称' }}
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>监控时段</div>
                  <div class="text-gray">
                    {{ item.startTime + "-" + isNextDay(item) + item.endTime }}
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div class="w-180rpx">
                    监控车辆
                  </div>
                  <div class="text-gray">
                    {{ item.carLicense ? item?.carLicense?.slice(0,2)+'·'+item?.carLicense?.slice(2,item?.carLicense?.length):item.vin }}
                  </div>
                </div>
                <div class="flex justify-between p-32rpx">
                  <div>告警提醒</div>
                  <div class="text-gray">
                    {{ item.alarmType === 'all' ? '驶入，驶出' :item.alarmType === 'ENTRY'?'驶入':'驶出' }}
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
