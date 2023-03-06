<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import NxSelect from '@/components/nxSelect/nxSelect.vue';

import { getCarList } from '@/api/my/carManagement';
import { addElectric, updateElectric } from '@/api/my/electronic';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

const router = useRouter();
const addFlag = ref(true);
const nextDay = ref(false);
const state: Record<string, Partial<MyCenter.AddElectric>> = reactive({
  formData: {
    fenceName: '',
    fenceCenter: '',
    startTime: '',
    endTime: '',
    vin: '',
    type: [true, false]
  }
});
const { run: getCarListFn, data: carList } = useRequest<MyCenter.VehicleLoveList[]>(getCarList, {
  manual: true
});
const submitDisabled = computed(() => {
  let flag = false;
  for (const key in state.formData) {
    if (state.formData[key] === '') {
      flag = true;
    }
  }
  return flag;
});
watch([() => state.formData.startTime, () => state.formData.endTime], (nVal) => {
  if (state.formData.endTime && state.formData.startTime && (new Date(`2023 ${state.formData.startTime}`).getTime() >= new Date(`2023 ${state.formData.endTime}`).getTime())) {
    nextDay.value = true;
    console.log(new Date(`2023 ${state.formData.startTime}`).getTime(), new Date(`2023 ${state.formData.endTime}`).getTime());

  } else {
    nextDay.value = false;
  }
  console.log(nextDay.value);

});
onLoad((e: any) => {
  const { info, add } = e;
  const dataInfo = JSON.parse(info);
  if (add === 'true') {
    addFlag.value = true;
    state.formData = Object.assign(state.formData, dataInfo);
    console.log(state.formData);
    wx.setNavigationBarTitle({ title: '电子围栏创建' });
  } else {
    wx.setNavigationBarTitle({ title: '电子围栏编辑' });
    state.formData = dataInfo;
    state.formData.type = state.formData.alarmType === 'ALL' ? [true, true] : state.formData.alarmType === 'ENTRY' ? [true, false] : [false, true];
    addFlag.value = false;
  }
  getCarListFn();
});

const { run: updateElectricFn } = useRequest<any, any>(updateElectric, {
  manual: true,
  onSuccess: () => {
    router.navigateBack({delta:2});
  }
});
const { run: addElectricFn } = useRequest<any, any>(addElectric, {
  manual: true,
  onSuccess: () => {
    router.navigateBack({delta:2});
  }
});
function submit() {
  const params = { ...state.formData };
  params.alarmType = params.type[0] && params.type[1] ? 'ALL' : params.type[0] && !params.type[1] ? 'ENTRY' : 'EXIT';
  console.log(params.alarmType);
  if (addFlag.value) {
    addElectricFn(params);
  } else {
    updateElectricFn(params);
  }
}
</script>

<template>
  <div class="relative p-32rpx bg-pageBg h-100vh box-border">
    <div class="rounded-16rpx bg-white">
      <van-cell-group>
        <nxInput v-model="state.formData.fenceName" label="围栏名称" placeholder="请选输入围栏名称" input-align="right" />
        <nxInput v-model="state.formData.fenceCenter" label="围栏中心" placeholder="请选输入围栏名称" input-align="right" />
        <nxDatePicker v-model="state.formData.startTime" label="监控开始时段" type="secondsTime" placeholder="请选择时间段" />
        <nxDatePicker
          v-model="state.formData.endTime"
          label="监控结束时段"
          :next-day="nextDay"
          type="secondsTime"
          placeholder="请选择时间段"
        />
        <nx-select
          v-model="state.formData.vin"
          :options="carList?.filter(item => item.authState===3 && !item.isGrant).map(item => { return { name: item.carLicense, value: item.vin } }) || []"
          label="监控车辆"
          placeholder="请选择监控车辆"
        />
        <div class="flex items-center justify-between p-y-32rpx p-x-32rpx text-28rpx text-">
          <div>
            告警提醒
          </div>
          <div class="flex justify-between">
            <NxCheckBox v-model="state.formData.type[0]" checked-color="#FF933B" class="mr-52rpx" shape="square">
              驶入
            </NxCheckBox>
            <NxCheckBox v-model="state.formData.type[1]" checked-color="#FF933B" class="mr-52rpx" shape="square">
              驶出
            </NxCheckBox>
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="absolute bottom-66rpx left-32rpx flex justify-between p-t-32rpx">
      <button
        class="bg-white w-320rpx h-100rpx mr-46rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx"
        @click="router.navigateBack({})"
      >
        上一步
      </button>
      <button
        :disabled="submitDisabled"
        class="bg-buttonColor w-320rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
        @click="submit"
      >
        提交
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}

.label-class {
  color: #000000 !important;
}
</style>
