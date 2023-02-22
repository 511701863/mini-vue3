<script setup lang="ts">
import { ref } from 'vue';
import { onShow, onPullDownRefresh, onLoad } from '@dcloudio/uni-app';

import MyCar from './components/MyCar.vue';
import Avatar from './components/Avatar.vue';

import { useRouter } from '@/router/router';

const router = useRouter();

onPullDownRefresh(async () => {
  fnUserInfo();
  // uni.stopPullDownRefresh();
});

const user = ref();

async function fnUserInfo() {
  // const data = await myInfo();
}

onShow(() => {
  fnUserInfo();
  // const my = uni.getStorageSync('myInfo');
  // user.value = my;
});
onLoad(() => {
  console.log(11);
});

</script>

<template>
  <div class="bg-myCenter h-100vh">
    <Avatar />
    <view class="p-x-32rpx">
      <MyCar />
    </view>
  </div>
</template>
