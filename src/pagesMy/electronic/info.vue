<script setup lang="ts">
import { ref, reactive, Ref, watch, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxDatePicker from '@/components/nxDatetimePicker/nxDatetimePicker.vue';
import nxInput from '@/components/nxInput/nxInput.vue';
import NxCheckBox from '@/components/nxCheckbox/index.vue';
import NxSelect from '@/components/nxSelect/nxSelect.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

const router = useRouter();
const addFlag =ref(true);
const nextDay =ref(false);
const formData:Record<string, any> = reactive({
  name:'',
  center:'123',
  start:'',
  end:'',
  car:'1',
  type:[true, false]
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
watch([() => formData.start, () => formData.end], (nVal) => {
  if(formData.end && formData.start && (new Date(`2023 ${formData.start}`).getTime() >= new Date(`2023 ${formData.end}`).getTime())){
    nextDay.value=true;
    console.log(new Date(`2023 ${formData.start}`).getTime(), new Date(`2023 ${formData.end}`).getTime());

  }else{
    nextDay.value=false;
  }
});
onLoad((e) => {
  if (e.add === 'true') {
    addFlag.value = true;
    wx.setNavigationBarTitle({title: '电子围栏创建'});
  }else{
    wx.setNavigationBarTitle({title: '电子围栏编辑'});
    addFlag.value = false;
  }
});

</script>

<template>
  <div class="relative p-32rpx bg-pageBg h-100vh box-border">
    <div class="rounded-16rpx bg-white">
      <van-cell-group>
        <nxInput v-model="formData.name" label="用户名" placeholder="请选输入围栏名称" input-align="right" />
        <nxInput v-model="formData.center" label="围栏中心" placeholder="请选输入围栏名称" input-align="right" />
        <nxDatePicker v-model="formData.start" label="监控开始时段" type="secondsTime" placeholder="请选择时间段" />
        <nxDatePicker v-model="formData.end" label="监控结束时段" :next-day="nextDay" type="secondsTime" placeholder="请选择时间段" />
        <nx-select
          v-model="formData.car"
          :options="[]"
          label="监控车辆"
          placeholder="请选择监控车辆"
        />
        <div class="flex items-center justify-between p-y-32rpx p-x-32rpx text-28rpx text-">
          <div>
            告警提醒
          </div>
          <div class="flex justify-between">
            <NxCheckBox v-model="formData.type[0]" checked-color="#FF933B" class="mr-52rpx" shape="square">
              驶入
            </NxCheckBox>
            <NxCheckBox v-model="formData.type[1]" checked-color="#FF933B" class="mr-52rpx" shape="square">
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
.label-class{
  color: #000000!important;
}
</style>
