<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxSelect from '@/components/nxSelect/nxSelect.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useStore } from '../../store/modules/store';
const router = useRouter();
const {storeState} = useStore();
const addFlag =ref(true);
const formData:Record<string, any> = reactive({
  name:'d',
  center:'123',
  start:'fff',
  store:'ggg',
  car:'111',
  end:'bvvv',
  phone:'1234',
  type:[false, false]
});
const submitDisabled = computed(() => {
  let flag = false;
  for (const key in formData) {
    if(formData[key] === ''){
      flag = true;
    }
  }
  return flag;
});
onShow(() => {
  formData.store = storeState.name || 'Ceshi';
});
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
            <NxCheckBox v-model="formData.type[0]" checked-color="#1E1E1E" class="mr-52rpx" shape="square">
              维修
            </NxCheckBox>
            <NxCheckBox v-model="formData.type[1]" checked-color="#1E1E1E" class="mr-52rpx" shape="square">
              保养
            </NxCheckBox>
          </div>
        </div>
        <nxDatePicker v-model="formData.start" :min-date="new Date().getTime()+86400000" label="预约日期" type="date" placeholder="请选择日期" />
        <nxDatePicker v-model="formData.end" label="预约时间" type="timeRange" placeholder="请选择时间段" />
        <nx-select
          v-model="formData.car"
          :options="[]"
          label="车辆"
          placeholder="请选择车辆"
        />
      </van-cell-group>
    </div>
    <div class="rounded-16rpx bg-white mt-48rpx">
      <van-cell-group>
        <nxInput v-model="formData.name" label="姓名" placeholder="请选输入姓名" input-align="right" />
        <nxInput
          v-model="formData.name"
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
          v-model="formData.end"
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
