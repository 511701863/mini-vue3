<script setup lang="ts">
import { useRouter } from '@/router/router';
import { DataList } from '@/interface/find/activity/list';
import browseComments from '@/components/browseComments/browseComments.vue';
import userInfo from '@/components/userinfo/userInfo.vue';
const router = useRouter();

/**
 * 活动入口卡片
 * author: 颜必行
 */

interface Props {
  props: DataList
}

defineProps<Props>();

const followClick = (param: any) => {
  console.log(param);
};
const toActivityMini = () => {
  if(Math.random() > 0.5){
    uni.showToast({
      icon:'none',
      title: '写死跳转到h5活动详情页'
    });
    router.navigateTo({
      name: 'baseH5',
      query: {
        path: '/activity/index',
        activityId: 13
      }
    });
    return;
  }
  uni.showToast({
    icon:'none',
    title: '写死跳转到通用活动详情页'
  });
  router.navigateTo({
    name: 'activityCommonDetail',
    query: {
      activityId: 13
    }
  });
};
</script>

<template>
  <view class="p-y-40rpx b-b b-strokeSmall">
    <userInfo
      :userinfo="props.userInfo"
      @follow-click="followClick"
    />
    <view class="m-y-24rpx text-titleMeduim text-secondaryDark">
      {{ props.activityName }}
      |
      {{ props.content }}
    </view>
    <nxImage
      height="670rpx"
      width="670rpx"
      :src="props.coverPicture"
    />
    <view class="p-y-20rpx">
      <browseComments
        :create-time="props.startTime"
        :browse-number="props.browseNumber"
        :like-number="props.joinNumber"
        :people-number="props.enrollNumber"
      />
    </view>
    <button
      v-if="props.activityStatus === 0"
      class="button-minor-disable"
      @click="toActivityMini"
    >
      活动未开始
    </button>

    <button
      v-else-if="props.activityStatus === 2"
      class="button-minor-disable"
      @click="toActivityMini"
    >
      活动已结束
    </button>

    <view
      v-else
      @click="toActivityMini"
    >
      <button
        v-if="props.enrollNumber === 0"
        class="button-minor"
      >
        立即报名
      </button>
      <button
        v-if="props.enrollNumber === 1"
        class="button-minor"
      >
        立即参与
      </button>
      <button
        v-if="props.enrollNumber === 2"
        class="button-minor"
      >
        已报名
      </button>
    </view>
  </view>
</template>
