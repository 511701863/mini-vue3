/**
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 基础图片组件（支持静态和动态cos）
 * author: 颜必行
 */
interface Props {
  width?: string,
  height?: string,
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down',
  round?: boolean,
  src?: string,
  isCos?: boolean,
  static?: string | boolean,
  previewList: any[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  fit: 'cover',
  round: false,
  isCos: true,
  static: false,
  src: '',
  previewList: () => []
});

const quality = '?imageMogr2/crop/375x375/gravity/center';
const static_cdn = 'https://cos-app-dev.dflzm.com/00_static/';

const src = computed({
  get: () => {
    if (!!props.static) {
      return `${static_cdn}${props.static}`;
    } else if (props.isCos) {
      return `${props.src}${quality}`;
    } else {
      return `${props.src}`;
    }
  },
  set: (val) => {
    console.log('src set', val);
  }
});

function preview(){
  if(props.previewList.length > 0){
    uni.previewImage({
      urls: props.previewList
    });
  }
}
</script>

<template>
  <view class="relative" @click="preview">
    <van-image
      :width="props.width"
      :height="props.height"
      :fit="props.fit"
      :round="props.round"
      :src="src"
    />
    <view class="absolute w-full bottom-0 left-0 bg-mantle color-white">
      <slot></slot>
    </view>
  </view>
</template>
