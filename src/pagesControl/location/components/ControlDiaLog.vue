<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { controlSunroof, controlWindow, controlAlarm, controlLight, controlFindCar } from '@/api/control/index';
import { useCheckRes } from '@/hooks/useRequest/useCheckRes';
import { controlItem } from '@/pages/control/type';

type ControlDialogProps = {
  modelValue: boolean,
  carInfo: Partial<Control.VehiclLoveAo>,
  btnId: number | string
}

const router = useRouter();
const props = withDefaults(defineProps<ControlDialogProps>(), {
  modelValue: false,
  btnId: 2
});
const emit = defineEmits<{(evt: 'update:modelValue', value: boolean): void,
(e: 'controlSuccess'): void
}>();
const state = reactive<{ clickItem: any, data: any }>({
  data: {},
  clickItem: null
});
const btnList = reactive<Record<string | number, controlItem[]>>({
  2: [{
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_1.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_1.png',
    check: false,
    id: 1,
    name: '鸣笛闪灯'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_2.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_2.png',
    check: false,
    id: 2,
    name: '仅鸣笛'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_3.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_3.png',
    check: false,
    id: 3,
    name: '仅闪灯'
  }
  ]
});
watch(() => props.carInfo, (nVal) => {
  if (nVal?.vin) {
    //天窗
    btnList[6].forEach((item) => { item.check = false; });
    if (props.carInfo?.vehicleCondition?.srfOperateSts === 1) {
      btnList[6][0].check = true;
    } else if (props.carInfo?.vehicleCondition?.srfOperateSts === 2) {
      btnList[6][1].check = true;

    }
    //车窗
    btnList[5].forEach((item) => { item.check = false; });
    if (props.carInfo?.vehicleCondition?.windowSts === 1) {
      btnList[5][0].check = true;
    } else if (props.carInfo?.vehicleCondition?.windowSts === 2) {
      btnList[5][1].check = true;

    }
  }
}, { deep: true, immediate:true});

function successControl() {
  emit('controlSuccess');
}
//寻车
const { run: controlFindCarFn } = useCheckRes(controlFindCar, successControl);
const { run: controlLightFn } = useCheckRes(controlLight, successControl);
const { run: controlAlarmFn } = useCheckRes(controlAlarm, successControl);

function clickControl(item: controlItem) {
  //车窗天窗打开的就不继续
  if([4, 5, 7, 8].includes(item.id?+item.id : 4) && item.check){
    return;
  }
  switch (item.id) {
    case 1:
      controlFindCarFn({ vin: props.carInfo.vin });
      break;
    case 2:
      controlLightFn({ vin: props.carInfo.vin, destStatus: 'ON' });
      break;
    case 3:
      controlAlarmFn({ vin: props.carInfo.vin, destStatus: 'ON' });
      break;
    default:
      console.log('无');
  }
  emit('update:modelValue', false);

}
</script>

<template>
  <van-dialog
    use-slot
    close-on-click-overlay
    :show-confirm-button="false"
    :show="props.modelValue"
    @close="emit('update:modelValue', false)"
  >
    <view class="p-16rpx pt-64rpx pb-64rpx rounded-16rpx flex justify-between">
      <div v-for="(item, index) in btnList[btnId]" :key="index" class="icon-box" @click="clickControl(item)">
        <img :src="item.check ? item.checkSrc : item.src" class="w-96rpx h-96rpx">
        <div class="text-medium mt-mini">
          {{ item.name }}
        </div>
      </div>
    </view>
  </van-dialog>
</template>
<style lang="scss" scoped>
.icon-box {
  width: 219rpx;
  box-sizing: border-box;
  margin-bottom: 32rpx;
  text-align: center;
}
</style>

