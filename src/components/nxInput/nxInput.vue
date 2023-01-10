<script setup lang="ts">
/**
 * 输入框组件
 * author:张嘉伟
 */
interface EmitProps {
  (e: 'update:modelValue', modelValue: string): void
}
interface Props {
  modelValue?: string,
  maxlength?: number,
  placeholder?: string,
  type?: 'text' | 'number' | 'textarea' | 'digit' | 'idcard',
  showWordLimit?: boolean,
  // eslint-disable-next-line vue/require-default-prop
  autosize?: [number, number],
  required?: boolean,
  customStyle?: string,
  label?: string,
  inputAlign?: 'left' | 'right' | 'center'
}
// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  customStyle: '',
  modelValue: '',
  maxlength: -1,
  label: '',
  inputAlign: 'left'
});
const emits = defineEmits<EmitProps>();
const contentConfirm = (e: any) => {
  emits('update:modelValue', e.detail);
};
</script>

<template>
  <view>
    <van-field
      :value="props?.modelValue"
      :type="props?.type"
      :required="props?.required"
      :placeholder="props?.placeholder"
      :maxlength="props?.maxlength"
      :show-word-limit="props?.showWordLimit"
      :autosize="props?.autosize ? { minHeight: props.autosize[0], maxHeight: props.autosize[1] } : false"
      :custom-style="props?.customStyle"
      :label="props?.label"
      :input-align="props?.inputAlign"
      @change="contentConfirm"
    />
  </view>
</template>
