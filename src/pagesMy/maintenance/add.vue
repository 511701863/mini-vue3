<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxSelect from '@/components/nxSelect/nxSelect.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { addMaintenance, getMaintenancePeriod } from '@/api/my/maintenance';
import { findVehicleDefault } from '../../api/control/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useStore } from '../../store/modules/store';
import { CarInfo } from '../../pages/control/type';
const router = useRouter();
const { storeState } = useStore();
const addFlag = ref(true);
const { run: getPeriodFn, data: rangeOptions } = useRequest<string[]>(getMaintenancePeriod, {
  manual: false
});
const { run, data:mainId } = useRequest<any, MyCenter.addMaintenance[]>(addMaintenance, {
  manual: true,
  onSuccess: (res) => {
    router.redirectTo({name:'maintenanceDetail', query:{id:mainId.value}});
  }
});

const formData: { [key in keyof MyCenter.addMaintenance]: any } = reactive({
  cellPhoneNumber: '',
  customerName: '',
  dealerCode: '',
  planArriveDate: '',
  planArriveTime: '',
  vin: '',
  remark: '',
  licensePlate: '',
  store: '',
  repairType: [true, false]
});
const { run: findVehicleDefaultFn, data: carInfo } = useRequest<Control.VehiclLoveAo>(findVehicleDefault, {
  manual: false,
  onSuccess: () => {
    formData.vin = carInfo.value?.vin;
    formData.licensePlate = carInfo.value?.carLicense;
    formData.cellPhoneNumber = uni.getStorageSync('userInfo').phoneNo;
    formData.customerName = uni.getStorageSync('userInfo').nickName;
  }
});
const submitDisabled = computed(() => {
  let flag = false;
  for (const key in formData) {
    if (key !== 'remark' && formData[key] === '') {
      flag = true;
    }
  }
  return flag;
});
onShow(() => {
  formData.store = storeState.name || '';
  formData.dealerCode = storeState.code || '';
});
function submit() {
  console.log(formData);
  const params = {
    ...formData
  };
  //1：保养，2：维修
  if (params.repairType[0]) {
    params.repairType = 2;
  } else {
    params.repairType = 1;
  }
  uni.showModal({
    title: '维保预约',
    content: '请确认维保预约信息后，请按预约时间前往4S店进行服务',
    success: function (res2) {
      if (res2.confirm) {
        run(params);
      } else if (res2.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
function changeCheckBox(num: number) {
  formData.repairType = [false, false];
  formData.repairType[num] = true;
}

</script>

<template>
  <div class="relative p-32rpx bg-pageBg h-100vh box-border">
    <div
      class="flex items-center justify-between p-32rpx text-28rpx h-180rpx box-border text-titleLarge relative bg-white mb-24rpx rounded-8rpx"
      @click="router.navigateTo({ name: 'selectStore' })"
    >
      <div v-if="!formData.store" class="text-gray text-36rpx">
        请选择4S店
      </div>
      <div v-else class="text-36rpx z-1">
        {{ formData.store }}
      </div>
      <van-icon name="arrow" size="30rpx" class="z-1" />
      <div class="absolute right--3rpx top-0 z-0">
        <image
          class=" w-686rpx h-180rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/s4store.png"
        />
      </div>
    </div>
    <div class="rounded-16rpx bg-white">
      <van-cell-group>
        <div class="p-32rpx text-28rpx">
          <div class="mb-23rpx">
            维保类型
          </div>
          <div class="flex justify-between">
            <div
              :class="formData.repairType[0] ? 'active-class' : ''"
              class="border-1rpx border-lightGray w-300rpx h-112rpx rounded-8rpx flex items-center justify-center"
              @click="changeCheckBox(0)"
            >
              <nx-image
                src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/Mby.png"
                width="32rpx"
                height="32rpx"
              />
              <div class="lh-32rpx mb-5rpx ml-20rpx">
                保养
              </div>
            </div>
            <div
              :class="formData.repairType[1] ? 'active-class' : ''"
              class="border-1rpx border-lightGray w-300rpx h-112rpx rounded-8rpx flex items-center justify-center"
              @click="changeCheckBox(1)"
            >
              <nx-image
                src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/Mwx.png"
                width="32rpx"
                height="32rpx"
              />
              <div class="lh-32rpx mb-5rpx ml-20rpx">
                维修
              </div>
            </div>
          </div>
        </div>
        <nxDatePicker
          v-model="formData.planArriveDate"
          :min-date="new Date().getTime() + 60 * 60 * 24 * 1000"
          label="预约日期"
          type="date"
          placeholder="请选择日期"
        />
        <nxDatePicker
          v-model="formData.planArriveTime"
          :rang-options="rangeOptions"
          label="预约时间"
          type="timeRange"
          placeholder="请选择时间段"
        />
      </van-cell-group>
    </div>
    <div class="rounded-16rpx bg-white mt-24rpx">
      <van-cell-group>
        <nxInput v-model="formData.licensePlate" label="车牌号" :maxlength="8" placeholder="请选输入车牌号" input-align="right" />
        <nxInput v-model="formData.vin" label="车架号" placeholder="请选输入车架号" input-align="right" />
      </van-cell-group>
    </div>
    <div class="rounded-16rpx bg-white mt-24rpx">
      <van-cell-group>
        <nxInput v-model="formData.customerName" label="姓名" placeholder="请选输入姓名" input-align="right" />
        <nxInput
          v-model="formData.cellPhoneNumber"
          label="手机"
          placeholder="请选输入手机"
          input-align="right"
          right-icon="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/getphone.png"
          :get-phone-number="true"
        />
        <div class="text-28rpx ml-32rpx mt-32rpx">
          预约说明
        </div>
        <nxInput
          v-model="formData.remark"
          type="textarea"
          show-word-limit
          :maxlength="50"
          placeholder="请简要介绍车辆情况…"
          input-align="left"
        />
      </van-cell-group>
    </div>
    <div class="flex justify-center p-y-32rpx">
      <button
        :disabled="submitDisabled"
        class="bg-buttonColor w-686rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
        @click="submit"
      >
        确定
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.active-class {
  border: solid 2rpx #1E1E1E;
}

.map {
  width: 750rpx;
  height: 100vh;
}

.label-class {
  color: #000000 !important;
}
</style>
