<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { useUser } from '@/store/modules/user';
import { useRouter } from '@/router/router';
import { getPrivacyAgreement } from '@/api/common/agreement';
import { userLogin, userInfo } from '@/api/car';

const router = useRouter();
const { login, userState } = useUser();

// 是否扫码进入
const shareUserId = ref('');

// 手动传入返回参数
const backQuery = uni.getStorageSync('backQuery');
console.log('backQuery', backQuery);

async function bindGetUserInfo(e: any) {
  uni.showLoading({
    title: '请稍等'
  });
  const params = await login();
  const res = await userLogin(params);
  uni.setStorageSync('isLogin', true);
  uni.hideLoading();
  const userRes = await userInfo();
  userState.userInfo = userRes.data;
  console.log(userState.userInfo);
  uni.setStorageSync('userInfo', userRes.data);
  router.navigateBack({});

  // let param=e.detail;
  // if(shareUserId.value){
  //   param.shareUserId=shareUserId.value;
  // }
  // await register(param);
  // uni.showToast({
  //   icon: 'success',
  //   title: '注册成功！',
  //   duration: 1000
  // });

  // uni.navigateBack();
  // 获取路由栈
  // let pages = getCurrentPages();
  // console.log('路由栈', pages);
  // const backPath = (pages.at(-2) as any).$page.fullPath;
  // uni.reLaunch({url: backPath});
}

onLoad((query) => {
  const { scene, ...options } = query;
  if (scene && !options.inviteFriend) {
    shareUserId.value = options.shareUserId || '';
  }
});
</script>

<template>
  <view class="w-full h-100vh bg-light relative">
    <view class="m-a text-center">
      <view class="p-t-200rpx m-b-120rpx">
        <nx-image
          width="240rpx"
          height="200rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/logo.png"
        />
      </view>
      <button
        class="bg-buttonColor w-654rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
        open-type="getUserInfo"
        @getuserinfo="bindGetUserInfo"
      >
        微信快捷登录
      </button>
    </view>
  </view>
</template>

