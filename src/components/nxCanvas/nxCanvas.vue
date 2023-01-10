<script setup>
import { getCurrentInstance } from 'vue';
// 引入canvas方法
import { createPoster } from './canvas';
const { proxy } = getCurrentInstance();

const props = defineProps({
  width: {
    type: Number,
    default: () => 670
  },
  height: {
    type: Number,
    default: () => 800
  }
});

// 导出方法给父组件用
defineExpose({
  onDraw(options, callback) {
    createPoster.call(
      // 当前上下文
      proxy,
      // canvas相关信息
      {
        id: 'myCanvas',
        width: props.width,
        height: props.height
      },
      // 元素集合
      options,
      // 回调函数
      callback
    );
  }
});
</script>

<template>
  <canvas
    class="fixed left-9999rpx top-9999rpx"
    :style="{width: `${props.width}px`, height: `${props.height}px`}"
    canvas-id="myCanvas"
  ></canvas>
</template>
