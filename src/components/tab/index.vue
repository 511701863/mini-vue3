<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
interface Props {
  // eslint-disable-next-line vue/require-default-prop
  tablist?: {
    name: string,
    id: string
  }[],
  suffixIcon?: boolean | string,
  displayMultipleItems?: number,
  modelValue:string
}

const props = withDefaults(defineProps<Props>(), {
  suffixIcon: false,
  displayMultipleItems: 5.5
});
interface TabProps {
  (e: 'update:modelValue', modelValue: string): void
}
const emit = defineEmits<TabProps>();
const handleClick = (id: string) => {
  emit('update:modelValue', id);
};
</script>

<template>
  <view class="flex w-680rpx">
    <swiper
      v-if="props.tablist"
      :display-multiple-items="props.displayMultipleItems"
      :duration="1000"
      :easing-function="'easeInCubic'"
      class="m-t-16rpx  w-full h-70rpx"
    >
      <swiper-item
        v-for="(item, index) in props.tablist"
        :key="index"
      >
        <view
          :style="props.modelValue === item.id ? 'font-weight:600;' : ''"
          @click="handleClick(item.id)"
        >
          {{ item.name }}
        </view>
        <view
          v-show="props.modelValue === item.id"
          class="w-40rpx h-7rpx m-t-6rpx m-l-15rpx bg-primary"
        />
      </swiper-item>
    </swiper>
    <view
      v-if="props.suffixIcon"
      class="w-40rpx h-40rpx m-t-20rpx m-l-15rpx"
    >
      <nx-image
        width="40rpx"
        height="40rpx"
        :static="props.suffixIcon"
      />
    </view>
  </view>
</template>
