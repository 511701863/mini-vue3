<script setup lang="ts">
interface Props {
  // eslint-disable-next-line vue/require-default-prop
  tablist?: {
    name: any,
    id: any
  }[],
  modelValue: any,
  width?:string
}
const props = defineProps<Props>();
interface TabProps {
  (e: 'update:modelValue', modelValue: any): void
}
const emit = defineEmits<TabProps>();
const tabClick =(id:any) => {
  emit('update:modelValue', id);
};
</script>

<template>
  <view class="flex">
    <scroll-view
      class="whitespace-nowrap"
      :style="{width:props.width?props.width:''}"
      :scroll-x="true"
      :scroll-with-animation="true"
    >
      <view
        v-for="item in props.tablist"
        :key="item.id"
        class="inline-block m-r-48rpx h-60rpx leading-43rpx "
        @click="tabClick(item.id as any)"
      >
        <view :class="{'font-600':props.modelValue===item.id}" class="text-titleLarge">
          {{ item.name }}
        </view>
        <view
          v-show="props.modelValue===item.id"
          class="w-40rpx h-7rpx m-t-6rpx  bg-primary m-auto"
        />
      </view>
    </scroll-view>
    <slot></slot>
  </view>
</template>
