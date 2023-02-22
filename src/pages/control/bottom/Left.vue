<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed } from 'vue';

import nxImage from '@/components/nxImage/nxImage.vue';

import { CarInfo, controlItem } from '../type';

import { useRequest } from '@/hooks/useRequest/useRequst';
import { getList, getList2, pushMsg } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';
import { useConfig } from '../../../store/modules/config';
const { setPin, config } = useConfig();

type BottomLeftProps = {
  dialog: boolean,
  id: number | string
}

const router = useRouter();

const props = withDefaults(defineProps<BottomLeftProps>(), {
  dialog: false,
  id: 2
});
const emit = defineEmits<{(e: 'update:dialog', value: boolean): void,
  (e: 'update:id', value: number | string): void
}>();
const state = reactive<{ clickItem: any, data: any }>({
  data: {},
  clickItem: {}
});

const airList = ref<controlItem[]>([{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_8_s.png',
  check: false,
  name: '急速升温'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_7_s.png',
  check: false,
  name: '极速降温'
}]);
const btnList = ref<controlItem[]>([{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_1.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_1_s.png',
  check: false,
  id: 1,
  name: '门锁'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_2_s.png',
  check: false,
  id: 2,
  name: '寻车'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_3.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_3_s.png',
  check: false,
  id: 3,
  name: '后备箱'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_4.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_4_s.png',
  check: false,
  id: 4,
  name: '发动机'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_5_s.png',
  check: false,
  id: 5,
  name: '车窗'
},
{
  src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6.png',
  checkSrc: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/home_icon_1_6_s.png',
  check: false,
  id: 6,
  name: '天窗'
}
]);
function onSuccess(res: any) {
  if (state.clickItem.check !== undefined) {
    state.clickItem.check = !state.clickItem.check;
  }
}
const { run, data } = useRequest<any, any>(pushMsg, {
  manual: true,
  onSuccess
});
function clickControl(item: controlItem) {
  return function () {
    if ([2, 5, 6].includes(Number(item.id) as number)) {
      emit('update:dialog', !props.dialog);
      emit('update:id', item.id || 2);
    } else {
      state.clickItem = item;
      run();
    }
  };
}
function goToAir() {
  router.navigateTo({ name: 'airControl' });
}
</script>

<template>
  <div>
    <div class="control-card flex justify-between flex-wrap">
      <div v-for="(item, index) in btnList" :key="index" class="icon-box" @click="setPin(true, 0, clickControl(item))">
        <nx-image
          :src="item.check ? item.checkSrc : item.src"
          width="96rpx"
          height="96rpx"
        />
        <div class="text-medium mt-mini">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="control-card">
      <div class="mb-normal flex justify-between items-start ml-16rpx">
        <div>
          空调
        </div>
        <van-icon name="arrow" size="24rpx" @click="goToAir" />
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="icon-box mt-8rpx">
          <div>
            <span class="text-72rpx">19</span><span>.5℃</span>
          </div>
          <div class="text-medium mt-mini">
            空调温度
          </div>
        </div>
        <div v-for="(item, index) in airList" :key="index" class="icon-box" @click="clickControl(item)">
          <nx-image
            :src="item.check ? item.checkSrc : item.src"
            width="96rpx"
            height="96rpx"
          />
          <div class="text-medium mt-mini">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.control-card {
  padding: 32rpx 16rpx 32rpx 16rpx;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  background-color: #fff;
  box-sizing: border-box;
  width: 686rpx;

  .icon-box {
    width: 219rpx;
    box-sizing: border-box;
    margin-bottom: 32rpx;
    text-align: center;
  }
}
</style>

