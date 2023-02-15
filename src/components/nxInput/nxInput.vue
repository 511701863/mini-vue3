<script setup lang="ts">
type Props = {
  modelValue?: string,
  maxlength?: number,
  placeholder?: string,
  type?: 'text' | 'number' | 'textarea' | 'digit' | 'idcard',
  showWordLimit?: boolean,
  // eslint-disable-next-line vue/require-default-prop
  autosize?: [number, number],
  required?: boolean,
  readonly?: boolean,
  customStyle?: string,
  rightIcon?: string,
  clickIcon?: () => any,
  getPhoneNumber?: boolean, //搭配rightIcon使用
  label?: string,
  border: boolean,
  inputAlign?: 'left' | 'right' | 'center'
}
type EmitProps = {
  (e: 'update:modelValue', modelValue: string): void
}
// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  customStyle: '',
  getPhoneNumber: false,
  rightIcon: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clickIcon: () => { },
  modelValue: '',
  border: false,
  maxlength: -1,
  label: '',
  inputAlign: 'left'
});
const emits = defineEmits<EmitProps>();
const contentConfirm = (e: any) => {
  emits('update:modelValue', e.detail.replace(/[ ]/g, ''));
};
function getPhoneList() {
  wx.chooseContact({
    success: ({ phoneNumber }) => {
      emits('update:modelValue', phoneNumber);
    }
  });
}
function clickFn(){
  if(props.getPhoneNumber){
    getPhoneList();
  }else{
    props.clickIcon();
  }
}
</script>

<template>
  <view>
    <van-field
      :value="props?.modelValue"
      :type="props?.type"
      :required="props?.required"
      :readonly="props?.readonly"
      :placeholder="props?.placeholder"
      :maxlength="props?.maxlength"
      :show-word-limit="props?.showWordLimit"
      :autosize="props?.autosize ? { minHeight: props.autosize[0], maxHeight: props.autosize[1] } : false"
      :custom-style="props?.customStyle"
      :label="props?.label"
      :input-align="props?.inputAlign"
      :border="props.border"
      :right-icon="props.rightIcon"
      @input="contentConfirm"
      @click-icon="clickFn"
    >
      <view slot="button">
        <slot></slot>
      </view>
    </van-field>
  </view>
</template>
