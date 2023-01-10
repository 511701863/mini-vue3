<script lang="ts" setup>
/**
 * 视频流滑动组件
 * author: 颜必行
 */

import { reactive, ref, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { useClickPause } from './hooks';

interface VideoInfo {
  id: number,
  url: string
}
interface Props {
  refresh: () => VideoInfo[]
}

const props = defineProps<Props>();

const instance = getCurrentInstance() as ComponentInternalInstance;
const videoPause = useClickPause(instance);

const pointer = ref(0);

const videoList: VideoInfo[] = reactive(
  props.refresh()
);

function getNewVideo() {
  const newVideoList = props.refresh();
  Array.prototype.push.apply(videoList, newVideoList);
}

function changeHandle(e: any) {
  const current = e.detail.current;

  if (pointer.value > current) {
    pointer.value--;
  } else {
    pointer.value++;
  }
  videoPause.reset(`video-${pointer.value}`);
}

function finishHandle() {
  if (videoList.length - pointer.value < 10) {
    getNewVideo();
  }
}

</script>

<template>
  <swiper
    class="wh-screen"
    vertical
    interval="5000"
    @change="changeHandle"
    @animationfinish="finishHandle"
  >
    <swiper-item
      v-for="(item, index) in videoList"
      :key="index"
      class="w750"
    >
      <view class="flex-center transition-all relative">
        <img
          v-show="!videoPause.isPlay"
          class="fixed left-0 top-0 bottom-0 right-0 m-a w-200 h-200 z-36 transition pointer-events-none"
          src="@/static/images/play.png"
        >
        <video
          v-if="Math.abs(pointer - index) < 2"
          :id="`video-${index}`"
          :ref="`video-${index}`"
          :src="item.url"
          autoplay
          loop
          :controls="false"
          class="wh-screen"
          @click="videoPause.toggle(`video-${index}`)"
        ></video>
      </view>
    </swiper-item>
  </swiper>
</template>
