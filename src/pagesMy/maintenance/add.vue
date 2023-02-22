<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxSelect from '@/components/nxSelect/nxSelect.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { addMaintenance } from '@/api/my/maintenance';
import { getCarList } from '@/api/my/carConfig';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useStore } from '../../store/modules/store';
const router = useRouter();
const {storeState} = useStore();
const addFlag =ref(true);
const {run} = useRequest<any, MyCenter.addMaintenance[]>(addMaintenance, {
  manual:true,
  onSuccess:(res) => {
    console.log(res);
    uni.showToast({
        title:'预约成功'
    });
    router.navigateTo({name:'maintenanceDetail', query:{id:res.data}});
  }
});
const {run:getCarListFn, data:carList} = useRequest<MyCenter.VehicleLoveList[]>(getCarList, {
  manual:true
});
onLoad(() => {
  getCarListFn();
});
const formData:{[key in keyof MyCenter.addMaintenance] : any} = reactive({
  cellPhoneNumber:'',
  customerName:'',
  dealerCode:'',
  planArriveDate:'',
  planArriveTime:'',
  vin:'LUYDTESTTENCENT01',
  remark:'',
  licensePlate:'',
  store:'',
  repairType:[true, false]
});

const submitDisabled = computed(() => {
  let flag = false;
  for (const key in formData) {
    if(key!=='remark' && formData[key] === ''){
      flag = true;
    }
  }
  return flag;
});
onShow(() => {
  formData.store = storeState.name || '';
  formData.dealerCode = storeState.code || '';
});
function submit(){
  console.log(formData);
  const params = {
    ...formData
  };
  //1：保养，2：维修
  if(params.repairType[0]){
    params.repairType = 2;
  }else{
    params.repairType = 1;
  }
  run(params);
}
function changeCheckBox(num:number){
  formData.repairType = [false, false];
  formData.repairType[num] = true;
}
function selectCar(e:any){
  formData.licensePlate = e.name;
}
</script>

<template>
  <div class="relative p-32rpx bg-pageBg h-100vh box-border">
    <div class="rounded-16rpx bg-white">
      <van-cell-group>
        <div class="flex items-center justify-between p-32rpx text-28rpx h-160rpx text-titleLarge" @click="router.navigateTo({ name:'selectStore'})">
          <div v-if="!formData.store" class="text-placeHolder">
            请选择4S店
          </div>
          <div v-else>
            {{ formData.store }}
          </div>
          <van-icon name="arrow" size="30rpx" />
        </div>
        <div class="flex items-end justify-between p-32rpx text-28rpx">
          <div class="h-120rpx">
            维保类型
          </div>
          <div class="flex justify-between">
            <NxCheckBox v-model="formData.repairType[0]" checked-color="#1E1E1E" class="mr-52rpx" shape="square" @change="changeCheckBox(0)">
              维修
            </NxCheckBox>
            <NxCheckBox v-model="formData.repairType[1]" checked-color="#1E1E1E" class="mr-52rpx" shape="square" @change="changeCheckBox(1)">
              保养
            </NxCheckBox>
          </div>
        </div>
        <nxDatePicker v-model="formData.planArriveDate" :min-date="new Date().getTime()+60*60*24*1000" label="预约日期" type="date" placeholder="请选择日期" />
        <nxDatePicker v-model="formData.planArriveTime" label="预约时间" type="timeRange" placeholder="请选择时间段" />
        <nx-select
          v-model="formData.vin"
          :options="carList?.map(item=>{return { name:item.carLicense,value:item.vin }}) || []"
          label="车辆"
          placeholder="请选择车辆"
          @change="selectCar"
        />
      </van-cell-group>
    </div>
    <div class="rounded-16rpx bg-white mt-48rpx">
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
          placeholder="请输入预约说明"
          input-align="left"
        />
      </van-cell-group>
    </div>
    <div class="flex justify-center p-t-32rpx">
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
.map {
  width: 750rpx;
  height: 100vh;
}
.label-class{
  color: #000000!important;
}
</style>
