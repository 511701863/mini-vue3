<script lang="ts" setup>
import { ref, watch } from 'vue';
type Props = {
  modelValue?: string,
  maxlength?: number,
  autoFocus?: boolean,
  isPwd?: boolean,
  type?: string,
  autoClear?:boolean, //输入完成自动清除
}
type EmitProps = {
  (e: 'update:modelValue', modelValue: string): void;
  (e: 'input', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  maxlength: 4,
  autoFocus: true,
  isPwd: false,
  autoClear: true,
  type: 'bottom'
});
const emits = defineEmits<EmitProps>();

const inputValue = ref('');
const codeIndex = ref(1);
const codeArr: any | never[] = ref([]);
const ranges = ref([1, 2, 3, 4]);

watch(() => props.maxlength, (newV) => {
  if (newV === 6) {
    ranges.value = [1, 2, 3, 4, 5, 6];
  } else {
    ranges.value = [1, 2, 3, 4];
  }
}, { immediate: true });

watch(() => props.modelValue, (newV) => {
  if (newV !== inputValue.value) {
    inputValue.value = newV;
    toMakeAndCheck(newV);
  }
}, { immediate: true });

function toMakeAndCheck(val: string) {
  const arr = val.split('');
  codeIndex.value = arr.length + 1;
  codeArr.value = arr;
  if (codeIndex.value > Number(props.maxlength)) {
    // emits('finish', codeArr.value.join(''));
    setTimeout(() => {
      emits('update:modelValue', val);
      if(props.autoClear){
        clear();
      }
    }, 500);
  }
}
defineExpose({clear});
function getVal(e: any) {
  const val = e.detail.value;
  inputValue.value = val;
  emits('input', val);
  toMakeAndCheck(val);
}
// 支持使用refs来设置value
// 没有提供数据保护与检测，自己在外面对数据进行检测保护
function set(val: string) {
  inputValue.value = val;
  toMakeAndCheck(val);
}
// 支持使用refs来清空
function clear() {
  inputValue.value = '';
  codeArr.value = [];
  codeIndex.value = 1;
}
</script>
<template>
  <view class="p-16rpx pt-18rpx pb-64rpx rounded-16rpx">
    <view class="code-box">
      <view class="flex-box">
        <input
          :value="inputValue"
          type="number"
          :focus="true"
          :maxlength="maxlength"
          class="hide-input"
          @input="getVal"
        >
        <block v-for="(item, index) in ranges" :key="index">
          <view
            :class="['item', { active: codeIndex === item, middle: type === 'middle', bottom: type === 'bottom', box: type === 'box' }]"
          >
            <view v-if="type !== 'middle'" class="line" />
            <view v-if="type === 'middle' && codeIndex <= item" class="bottom-line" />
            <block v-if="isPwd && codeArr.length >= item">
              <text class="dot">
                .
              </text>
            </block>
            <block v-else>
              {{ codeArr[index]? codeArr[index] : '' }}
            </block>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>
<style scoped>
@keyframes twinkling {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.2;
  }
}

.code-box {
  text-align: center;
}

.flex-box {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
}

.flex-box .hide-input {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  text-align: left;
  z-index: 9;
  opacity: 1;
}

.flex-box .item {
  background-color: #fff;
  position: relative;
  width: 100upx;
  height: 100upx;
  margin-right: 18upx;
  font-size: 70upx;
  font-weight: bold;
  color: #333333;
  line-height: 100upx;
}

.flex-box .item:last-child {
  margin-right: 0;
}

.flex-box .middle {
  border: none;
}

.flex-box .box {
  box-sizing: border-box;
  border: 2upx solid #fff;
  border-radius: 6rpx;
}

.flex-box .bottom {
  box-sizing: border-box;
  border-bottom: 8rpx solid #212121;
}

.flex-box .active {
  border-color: #fff;
}

.flex-box .active .line {
  display: block;
}

.flex-box .line {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2upx;
  height: 40upx;
  background: #333333;
  animation: twinkling 1s infinite ease;
}

.flex-box .dot {
  font-size: 80upx;
  line-height: 40upx;
}

.flex-box .bottom-line {
  height: 4px;
  background: #000000;
  width: 80%;
  position: absolute;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
