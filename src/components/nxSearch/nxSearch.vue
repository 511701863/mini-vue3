<script setup lang="ts">
interface Props{
  label?: string,
  placeholder?: string,
  useActionSlot?: true | false,
  modelValue?:string
}
interface EmitProps {
  (e: 'update:modelValue', modelValue: string): void,
  (e: 'search'):void
}
const props = withDefaults(defineProps<Props>(), {
  useActionSlot: false,
  placeholder: '',
  label: '',
  modelValue:''
});

const emits = defineEmits<EmitProps>();
const contentConfirm = (e: any) => {
  emits('update:modelValue', e.detail);
};
const onClick = () => {
  emits('search');
};
</script>

<template>
  <van-search
    :value="props.modelValue"
    :label="props.label"
    :placeholder="props.placeholder"
    :use-action-slot="props.useActionSlot"
    @change="contentConfirm"
  >
    <view
      slot="action"
      @click="onClick"
    >
      <slot></slot>
    </view>
  </van-search>
</template>
