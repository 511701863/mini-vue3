<script setup lang="ts">
import { computed, ref } from 'vue';

/**
 * 表单-下拉选择组件
 * author:颜必行
 */
 interface Options{
  name: string // 展示字段
  value: any // 映射字段
  subname?: string //二级标题
  color?: string //选项文字颜色
  loading?: boolean //是否为加载状态
  disabled?: boolean // 是否为禁用状态
}

interface Props{
  modelValue?: any,
  label?: string,
  placeholder?: string,
  options: Options[],
  required?:boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  label: ''
});

interface Emit {
  (e: 'update:modelValue', modelValue: string): void
}

const emit = defineEmits<Emit>();

const show = ref(false);

const select = (e:any) => {
  emit('update:modelValue', e.detail.value);
};

const content = computed(() => {
  const activeItem = props.options.find((item) => item.value === props.modelValue);
  return activeItem ? activeItem.name : props.placeholder;
});
</script>

<template>
  <van-cell
    :title="props.label"
    is-link
    :value="content"
    :required="props.required"
    @click="show = true"
  />
  <van-action-sheet
    :title="props.label"
    :show="show"
    :actions="props.options"
    @select="select"
    @close="show = false"
  />
</template>
