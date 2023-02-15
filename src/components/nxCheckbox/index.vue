<script setup lang="ts">
/**
 * 单个复选框
 */
interface Props{
  modelValue?: any,
  shape?:string,
  checkedColor?:string,
  size?:string,
  disabled?:boolean
}

 withDefaults(defineProps<Props>(), {
  modelValue:false,
  shape:'round',
  checkedColor:'#376C80',
  size:'32',
  disabled:false
});

interface Emit {
  (e: 'update:modelValue', modelValue: any): void,
  (e: 'change', modelValue: any): void
}

const emit = defineEmits<Emit>();

const onChange=(e:any) => {
  console.log(e.detail);
  emit('update:modelValue', e.detail);
  emit('change', e.detail);
};
</script>

<template>
  <view>
    <van-checkbox
      :value="modelValue"
      :shape="shape"
      :icon-size="size+'rpx'"
      :checked-color="checkedColor"
      :disabled="disabled"
      @change="onChange"
    >
      <slot></slot>
    </van-checkbox>
  </view>
</template>

<style scoped>
.van-checkbox, .van-checkbox__label{
  padding-left:20rpx !important;
}
</style>
