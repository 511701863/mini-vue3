<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed, useAttrs } from 'vue';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { deleteElectric} from '@/api/my/electronic';
import { info } from 'console';

type ControlDialogProps = {
  modelValue: boolean,
  info?: any,
  overlay?:boolean
}

const attrs = useAttrs();
const router = useRouter();
const props = withDefaults(defineProps<ControlDialogProps>(), {
  modelValue: false,
  overlay:true,
  info: {}
});
const emit = defineEmits<{(evt: 'update:modelValue', value: boolean): void,
(evt: 'deleteFn'): void
}>();
const state = reactive<{clickItem:any, data:any}>({
  data: {},
  clickItem:null
});

function onSuccess(res:any) {
  emit('update:modelValue', false);
  if(!props.overlay){
    //详情内删除后回退到列表
    router.navigateBack({});
    return;
  }
  emit('deleteFn');
}
const { run:deleteElectricFn, data } = useRequest<any, any>(deleteElectric, {
  manual: true,
  onSuccess
});
function deleteFn() {
  uni.showModal({
    title: '撤销授权',
    content: '电子围栏删除后，将不在该区域对车辆进行监控。请确认是否继续？',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        deleteElectricFn(props?.info?.fenceId);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const isNextDay =computed(() => {
  const flag = Number(props.info?.endTime?.slice(0, 2)) <= Number(props.info?.startTime?.slice(0, 2));
  return flag? '次日':'';
});
</script>

<template>
  <page-meta :page-style="props.modelValue ? 'overflow: hidden' : ''">
    <van-popup
      :overlay="props.overlay"
      :show="props.modelValue"
      round
      position="bottom"
      overlay-style="background:rgba(0,0,0,0)"
      @close="emit('update:modelValue', false)"
    >
      <div>
        <div class="text-36rpx font-bold p-32rpx">
          {{ props?.info?.fenceName || '名称' }}
        </div>
        <div class="flex justify-between p-32rpx">
          <div class="w-170rpx">
            围栏中心
          </div>
          <div class="text-gray">
            {{ props?.info?.fenceCenter || '名称' }}
          </div>
        </div>
        <div class="flex justify-between p-32rpx">
          <div class="w-170rpx">
            监控时段
          </div>
          <div class="text-gray">
            {{ props?.info?.startTime + "-" + isNextDay + props?.info?.endTime }}
          </div>
        </div>
        <div class="flex justify-between p-32rpx">
          <div class="w-170rpx">
            监控车辆
          </div>
          <div class="text-gray">
            {{ props?.info?.carLicense ? props.info?.carLicense?.slice(0,2)+'·'+props.info?.carLicense?.slice(2,props.info?.carLicense?.length):props?.info?.vin }}
          </div>
        </div>
        <div class="flex justify-between p-32rpx">
          <div class="w-170rpx">
            告警提醒
          </div>
          <div class="text-gray">
            {{ props?.info?.alarmType === 'all' ? '驶入，驶出' :props?.info?.alarmType === 'ENTRY'?'驶入':'驶出' }}
          </div>
        </div>
        <div class="flex justify-between p-t-32rpx">
          <button
            class="bg-white w-320rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx"
            @click="deleteFn"
          >
            删除
          </button>
          <button
            class="bg-buttonColor w-320rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
            @click="router.navigateTo({ name:'electronicAdd',query:{add:false,id:props?.info?.fenceId}})"
          >
            编辑
          </button>
        </div>
      </div>
    </van-popup>
  </page-meta>
</template>
<style lang="scss" scoped>
</style>

