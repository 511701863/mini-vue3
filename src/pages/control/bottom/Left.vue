<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';

import nxImage from '@/components/nxImage/nxImage.vue';

import { CarInfo, controlItem } from '../type';

import { useRequest } from '@/hooks/useRequest/useRequst';
import { debounce } from '@/utils/tool/index';
import { useConfig } from '../../../store/modules/config';
import { collection, controlDoor, controlTrunk, controlEngine, controlAir } from '@/api/control/index';
import { useCheckRes } from '@/hooks/useRequest/useCheckRes';
const { setPin, config } = useConfig();

type BottomLeftProps = {
  dialog: boolean,
  id: number | string,
  carInfo: Partial<Control.VehiclLoveAo>,
}

const router = useRouter();

const props = withDefaults(defineProps<BottomLeftProps>(), {
  dialog: false,
  id: 2
});

const emit = defineEmits<{(e: 'update:dialog', value: boolean): void,
  (e: 'update:id', value: number | string): void,
  (e: 'controlSuccess'): void
}>();

const airSource: controlItem[] = [{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8_s.png',
  check: false,
  checkCode: 'acHeatUpSts',
  id: 7,
  name: '急速升温'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7_s.png',
  check: false,
  checkCode: 'acHeatDownSts',
  id: 8,
  name: '极速降温'
}];
const btnSource: controlItem[] = [{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_1.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_1_s.png',
  check: false,
  checkCode: 'doorSts',
  value: 'vehicleLockControl',
  id: 1,
  name: '门锁'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_s.png',
  check: false,
  checkCode: '',
  value: 'vehicleFind',
  id: 2,
  name: '寻车'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_3.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_3_s.png',
  check: false,
  checkCode: 'trunkSts',
  value: 'trunkControl',
  id: 3,
  name: '后备箱'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_4.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_4_s.png',
  check: false,
  checkCode: 'engineSts',
  value: 'vehicleStartStop',
  id: 4,
  name: '发动机'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_s.png',
  check: false,
  checkCode: 'windowSts',
  value: 'windowControl',
  id: 5,
  name: '车窗'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_s.png',
  check: false,
  checkCode: 'srfOperateSts',
  value: 'skylightsControl',
  id: 6,
  name: '天窗'
}];
const airList = ref<controlItem[]>([]);
const btnList = ref<controlItem[]>([]);

const hasCollecList: any = ref([]);
const { run: collectionFnLeft, data: abilityListLeft } = useRequest<Control.AbilityVo>(collection, {
  manual: true,
  onSuccess: () => {
    hasCollecList.value = abilityListLeft.value?.abilityCollections?.map((item) => item.ability);
    btnList.value = btnSource.filter((item) => {
      if (item.checkCode) {
        if (item.checkCode === 'srfOperateSts' || item.checkCode === 'windowSts') {
          item.check = [1, 2].includes(props.carInfo?.vehicleCondition?.[item.checkCode] || 0);
        } else {
          item.check = props.carInfo?.vehicleCondition?.[item.checkCode];
        }

      }
      return hasCollecList.value?.includes(item.value);
    });
    airList.value = airSource.map((item) => {
      if (item.checkCode) {
        if(props.carInfo?.vehicleCondition?.engineSts && props.carInfo?.vehicleCondition?.acWorkingSts){
          item.check = props.carInfo?.vehicleCondition?.[item.checkCode];
        }else{
          item.check = false;
        }
      }
      return item;
    });
  }
});
watch(() => props.carInfo, (nVal) => {
  if (nVal?.vin) {
    collectionFnLeft({ vin: nVal.vin, abilityType: 0 });
  }
}, { deep: true, immediate:true });

defineExpose({collectionFnLeft});
//门锁
const { run: controlDoorFn } = useCheckRes(controlDoor, successControl);
//后备箱
const { run: controlTrunkFn } = useCheckRes(controlTrunk, successControl);
//发动机
const { run: controlEngineFn } = useCheckRes(controlEngine, successControl);
//空调
const { run: controlAirFn } = useCheckRes(controlAir, successControl);

