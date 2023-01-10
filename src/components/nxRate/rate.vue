<script setup lang="ts">
interface Props{
  modelValue?: any,
  size?:number|string,
  count?:number,
  color:string,
  voidColor:string,
  readonly?:true | false,
  allowHalf?:false |true,
  voidIcon?:string,
  icon?:string
}
const props=withDefaults(defineProps<Props>(), {
  modelValue:0,
  readonly:false,
  size:20,
  allowHalf:false,
  count:5,
  voidIcon:'start',
  icon:'start'
});
interface Emit {
  (e: 'update:modelValue', modelValue: string): void
}
const emit = defineEmits<Emit>();
const change=(e:any) => {
  console.log(e);
  emit('update:modelValue', e.detail);
};
</script>

<template>
  <van-rate
    :value="props.modelValue"
    :allow-half="props.allowHalf"
    :size="props.size"
    :readonly="props.readonly"
    :color="props.color"
    :void-icon="props.voidIcon"
    :void-color="props.voidColor"
    @change="change"
  />
</template>
