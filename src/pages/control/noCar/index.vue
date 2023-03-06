<script setup lang="ts">
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import { useRouter } from '@/router/router';

const router = useRouter();
const isLogin = ref(false);
onShow(() => {
  isLogin.value = uni.getStorageSync('isLogin');
});
function goLogin() {
  router.navigateTo({
      name: 'login'
    });
}
</script>

<template>
  <view class="content-box h-100vh w-100vw text-center">
    <image
      class="w-360rpx h-300rpx mt-494rpx"
      src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_car.png"
    />
    <p class="text-gray text-titleMedium">
      暂未登录，请登录
    </p>
    <button
      class="mt-72rpx rounded-50rpx w-320rpx h-100rpx bg-buttonColor text-white text-32rpx lh-100rpx"
      @click="goLogin"
    >
      去登陆
    </button>
  </view>
</template>
<style lang="scss" scoped>
.content-box {
  background: linear-gradient(180deg, #ffffff 30%, #DADFE6 100%);
}
</style>

