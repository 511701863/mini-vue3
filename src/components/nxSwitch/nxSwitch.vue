<script setup lang="ts">
/**
 * 表单-开关组件
 * author:颜必行
 */
interface Props {
  modelValue: 1 | 0,
  label?: string,
  tips?: string,
  size?: string,
  required: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  label: '',
  tips: '',
  size: '40rpx',
  required: false
});

interface Emit {
  (e: 'update:modelValue', modelValue: string): void
}

const emit = defineEmits<Emit>();

const onChange = (e: any) => {
  console.log(e);
  emit('update:modelValue', e.detail);
};
</script>

<template>
  <van-cell
    :title="props.label"
    title-width="500rpx"
    center
    :label="props.tips"
    :required="required"
  >
    <van-switch
      :size="size"
      :active-value="1"
      :inactive-value="0"
      :checked="props.modelValue"
      active-color="#376C80"
      @change="onChange"
    />
  </van-cell>
</template>
