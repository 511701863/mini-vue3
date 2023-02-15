<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { CarInfo, controlItem } from '../type';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { getList, getList2 } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';

const router = useRouter();

const state = reactive({
  data: {}
});
const btnList = ref<Partial<controlItem>[]>([
//   {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_1.png',
//   check: false,
//   name: '车辆诊断'
// },
// {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_2.png',
//   check: false,
//   name: '行车记录'
// },
// {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_3.png',
//   check: false,
//   name: '车内自拍'
// },
// {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_4.png',
//   check: false,
//   name: '流量管理'
// },
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_5.png',
  check: false,
  routerName:'maintenanceAdd',
  name: '维保预约'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_6.png',
  check: false,
  routerName:'locationService',
  name: '位置服务'
}
// {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_7.png',
//   check: false,
//   name: '用户手册'
// },
// {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_8.png',
//   check: false,
//   name: '充电管理'
// },
// {
//   src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_9.png',
//   check: false,
//   name: '升级管理'
// }
]);
function clickControl(item: Partial<controlItem>) {
 router.navigateTo({name:item.routerName});
}
function goToAir() {
  router.navigateTo({ name: 'airControl' });
}
</script>

<template>
  <div>
    <div class="control-card  flex flex-wrap">
      <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="clickControl(item)">
        <img class="w-96rpx h-96rpx" :src="item.src">
        <div class="text-medium mt-mini">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="control-card  flex justify-between flex-wrap">
      <div class="text-titleMedium">
        一键救援
      </div> <img class="w-48rpx h-48rpx" src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/callPhone.png">
    </div>
  </div>
</template>
<style lang="scss" scoped>
.control-card {
  padding: 32rpx 16rpx 32rpx 16rpx;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  background-color: #fff;
  box-sizing: border-box;
  width: 686rpx;

  .icon-box {
    width: 219rpx;
    box-sizing: border-box;
    margin-bottom: 32rpx;
    text-align: center;
  }

}
</style>

