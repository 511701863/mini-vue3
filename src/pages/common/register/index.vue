<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { useUser } from '@/store/modules/user';
import { useRouter } from '@/router/router';
import { getPrivacyAgreement } from '@/api/common/agreement';

const router = useRouter();
const { login } = useUser();

// 是否扫码进入
const shareUserId = ref('');

// 手动传入返回参数
const backQuery = uni.getStorageSync('backQuery');
console.log('backQuery', backQuery);

async function decryptPhoneNumber(e: any) {
  if (!checkout.value) {
    uni.showToast({
      title: '请先同意协议',
      duration: 2000,
      icon: 'none'
    });
    return;
  }
  console.log(e);

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
const checkout = ref(false);
const agree = () => {
  checkout.value = !checkout.value;
};

function UserAgreement() {
  router.navigateTo({
    name: 'baseH5',
    query: {
      path: '/privacy'
    }
  });
}
function UserPrivacy() {
  router.navigateTo({
    name: 'baseH5',
    query: {
      path: '/privacy'
    }
  });
}
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
        open-type="getPhoneNumber"
        @getphonenumber="decryptPhoneNumber"
      >
        微信授权
      </button>
      <view class="h-150rpx m-b-40rpx absolute bottom-0 w-100vw">
        <view class="flex justify-center items-center flex-wrap">
          <view v-show="!checkout" class="lh-32rpx h-32rpx" @click="agree">
            <image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_check.png"
              class="w-32rpx h-32rpx lh-32rpx"
            />
          </view>
          <view v-show="checkout" class="lh-32rpx h-32rpx" @click="agree">
            <image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/check.png"
              class="w-32rpx h-32rpx lh-32rpx"
            />
          </view>
          <view class="flex items-start">
            <text class="text-24rpx color-neutral m-l-8rpx">
              我已阅读并同意
            </text>
            <text class="text-24rpx color-linkText" @click="UserAgreement">
              《注册协议》
            </text>
            <text class="text-24rpx color-neutral">
              和
            </text>
            <text class="text-24rpx color-linkText" @click="UserPrivacy">
              《隐私协议》
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