function clickControl(item: controlItem) {
  if (props.carInfo.authState !== 3) {
    uni.showModal({
      title: '提示',
      content: `当前默认车辆“${props.carInfo.vin}”还未进行实名认证，请前往APP认证`,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
    return;
  }
  switch (item.id) {
    case 1:
      controlDoorFn({ destDoor: 'ALL', vin: props.carInfo.vin, destStatus: item.check ? 'OFF' : 'ON' });
      break;
    case 2:
      emit('update:dialog', !props.dialog);
      emit('update:id', item.id || 2);
      break;
    case 3:
      if (item.check) {
        uni.showToast({ title: '后备箱已开启，请手动关闭后备箱', icon: 'none' });
      } else {
        controlTrunkFn({ vin: props.carInfo.vin, destStatus: 'ON' });
      }
      break;
    case 4:
      controlEngineFn({ vin: props.carInfo.vin, destStatus: item.check ? 'OFF' : 'ON' });
      break;
    case 5:
      emit('update:dialog', !props.dialog);
      emit('update:id', item.id || 5);
      break;
    case 6:
      emit('update:dialog', !props.dialog);
      emit('update:id', item.id || 6);
      break;
    case 7:
      if (hasCollecList.value.includes('acControl')) {
        controlAirFn({ vin: props.carInfo.vin, temperature: 31.5, destStatus: 'ON' });
      } else {
        controlAirFn({ vin: props.carInfo.vin, tempLevel: 15, destStatus: 'ON' });
      }
      break;
    case 8:
      if (hasCollecList.value.includes('acControl')) {
        controlAirFn({ vin: props.carInfo.vin, temperature: 19.5, destStatus: 'ON' });
      } else {
        controlAirFn({ vin: props.carInfo.vin, tempLevel: 1, destStatus: 'ON' });
      }
      break;
    default:
      console.log('无');
  }
}
function successControl() {
  emit('controlSuccess');
}
function goToAir() {
  router.navigateTo({ name: 'airControl' });
}
</script>

<template>
  <div>
    <div v-if="btnList.length" class="control-card flex justify-between flex-wrap">
      <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="setPin(true, 0, clickControl, item)">
        <nx-image :src="item.check ? item.checkSrc : item.src" width="96rpx" height="96rpx" />
        <div class="text-medium mt-mini">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div v-if="(hasCollecList.includes('acGearsControl') || hasCollecList.includes('acControl'))" class="control-card">
      <div class="mb-normal flex justify-between items-start ml-16rpx">
        <div>
          空调
        </div>
        <van-icon name="arrow" size="24rpx" @click="goToAir" />
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="icon-box mt-8rpx">
          <div v-if="hasCollecList.includes('acControl')">
            <div
              v-if="!props.carInfo?.vehicleCondition?.acTemp || !props.carInfo?.vehicleCondition?.engineSts || !props.carInfo?.vehicleCondition?.acWorkingSts"
            >
              <span class="text-72rpx">--</span>
            </div>
            <div v-else-if="+props.carInfo?.vehicleCondition?.acTemp === 32.5">
              <span class="text-72rpx">Hi</span>
            </div>
            <div v-else-if="+props.carInfo?.vehicleCondition?.acTemp === 17.5">
              <span class="text-72rpx">LO</span>
            </div>
            <div v-else>
              <span class="text-72rpx">{{ props.carInfo?.vehicleCondition?.acTemp?.split('.')[0] }}</span><span
                v-if="props.carInfo?.vehicleCondition?.acTemp?.indexOf('.') > -1"
              >.{{
                props.carInfo?.vehicleCondition?.acTemp?.split('.')[1] }}</span><span>℃</span>
            </div>
          </div>
          <div v-else>
            <div
              v-if="!props.carInfo?.vehicleCondition?.acGear || !props.carInfo?.vehicleCondition?.engineSts || !props.carInfo?.vehicleCondition?.acWorkingSts"
            >
              <span class="text-72rpx">--</span>
            </div>
            <div v-else-if="props.carInfo?.vehicleCondition?.acGear === '16档温度'">
              <span class="text-72rpx">Hi</span>
            </div>
            <div v-else-if="props.carInfo?.vehicleCondition?.acGear === '1档温度'">
              <span class="text-72rpx">LO</span>
            </div>
            <div v-else>
              <span class="text-72rpx">{{ props.carInfo?.vehicleCondition?.acGear.slice(0,props.carInfo?.vehicleCondition?.acGear.length === 4?1:2) }}</span><span>档</span>
            </div>
          </div>
          <div class="text-medium mt-mini">
            {{ hasCollecList.includes('acControl') ? '空调温度' : '空调档位' }}
          </div>
        </div>
        <div v-for="(item, index) in airList" :key="index" class="icon-box" @click="setPin(true, 0, clickControl, item)">
          <nx-image :src="item.check ? item.checkSrc : item.src" width="96rpx" height="96rpx" />
          <div class="text-medium mt-mini">
            {{ item.name }}
          </div>
        </div>
      </div>
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

