<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import nxImage from '@/components/nxImage/nxImage.vue';
interface Props {
  type?: string,
  createTime?: number,
  createTimeRange?: [number | never, number | never],
  likeNumber?: number,
  answerNumber?: number,
  browseNumber?: number,
  collectionNumber?: number,
  likeStatus?: number,
  collectionStatus?: number,
  positionName?: string,
  // 参与人数
  peopleNumber?: number,
}
const props = withDefaults(defineProps<Props>(), {
  type: '',
  likeNumber: -1,
  answerNumber: -1,
  collectionNumber: -1,
  browseNumber: -1,
  peopleNumber: -1
});

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
function formatTime() {
  const nowTime = new Date().getTime();
  const createTimes = props?.createTime as number;
  if (nowTime - createTimes >= 31536000000) {
    return dayjs(props.createTime).format('YYYY-MM-DD');
  } else {
    return dayjs(props.createTime).fromNow();
  }
}
function formatTimeRange() {
  const createRange = props?.createTimeRange as number[];
  if (createRange[0] !== 0 && createRange[1] !== 0) {
    return `${dayjs(createRange[0]).format('YYYY-MM-DD')} 到 ${dayjs(createRange[1]).format('YYYY-MM-DD')}`;
  } else if (createRange[0] === 0) {
    return `${dayjs(createRange[1]).format('YYYY-MM-DD')} 结束`;
  } else if (createRange[1] === 0) {
    return `${dayjs(createRange[0]).format('YYYY-MM-DD')} 开始`;
  }
}
interface EmiteProps {
  (event: 'collectionClick'): void,
  (event: 'likeClick'): void
  (event:'answerClick'):void
}
const emits = defineEmits<EmiteProps>();
const collectionClick = () => {
  emits('collectionClick');
};

const likeClick = () => {
  emits('likeClick');
};
const answerClick=() => {
  emits('answerClick');
};
</script>

<template>
  <view class="flex-between  m-t-16rpx  text-medium">
    <view
      v-if="props?.createTime"
      class="color-secondaryText"
    >
      <text v-if="props?.type">
        发布于
      </text>{{ formatTime() }}
      <text v-if="props?.positionName">
        | {{ props?.positionName }}
      </text>
    </view>
    <view
      v-if="props?.createTimeRange"
      class="color-secondaryText"
    >
      {{ formatTimeRange() }}
    </view>

    <view class="flex items-center">
      <view
        v-if="props?.browseNumber >= 0"
        class="flex"
      >
        <!-- <img
          class="w-28rpx h-28rpx vertical-middle"
          src="@/static/images/eyes-gray.png"
          alt=""
        > -->
        <nx-image
          static="eyes-gray.png"
          width="28rpx"
          height="28rpx"
          class="m-t-5rpx"
        />
        <view class="color-secondaryText m-l-5rpx">
          {{ props?.browseNumber }}
        </view>
      </view>

      <view
        v-if="props?.collectionNumber >= 0"
        class="flex"
      >
        <!-- <img
          class="w-28rpx h-28rpx vertical-middle"
          :src="props?.collectionStatus === 1 ? getLocalImg('start-gray.png') : getLocalImg('start.png')"
          alt=""
          @click="collectionClick"
        > -->
        <view @click="collectionClick">
          <nx-image
            v-if="props?.collectionStatus===1"
            static="start-gray.png"
            width="28rpx"
            height="28rpx"
            class="m-t-5rpx"
          />
          <nx-image
            v-else
            static="start.png"
            width="28rpx"
            height="28rpx"
            class="m-t-5rpx"
          />
        </view>

        <view class="color-secondaryText m-l-5rpx">
          {{ props?.collectionNumber }}
        </view>
      </view>

      <view
        v-if="props?.likeNumber >= 0"
        class="m-l-40rpx flex"
      >
        <!-- <img
          class="w-28rpx h-28rpx vertical-middle"
          :src="props?.likeStatus === 1 ? getLocalImg('zan-gray.png') : getLocalImg('zan.png')"
          alt=""
          @click="likeClick"
        > -->
        <view @click="likeClick">
          <nx-image
            :static="props?.likeStatus ===1?'zan-gray.png':'zan.png'"
            width="28rpx"
            height="28rpx"
            class="m-t-5rpx"
          />
        </view>
        <view class="color-secondaryText m-l-5rpx">
          {{ props?.likeNumber }}
        </view>
      </view>

      <view
        v-if="props?.answerNumber >= 0"
        class="m-l-40rpx flex"
        @click="answerClick"
      >
        <!-- <img
          class="w-28rpx h-28rpx vertical-middle"
          :src="getLocalImg('pinglun.png')"
          alt=""
        > -->
        <nx-image
          static="pinglun.png"
          width="28rpx"
          height="28rpx"
          class="m-t-5rpx"
        />
        <view class="color-secondaryText m-l-5rpx">
          {{ props?.answerNumber }}
        </view>
      </view>

      <view
        v-if="props?.peopleNumber >= 0"
        class="m-l-40rpx flex"
      >
        <!-- <img
          class="w-28rpx h-28rpx vertical-middle"
          :src="getLocalImg('pinglun.png')"
          alt=""
        > -->
        <nx-image
          static="people.png"
          width="28rpx"
          height="28rpx"
          class="m-t-5rpx"
        />
        <view class="color-secondaryText m-l-5rpx">
          {{ props?.peopleNumber }}
        </view>
      </view>
    </view>
  </view>
</template>
