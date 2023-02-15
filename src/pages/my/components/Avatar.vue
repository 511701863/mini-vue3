<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useRouter } from '@/router/router';
import { useUser } from '@/store/modules/user';
const router = useRouter();
const { userState } = useUser();
const isLogin = ref(false);

onShow(() => {
  isLogin.value = uni.getStorageSync('isLogin');
});

function toLogin() {
  // switchENV('dev');
  router.navigateTo({
    name: 'login'
  });
}
function clickIcon(){
  if (!isLogin.value) {
    return;
  }
  router.navigateTo({name:'logout'});
}
</script>

<template>
  <div class="relative h-228rpx overflow-hidden">
    <image
      class="absolute h-420rpx bottom-0 w-750rpx align-middle"
      src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/meBg.png"
    />
    <div class="absolute top-60rpx left-32rpx flex">
      <image
        class="w-128rpx h-128rpx align-middle"
        src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/avatar.png"
        @click="clickIcon"
      />
      <div class="ml-24rpx p-y-16rpx">
        <div v-if="!isLogin" class="text-titleLogin font-bold" @click="toLogin">
          登录/注册
        </div>
        <div v-if="isLogin" class="text-titleLogin font-bold">
          {{ userState.userInfo.nickName }}
        </div>
        <div v-if="!isLogin" class="text-grayText text-titleSmall">
          登录后解锁更多权益
        </div>
      </div>
    </div>
  </div>
</template>
