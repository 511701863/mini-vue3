<script setup lang="ts">
import { getPrivacyAgreement } from '@/api/common/agreement';
import { onLoad } from '@dcloudio/uni-app';
import { register } from '@/helper/login';
import { useRouter } from '@/router/router';
import { ref } from 'vue';

const router = useRouter();
// 是否抽奖活动邀请好友注册进入
const queryParam = ref<any>({});
// 是否扫码进入
const shareUserId = ref('');
let agreement = '';
async function getAgreement() {
  const { content } = await getPrivacyAgreement();
  agreement = content;
}

// 手动传入返回参数
const backQuery = uni.getStorageSync('backQuery');
console.log('backQuery', backQuery);

async function decryptPhoneNumber(e:any){
  if(!checkout.value){
    uni.showToast({
      title: '请先同意协议',
      duration: 2000,
      icon: 'none'
    });
    return;
  }
    let param=e.detail;
    if(shareUserId.value){
      param.shareUserId=shareUserId.value;
    }
    await register(param);
    uni.showToast({
      icon: 'success',
      title: '注册成功！',
      duration: 1000
    });

    uni.navigateBack();
    // 获取路由栈
    // let pages = getCurrentPages();
    // console.log('路由栈', pages);
    // const backPath = (pages.at(-2) as any).$page.fullPath;
    // uni.reLaunch({url: backPath});
}

onLoad((query) => {
  const {scene, ...options} = query;
  if(scene && !options.inviteFriend){
    shareUserId.value = options.shareUserId || '';
  }
  queryParam.value = query;
});
const checkout = ref(false);
const agree = () => {
  checkout.value = !checkout.value;
};

// async function decryptPhoneNumber(e: any) {
//   if(!checkout.value){
//     uni.showToast({
//       title: '请先同意协议',
//       duration: 2000,
//       icon: 'none'
//     });
//     return;
//   }

//   await register(e.detail);
//   login();
//   router.navigateBack({});
// }

function UserAgreement() {
  router.navigateTo({
    name: 'baseH5',
    query: {
      path: '/agreement/register'
    }
  });
}
function UserPrivacy() {
  router.navigateTo({
    name: 'baseH5',
    query: {
      path: '/agreement/privacy'
    }
  });
}
</script>

<template>
  <view class="w-full h-100vh bg-light">
    <view class="w-558rpx  m-a text-center">
      <view class="p-t-234rpx m-b-150rpx">
        <nx-image width="375rpx" height="98rpx" static="main-logo.png" />
      </view>
      <view class="h-150rpx m-b-40rpx">
        <view class="flex justify-start items-center flex-wrap">
          <view v-show="!checkout" class="v-mid w-32rpx h-32rpx b-rd-50%" @click="agree">
            <nx-image v-show="!checkout" static="choice.png" width="32rpx" height="32rpx" />
          </view>
          <view v-show="checkout" class="v-mid w-32rpx h-32rpx b-rd-50%" @click="agree">
            <nx-image static="check.png" width="32rpx" height="32rpx" />
          </view>
          <text class="text-titleSmall color-neutral inline-block m-l-8rpx">
            我已阅读并同意
          </text>
          <text class="text-titleSmall color-agreement" @click="UserAgreement">
            《用户协议》
          </text>
          <text class="text-titleSmall color-neutral">
            和
          </text>
          <text class="text-titleSmall color-agreement" @click="UserPrivacy">
            《隐私协议》
          </text>
          <text class="text-titleSmall color-neutral m-l-40rpx">
            首次登录将会同步注册账号
          </text>
        </view>
      </view>
      <button
        class="button-primary h-96rpx leading-96rpx"
        open-type="getPhoneNumber"
        @getphonenumber="decryptPhoneNumber"
      >
        微信注册
      </button>
    </view>
  </view>
</template>
