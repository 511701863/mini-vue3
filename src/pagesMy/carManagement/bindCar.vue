<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxInput from '@/components/nxInput/nxInput.vue';

import { judgeVehicleUserByVin, findVehicleInfo, findVehicleInfoByScan } from '@/api/my/carManagement';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
const router = useRouter();

const formData:Record<string, any> = reactive({
  engineNumber:'',
  vin:''
});
const scanVin:Ref<string> = ref('');
const { run:judgeVehicleUserByVinFn, data:carStatus } = useRequest(judgeVehicleUserByVin, {
  manual: true,
  onSuccess: () => {
    if(!carStatus.value){
      if(activeNames.value === '1'){
        findVehicleInfoByScanFn({vin:scanVin.value});
      }else{
        findVehicleInfoFn(formData);
      }
    }else{
      uni.showToast({
        title:'车辆已绑定其他车主',
        icon:'none'
      });
    }
  }
});
const { run:findVehicleInfoFn, data:carInfo } = useRequest(findVehicleInfo, {
  manual: true,
  onSuccess: () => {
      router.navigateTo({name:'carManagementBindCarConfirm', query:{info:JSON.stringify(carInfo.value)}});
  }
});
const { run:findVehicleInfoByScanFn, data:carInfoScan } = useRequest(findVehicleInfoByScan, {
  manual: true,
  onSuccess: () => {
      router.navigateTo({name:'carManagementBindCarConfirm', query:{info:JSON.stringify(carInfoScan.value)}});
  }
});
const activeNames =ref('1');
function onChange(event:any){
  activeNames.value = event.detail;
  console.log(activeNames.value);

}
function scanCode(){
  uni.scanCode({
  success (res) {
    scanVin.value = res.result;
    judgeVehicleUserByVinFn({vin:scanVin.value.slice(0, 17)});
  }
});
}
function nextTap(){
  judgeVehicleUserByVinFn({vin:formData.vin});
}
const submitDisabled = computed(() => {
  let flag = false;
  for (const key in formData) {
    if(formData[key] === ''){
      flag = true;
    }
  }
  return flag;
});
</script>

<template>
  <div class="relative bg-pageBg h-100vh p-32rpx box-border bind-car">
    <div class="mt-48rpx relative w-686rpx bg-white mb-32rpx rounded-16rpx box-border">
      <van-collapse :value="activeNames" :border="false" accordion @change="onChange">
        <van-collapse-item title="扫码绑车" name="1" class="rounded-16rpx">
          <div class="text-center p-16rpx" @click="scanCode">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/QrCode.png"
              width="176rpx"
              height="136rpx"
            />
            <div class="text-titleSmall text-gray mt-18rpx">
              车机桌面→个人中心→绑定车辆二维码
            </div>
          </div>
        </van-collapse-item>
        <div class="p-16rpx bg-pageBg">
        </div>
        <van-collapse-item title="其他绑定方式" name="2">
          <div class="coll-form">
            <nxInput v-model="formData.vin" label="车架号*" placeholder="请选输入车架号" input-align="right" />
            <nxInput v-model="formData.engineNumber" label="发动机号*" placeholder="请选输入发动机号" input-align="right" />
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="font-bold mt-48rpx text-titleLarge p-x-32rpx">
      提示
    </div>
    <div class="text-titleSmall text-gray mt-18rpx p-x-32rpx">
      应国家工信部物联网行业卡管理要求，联网车辆需要实名认证，请提前准备您的有效证件。
    </div>
    <button
      v-if="activeNames==='2'"
      class="absolute bottom-48rpx left-32rpx bg-buttonColor w-654rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
      :disabled="submitDisabled"
      @click="nextTap"
    >
      下一步
    </button>
  </div>
</template>
<style scoped lang="scss">
</style>
