<script setup lang="ts">
import { useRouter } from '@/router/router';
import { ref } from 'vue';
const router = useRouter();
interface Props {
  fansNumber?: string,
  followNumber?: string,
  likeNumber?: string,
  likeAndCollectNumber?: string,
  publishNumber?: string,
  goodsCollectNumber?: string
}
const props = defineProps<Props>();
const fensi = ref(0);
function fenNumber() {
  if (props?.fansNumber !== null && props?.followNumber !== null) {
    return fensi.value = Number(props?.fansNumber) + Number(props?.followNumber);
  } else if (props?.fansNumber === null && props?.followNumber !== null) {
    return fensi.value = Number(props?.followNumber);
  } else if (props?.followNumber === null && props?.fansNumber !== null) {
    return fensi.value = Number(props?.fansNumber);
  } else {
    return fensi.value = 0;
  }
}

</script>

<template>
  <view class="flex justify-around m-t-48rpx">
    <view @click="router.navigateTo({ name: 'myRelease' })">
      <view class="text-center text-titleLarge font-600">
        {{ props?.publishNumber || '0' }}
      </view>
      <view class="text-titleSmall color-secondaryText">
        我发布的
      </view>
    </view>
    <view @click="router.navigateTo({ name: 'likeAndCollect' })">
      <view class="text-center text-titleLarge font-600">
        {{ props?.likeAndCollectNumber || '0' }}
      </view>
      <view class="text-titleSmall color-secondaryText">
        点赞与收藏
      </view>
    </view>
    <view @click="router.navigateTo({name:'myCollection'})">
      <view class="text-center text-titleLarge font-600">
        {{ props?.goodsCollectNumber || '0' }}
      </view>
      <view
        class="text-titleSmall color-secondaryText"
      >
        收藏商品
      </view>
    </view>
    <view @click="router.navigateTo({ name: 'myFriends' })">
      <view class="text-center text-titleLarge font-600">
        <!-- {{ (fansNumber)+(followNumber) }} -->
        {{ fenNumber() || '0' }}
      </view>
      <view class="text-titleSmall color-secondaryText">
        我的好友
      </view>
    </view>
  </view>
</template>
