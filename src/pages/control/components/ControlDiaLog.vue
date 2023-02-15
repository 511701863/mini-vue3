<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';
import { CarInfo, controlItem } from '../type';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { getList, getList2, pushMsg } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';

type ControlDialogProps = {
  modelValue: boolean,
  btnId: number | string
}

const router = useRouter();
const props = withDefaults(defineProps<ControlDialogProps>(), {
  modelValue: false,
  btnId: 2
});
const emit = defineEmits<{(evt: 'update:modelValue', value: boolean): void
}>();
const state = reactive<{clickItem:any, data:any}>({
  data: {},
  clickItem:null
});
const btnList = reactive<Record<string | number, controlItem[]>>({
  2: [{
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_1.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_1.png',
    check: false,
    id: 1,
    name: '鸣笛闪灯'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_2.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_2.png',
    check: false,
    id: 2,
    name: '仅鸣笛'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_3.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_3.png',
    check: false,
    id: 3,
    name: '仅闪灯'
  }
  ],
  5: [{
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_1.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_1_s.png',
    check: false,
    id: 1,
    name: '车窗全开'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_2.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_2_s.png',
    check: false,
    id: 2,
    name: '车窗半开'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_3.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_3.png',
    check: false,
    id: 3,
    name: '车窗全关'
  }
  ],
  6: [{
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_1.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_1_s.png',
    check: false,
    id: 1,
    name: '天窗全开'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_2.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_2_s.png',
    check: false,
    id: 2,
    name: '天窗翘起'
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_3.png',
    checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_3.png',
    check: false,
    id: 3,
    name: '天窗全关'
  }
  ]
});
function onSuccess(res:any) {
  emit('update:modelValue', false);
  if(state.clickItem.check !== undefined){
    state.clickItem.check = !state.clickItem.check;
  }
}
const { run, data } = useRequest<any, any>(pushMsg, {
  manual: true,
  onSuccess
});
function clickControl(item: controlItem) {
  state.clickItem = item;
  run();
  // if ([2, 5, 6].includes(Number(item.id) as number)) {
  //   emit('update:dialog', !props.dialog);
  // } else {
  //   item.check = !item.check;
  // }
}
</script>

<template>
  <van-dialog
    use-slot
    close-on-click-overlay
    :show-confirm-button="false"
    :show="props.modelValue"
    @close="emit('update:modelValue', false)"
  >
    <view class="p-16rpx pt-64rpx pb-64rpx rounded-16rpx flex justify-between">
      <div v-for="(item, index) in btnList[btnId]" :key="index" class="icon-box" @click="clickControl(item)">
        <img :src="item.check ? item.checkSrc : item.src" class="w-96rpx h-96rpx">
        <div class="text-medium mt-mini">
          {{ item.name }}
        </div>
      </div>
    </view>
  </van-dialog>
</template>
<style lang="scss" scoped>
.icon-box {
  width: 219rpx;
  box-sizing: border-box;
  margin-bottom: 32rpx;
  text-align: center;
}
</style>

