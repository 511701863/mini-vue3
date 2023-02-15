<script setup lang="ts">
import { ref, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import NxSelect from '@/components/nxSelect/nxSelect.vue';

import { EnvType } from '../../../types/config';

import { useUser } from '@/store/modules/user';
import { useRouter } from '@/router/router';
import { getPrivacyAgreement } from '@/api/common/agreement';
import { useConfig } from '../../../store/modules/config';
const router = useRouter();
const { logout } = useUser();
const { switchENV } = useConfig();
const flag = ref(0);
const nowENV = ref<EnvType>('dev');
const selectShow = ref(false);
const timer:any = ref(null);
function logoutFn(){
  logout();
}
nowENV.value = uni.getStorageSync('config')['ENV'];
watch(nowENV, (nNal) => {
  if(nNal!==uni.getStorageSync('config')['ENV']){
    switchENV(nNal);
  }
});
function changeENV(){
  timer.value = null;
  if(flag.value >= 5){
    selectShow.value = true;
    return;
  }
  flag.value++;
  timer.value = setTimeout(() => {
    flag.value = 0;
  }, 3000);
}
</script>

<template>
  <view class="w-full h-100vh bg-light relative">
    <view class="m-a text-center">
      <view class="p-t-200rpx m-b-32rpx" @click="changeENV">
        <nx-image
          width="180rpx"
          height="180rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/avatar.png"
        />
      </view>
      <div class="mb-120rpx font-bold">
        用户001
      </div>
      <nx-select
        v-if="selectShow"
        v-model="nowENV"
        :options="[{name:'uat',value:'uat'},{name:'dev',value:'dev'},{name:'prod',value:'prod'}]"
        label="环境选择"
      />
      <button
        class="bg-buttonColor w-654rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
        @click="logoutFn"
      >
        退出登录
      </button>
    </view>
  </view>
</template>

