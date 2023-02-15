<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
interface Props {
  modelValue: string | number, //如果默认选择当前时间必须传入默认值
  type: 'date' | 'time' | 'year-month' | 'datetime' | 'timeRange' | 'secondsTime', //类型，可选值为 date time year-month不建议动态修改
  // eslint-disable-next-line vue/require-default-prop
  minDate?: number, //可选的最小时间，精确到分钟
  // eslint-disable-next-line vue/require-default-prop
  maxDate?: number, //可选的最大时间，精确到分钟
  // eslint-disable-next-line vue/require-default-prop
  minHour?: number, //可选的最小小时，针对 time 类型
  // eslint-disable-next-line vue/require-default-prop
  minMinute?: number, //可选的最小分钟，针对 time 类型
  // eslint-disable-next-line vue/require-default-prop
  maxMinute?: number, //可选的最大分钟，针对 time 类型
  label?: string, //顶部栏标题
  showToolbar?: true | false, //是否显示顶部栏
  itemHeight?: number, //选项高度
  confirmButtonText?: string, //确认按钮文字
  cancelButtonText?: string, //取消按钮文字
  required?: true | false,
  filter?: any,
  nextDay?: boolean,
  border?: boolean,
  inputAlign?:'left' | 'right' | 'center',
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'datetime',
  showToolbar: true,
  nextDay: false,
  label: '',
  required: false,
  inputAlign: 'right',
  itemHeight: 44,
  border: false,
  confirmButtonText: '确认',
  cancelButtonText: '取消'
});
interface Emit {
  (e: 'update:modelValue', modelValue: string): void,
}
const emit = defineEmits<Emit>();

const columns = ref([
  {
    values: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    defaultIndex: 0
  },
  {
    values: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
    defaultIndex: 0
  },
  {
    values: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
    defaultIndex: 0
  }
]);
const columnsRange = ref([
  {
    values: ['7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'],
    defaultIndex: 0
  }
]);

const input = (e: any, isTimePicker: boolean) => {
  const res = isTimePicker ? e.detail.value.join(':') : e.detail;
  emit('update:modelValue', res);
  show.value = false;
  content.value = isTimePicker ? res : dayjs(res).format(props.type==='datetime'?'YYYY-MM-DD HH:mm':'YYYY-MM-DD');
  contentSource.value = content.value;
};
const isPlaceHolder = ref(false);
const show = ref(false);
const content = ref('');
const contentSource = ref('');
watch(contentSource, (nVal) => {
  if (nVal.indexOf('-') !== -1 || nVal.indexOf(':') !== -1) {
    if (props.nextDay) {
      content.value = '次日' + content.value;
    } else {
      content.value = contentSource.value;
    }
    isPlaceHolder.value = true;
  } else {
    isPlaceHolder.value = false;
  }
}, { immediate: true });

watch(() => props.nextDay, (nVal) => {
  if (nVal) {
    content.value = '次日' + content.value;
  } else {
    content.value = contentSource.value;
  }
});
onMounted(() => {
  if (props.placeholder) {
    content.value = props.placeholder;
  }

});
function clearContent(){
  content.value = props.placeholder ?? '';
  isPlaceHolder.value = false;
}
defineExpose({clearContent});
</script>
<template>
  <van-cell
    :class="isPlaceHolder ? 'cell-content' : ''"
    :title="props.label"
    is-link
    :value="content"
    :input-align="props?.inputAlign"
    :required="props.required"
    :border="props.border"
    @click="show = true"
  />
  <van-popup :show="show" position="bottom" custom-style="height: 40%" @close="show = false">
    <van-picker
      v-if="['secondsTime', 'timeRange'].includes(props.type)"
      show-toolbar
      :columns="props.type === 'secondsTime' ? columns : columnsRange"
      :title="props.label"
      visible-item-count="5"
      @cancel="show = false"
      @confirm="(e: any) => input(e, true)"
    />
    <van-datetime-picker
      v-else
      :type="props.type"
      :value="props.modelValue === '' || props.modelValue === 0 ? new Date().getTime() : props.modelValue"
      :min-date="props.minDate || new Date().getTime() - 315360000000"
      :max-date="props.maxDate || new Date().getTime() + 315360000000"
      :min-hour="props.minHour"
      :min-minute="props.minMinute"
      :max-minute="props.maxMinute"
      :title="props.label"
      :show-toolbar="props.showToolbar"
      :item-height="props.itemHeight"
      :confirm-button-text="props.confirmButtonText"
      :cancel-button-text="props.cancelButtonText"
      @cancel="show = false"
      @confirm="(e: any) => input(e, false)"
    />
  </van-popup>
</template>
