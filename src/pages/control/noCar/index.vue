<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import { useRequest } from '@/hooks/useRequest/useRequst';
import { useRouter } from '@/router/router';
import { getList, getList2 } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';
import { useConfig } from '@/store/modules/config';

const router = useRouter();
// const props = defineProps<any>();
const {setPin, config} = useConfig();
const isLogin = ref(false);
onShow(() => {
  isLogin.value = uni.getStorageSync('isLogin');
});
function addCar() {
  if (!isLogin.value) {
    router.navigateTo({
      name: 'login'
    });
  }
}
</script>

<template>
  <view class="content-box h-100vh w-100vw text-center">
    <image
      class="w-360rpx h-300rpx mt-494rpx"
      src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_car.png"
    />
    <p class="text-gray text-titleMedium">
      暂无车辆，请前往添加
    </p>
    <button
      class="mt-72rpx rounded-50rpx w-320rpx h-100rpx bg-buttonColor text-white text-32rpx lh-100rpx"
      @click="addCar"
    >
      添加车辆
    </button>
  </view>
</template>
<style lang="scss" scoped>
.content-box {
  background: linear-gradient(180deg, #ffffff 30%, #DADFE6 100%);
}
</style>

