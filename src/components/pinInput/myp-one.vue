<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useConfig } from '../../store/modules/config';
import { checkHasSetPin, verifyPin, getPublicKey } from '@/api/my/pinConfig';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useRouter } from '@/router/router';
import { setPublicKey, getRsaPin } from '@/utils/rsa/index';
type Props = {
  value?: string,
  maxlength?: number,
  autoFocus?: boolean,
  isPwd?: boolean,
  type?: string,
}
type EmitProps = {
  (e: 'finish', value: string): void;
  (e: 'input', value: string): void;
}
const { config, setPin } = useConfig();
const router = useRouter();

const props = withDefaults(defineProps<Props>(), {
  value: '',
  maxlength: 4,
  autoFocus: true,
  isPwd: false,
  type: 'bottom'
});

const { run: checkPinFn, data: hasPin } = useRequest<boolean>(checkHasSetPin, {
  manual: true,
  onSuccess: (res) => {
    if (res.data) {
      modelShow.value = true;
    } else {
      uni.showModal({
        title: '设置PIN码',
        content: '请设置PIN码',
        confirmColor: '#FF933B',
        success: function (res) {
          if (res.confirm) {
            router.navigateTo({ name: 'pinConfigSetPin' });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
});
const modelShow = ref<boolean>(false);
watch(() => config.pinShow, (newV) => {
  if (newV) {
    checkPinFn();
  } else {
    modelShow.value = false;
  }
}, { immediate: true });
const emits = defineEmits<EmitProps>();

const inputValue = ref('');
const codeIndex = ref(1);
const codeArr: any | never[] = ref([]);
const ranges = ref([1, 2, 3, 4]);
//加密后的pin
const rsaPin:any = ref('');
watch(() => props.maxlength, (newV) => {
  if (newV === 6) {
    ranges.value = [1, 2, 3, 4, 5, 6];
  } else {
    ranges.value = [1, 2, 3, 4];
  }
}, { immediate: true });

watch(() => props.value, (newV) => {
  if (newV !== inputValue.value) {
    inputValue.value = newV;
    toMakeAndCheck(newV);
  }
}, { immediate: true });

const { run: getPublicKeyFn, data: publicKeyData } = useRequest<{ publicKey: string }>(getPublicKey, {
  manual: true,
  onSuccess: (res) => {
    setPublicKey(publicKeyData.value?.publicKey);
    rsaPin.value = getRsaPin(codeArr.value.join(''));
    verifyPinFn({ pin: rsaPin.value });
  }
});
const { run: verifyPinFn } = useRequest<boolean>(verifyPin, {
  manual: true,
  onSuccess: (res) => {
    config.pin = rsaPin.value;
    setPin(false, Date.now());
    clear();
  },
  onError:() => {
    setPin(false);
    clear();
  }
});
function toMakeAndCheck(val: string) {
  const arr = val.split('');
  codeIndex.value = arr.length + 1;
  codeArr.value = arr;
  if (codeIndex.value > Number(props.maxlength)) {
    // emits('finish', codeArr.value.join(''));
    getPublicKeyFn();
  }
}

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
function closeDialog() {
  setPin(false);
}
</script>
<template>
  <van-dialog use-slot :show-confirm-button="false" :show="modelShow" @close="closeDialog">
    <view class="p-16rpx pt-18rpx pb-64rpx rounded-16rpx">
      <view class="flex justify-between">
        <div></div>
        <div class="text-gray pb-32rpx p-x-24rpx" @click="closeDialog">
          x
        </div>
      </view>
      <div class="text-center pb-32rpx">
        请输入PIN码
      </div>
      <view class="code-box">
        <view class="flex-box">
          <input
            :value="inputValue"
            type="number"
            :focus="config.pinFocus"
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
                {{ codeArr[index] ? codeArr[index] : '' }}
              </block>
            </view>
          </block>
        </view>
      </view>
      <view class="flex justify-between">
        <div></div>
        <div class="text-warn pt-32rpx p-x-24rpx" @click="closeDialog">
          忘记PIN码？
        </div>
      </view>
    </view>
  </van-dialog>
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
  flex-wrap: wrap;
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
  border: 2upx solid #cccccc;
  border-radius: 6rpx;
}

.flex-box .bottom {
  box-sizing: border-box;
  border-bottom: 8rpx solid #212121;
}

.flex-box .active {
  border-color: #696969;
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
