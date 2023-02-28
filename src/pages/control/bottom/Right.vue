<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';

import nxImage from '@/components/nxImage/nxImage.vue';

import { CarInfo, controlItem } from '../type';

import { useRouter } from '@/router/router';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { getList, getList2 } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';
import { collection} from '@/api/control/index';
type BottomLeftProps = {
  carInfo: Partial<Control.VehiclLoveAo>,
}
const props = withDefaults(defineProps<BottomLeftProps>(), {
});
const router = useRouter();

const state = reactive({
  data: {}
});
const btnSource:controlItem[] = [
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
    routerName: 'maintenanceAdd',
    name: '维保预约',
    value:'maintenanceSubscribe'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_2_6.png',
    check: false,
    routerName: 'locationService',
    name: '位置服务',
    value:'locationServe'
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
];
const btnList = ref<controlItem[]>([]);
  const { run: collectionFnRight, data: abilityListRight } = useRequest<Control.AbilityVo>(collection, {
  manual: true,
  onSuccess:() => {
    const hasCollecList = abilityListRight.value?.abilityCollections?.map((item) => item.ability);
    btnList.value = btnSource.filter((item) => {
      return hasCollecList?.includes(item.value);
    });
  }
});
watch(() => props.carInfo, (nVal) => {
  if (nVal?.vin) {
    collectionFnRight({ vin:nVal.vin, abilityType: 1 });
  }
}, { deep: true, immediate:true});
function clickControl(item: Partial<controlItem>) {
  router.navigateTo({ name: item.routerName, query:{vin:props.carInfo?.vin} });
}
function call() {
  uni.makePhoneCall({
    phoneNumber: '400-666-7777',
    success: function () {
      console.log('拨打电话成功');
    },
    fail() {
      console.log('打电话失败了');
    }
  });
}
</script>

<template>
  <div>
    <div v-if="btnList.length" class="control-card  flex flex-wrap">
      <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="clickControl(item)">
        <nx-image :src="item.src" width="96rpx" height="96rpx" />
        <div class="text-medium mt-mini">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="control-card  flex justify-between flex-wrap" @click="call">
      <div class="text-titleMedium">
        一键救援
      </div>
      <nx-image
        src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/callPhone.png"
        width="48rpx"
        height="48rpx"
      />
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

