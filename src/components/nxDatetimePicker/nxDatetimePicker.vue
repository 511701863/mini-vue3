<script setup lang="ts">
import {onMounted, ref} from 'vue';
import dayjs from 'dayjs';
interface Props{
  modelValue:string | number, //如果默认选择当前时间必须传入默认值
  type:'date'|'time'|'year-month'|'datetime', //类型，可选值为 date time year-month不建议动态修改
  // eslint-disable-next-line vue/require-default-prop
  minDate?:number, //可选的最小时间，精确到分钟
  // eslint-disable-next-line vue/require-default-prop
  maxDate?:number, //可选的最大时间，精确到分钟
  // eslint-disable-next-line vue/require-default-prop
  minHour?:number, //可选的最小小时，针对 time 类型
  // eslint-disable-next-line vue/require-default-prop
  minMinute?:number, //可选的最小分钟，针对 time 类型
  // eslint-disable-next-line vue/require-default-prop
  maxMinute?:number, //可选的最大分钟，针对 time 类型
  label?:string, //顶部栏标题
  showToolbar?:true|false, //是否显示顶部栏
  itemHeight?:number, //选项高度
  confirmButtonText?:string, //确认按钮文字
  cancelButtonText?:string, //取消按钮文字
  required?:true|false,
  filter?:any,
  placeholder?:string
}
const props=withDefaults(defineProps<Props>(), {
  type:'datetime',
  showToolbar:true,
  label:'',
  required:false,
  itemHeight:44,
  confirmButtonText:'确认',
  cancelButtonText:'取消'
});
interface Emit {
  (e: 'update:modelValue', modelValue: string): void,
}
const emit = defineEmits<Emit>();
const input=(e:any) => {
  emit('update:modelValue', e.detail);
  show.value=false;
  content.value=dayjs(e.detail).format('YYYY-MM-DD');
};
const show=ref(false);
const content=ref();
onMounted(() => {
  if(props.placeholder){
    content.value=props.placeholder;
  }

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
  <van-popup
    :show="show"
    position="bottom"
    custom-style="height: 40%"
    @close="show=false"
  >
    <van-datetime-picker
      :filter="props.filter"
      :type="props.type"
      :value="props.modelValue===''||props.modelValue===0?new Date().getTime():props.modelValue"
      :min-date="props.minDate"
      :max-date="props.maxDate"
      :min-hour="props.minHour"
      :min-minute="props.minMinute"
      :max-minute="props.maxMinute"
      :title="props.label"
      :show-toolbar="props.showToolbar"
      :item-height="props.itemHeight"
      :confirm-button-text="props.confirmButtonText"
      :cancel-button-text="props.cancelButtonText"
      @cancel="show=false"
      @confirm="input"
    />
  </van-popup>
</template>
