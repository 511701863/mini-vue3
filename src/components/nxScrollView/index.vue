<script setup lang="ts">
import { ref, reactive, Ref, useSlots, computed, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { useRequest } from '../../hooks/useRequest/useRequst';
type Props = {
  //下拉刷新阈值
  refreshTop?: number,
  params: any,
  //是否开启底部刷新
  isLowerBottom: boolean,
  cbFn: (...args: any[]) => Promise<any>,
  headerHeight?: number
}
const props = withDefaults(defineProps<Props>(), {
  refreshTop: 70,
  headerHeight: 0,
  isLowerBottom: true,
  params: {}
});
const page = reactive({
  pageSize: 5,
  pageIndex: 1,
  total: 5
});
const showBottom = ref(false);
//是否开启滚动标识
const scrollEnabled = ref(true);
//是否开启下拉刷新
const isOpenRefresh = ref(true);
//当前下拉刷新状态
const triggered = ref(false);
const _freshing = ref(false);
const iconDown = ref(true);
const scrollTop = ref(0);
const refreshText = ref('下拉可以刷新');
const bottomText = ref('下拉加载更多');
const scrollHeight = ref(0);
//获取到的数据
const list: any = ref([]);

function onPulling(e: any) {
  if (e.detail.dy < 0) { return; } // 防止上滑页面也触发下拉
  scrollEnabled.value = false;
  if (e.detail.dy < props.refreshTop) {
    refreshText.value = '下拉可以刷新';
    iconDown.value = true;
  } else {
    refreshText.value = '释放立即刷新';
    iconDown.value = false;
  }
  triggered.value = true;
}
const { run, data } = useRequest(props.cbFn, {
  manual: true,
  // refreshDeps:[() => page.pageIndex],
  // refreshDepsParams:computed(() => [Object.assign({ pageSize: page.pageSize, pageIndex: page.pageIndex }, props.params)]),
  onSuccess: (res) => {
    page.total = data.value?.page?.totalCount ?? 0;
    page.pageSize = data.value?.page?.pageSize ?? 0;
    page.pageIndex = data.value?.page?.pageIndex ?? 0;
    if (page.pageIndex > 1) {
      list.value = [...list.value, ...(data.value?.dataList ?? [])];
    } else {
      list.value = data.value?.dataList;
    }
    if (page.pageSize * page.pageIndex >= page.total) {
      bottomText.value = '已经到底了';
    } else {
      bottomText.value = '下拉加载更多';
    }
    console.log(data.value?.page?.pageSize);

    if (data.value?.page?.pageSize * 1 < page.total) {
      showBottom.value = true;
    }
  },
  onFinally: () => {
    if (_freshing.value) {
      triggered.value = false;
      _freshing.value = false;
    }
  }
});
function search(){
  run(Object.assign({ pageSize: page.pageSize, pageIndex: page.pageIndex }, props.params));
}
onLoad(() => {
  uni.getSystemInfo({
    success: function (res) {
      const windowHeight = res.windowHeight;
      let screenWidth = res.windowWidth;
      // scrollHeight.value = windowHeight - props.headerHeight/2;
      scrollHeight.value = windowHeight - (props.headerHeight * screenWidth / 750);
      console.log(windowHeight, (props.headerHeight * screenWidth / 750));
    }
  });
  search();
});
function onRefresh() {
  if (_freshing.value) { return; }
  refreshText.value = '正在刷新...';
  _freshing.value = true;
  page.pageIndex = 1;
  search();
}
function onRestore() {
  triggered.value = false; // 需要重置
  scrollEnabled.value = true;
}
function onAbort() {
  scrollEnabled.value = true;

}
function onScroll(e: any) {
  scrollTop.value = e.detail.scrollTop;
  if (e.detail.scrollTop > 30) {
    isOpenRefresh.value = false;
  } else {
    isOpenRefresh.value = true;
  }
}
function onTouchend(e: any) {
  isOpenRefresh.value = true;
}
function lowerBottom() {
  if (!props.isLowerBottom) { return; }
  if (page.pageSize * page.pageIndex >= page.total) { return; }
  bottomText.value = '加载中';
  page.pageIndex++;
  search();
}
function upperTop() {
  isOpenRefresh.value = true;
}
const hasData = computed(() => {
  return (Array.isArray(list.value) && list.value.length > 0) || (!Array.isArray(list.value) && list.value);
});
defineExpose({search});
</script>
<template>
  <scroll-view
    class="bg-pageBg box-border"
    :style="`height:${scrollHeight}px;`"
    :scroll-y="scrollEnabled"
    :refresher-threshold="props.refreshTop"
    :refresher-enabled="isOpenRefresh"
    :refresher-triggered="triggered"
    scroll-top="1"
    refresher-default-style="none"
    refresher-background="#EAECEF"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @refresherabort="onAbort"
    @scrolltolower="lowerBottom"
    @scrolltoupper="upperTop"
    @touchend="onTouchend"
    @scroll="onScroll"
  >
    <template #refresher>
      <div class="text-grayText pb-42rpx w-100vw flex justify-center items-center">
        <div class="mr-24rpx">
          <van-loading v-if="_freshing" size="42rpx" type="spinner" />
          <van-icon
            v-else
            name="down"
            size="42rpx"
            :custom-style="iconDown ? 'transition: transform 0.3s;' : 'transform:rotate(180deg);transition: transform 0.3s;'"
          />
        </div>
        <div>
          <div>{{ refreshText }}</div>
          <div class="text-titleSmall">
            {{ dayjs(Date.now()).format('YYYY-MM-DD hh:mm') }}
          </div>
        </div>
      </div>
    </template>
    <slot v-if="hasData" name="list" :list="list"></slot>
    <div v-if="!hasData" class="flex justify-center" :style="`height:${scrollHeight}px;`">
      <slot v-if="$slots?.noData" name="noData"></slot>
      <div v-else class="text-center mt-360rpx">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_data.png"
          width="360rpx"
          height="300rpx"
        />
        <div class="text-titleMedium text-grayText">
          暂无相关数据
        </div>
      </div>
    </div>
    <div
      v-if="Array.isArray(list) && list.length && isLowerBottom && showBottom"
      class="text-center text-grayText p-16rpx w-100vw text-32rpx"
    >
      <van-loading v-if="bottomText === '加载中'" size="32rpx" class="mr-32rpx" type="spinner" />{{ bottomText }}
    </div>
  </scroll-view>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
