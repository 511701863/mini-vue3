<script setup lang="ts">
import { ref, reactive, Ref, useSlots } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
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
  if (e.detail.dy < props.refreshTop) {
    refreshText.value = '下拉可以刷新';
    iconDown.value = true;
  } else {
    refreshText.value = '释放立即刷新';
    iconDown.value = false;
  }
  triggered.value = true;
}
onLoad(() => {
  uni.getSystemInfo({
    success: function (res) {
      const windowHeight = res.windowHeight;
      let screenWidth = res.windowWidth;
      // scrollHeight.value = windowHeight - props.headerHeight/2;
      scrollHeight.value = windowHeight - (props.headerHeight * screenWidth / 750);
      console.log(windowHeight, ( props.headerHeight * screenWidth / 750));

    }
  });
  props.cbFn(Object.assign({ pageSize: page.pageSize, pageIndex: page.pageIndex }, props.params))
    .then((res) => {
      page.total = res.data.page.totalCount;
      list.value = res.data.dataList;
      if (page.pageSize * page.pageIndex >= page.total) {
        bottomText.value = '已经到底了';
      } else {
        bottomText.value = '下拉加载更多';
      }
    });
});
function onRefresh() {
  if (_freshing.value) { return; }
  refreshText.value = '正在刷新...';
  _freshing.value = true;
  page.pageIndex = 1;
  props.cbFn(Object.assign({ pageSize: page.pageSize, pageIndex: page.pageIndex }, props.params))
    .then((res) => {
      list.value = res.data.dataList;
    })
    .finally(() => {
      triggered.value = false;
      _freshing.value = false;
    });

}
function onRestore() {
  triggered.value = false; // 需要重置
}
function onScroll(e: any) {
  scrollTop.value = e.detail.scrollTop;
}
function lowerBottom() {
  if (!props.isLowerBottom) { return; }
  if (page.pageSize * page.pageIndex >= page.total) { return; }
  bottomText.value = '加载中';
  page.pageIndex++;
  props.cbFn(Object.assign({ pageSize: page.pageSize, pageIndex: page.pageIndex }, props.params))
    .then((res) => {
      list.value = [...list.value, ...res.data.dataList];
      if (page.pageSize * page.pageIndex >= page.total) {
        bottomText.value = '已经到底了';
      } else {
        bottomText.value = '下拉加载更多';
      }
    });
}
</script>

<template>
  <scroll-view
    class="bg-pageBg box-border"
    :style="`height:${scrollHeight}px;`"
    :scroll-y="true"
    :refresher-threshold="props.refreshTop"
    :refresher-enabled="isOpenRefresh"
    :refresher-triggered="triggered"
    refresher-default-style="none"
    refresher-background="#EAECEF"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scrolltolower="lowerBottom"
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
    <slot v-if="list.length" name="list" :list="list"></slot>
    <div v-if="!list.length" class="flex justify-center" :style="`height:${scrollHeight}px;`">
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
    <div v-if="list.length && isLowerBottom" class="text-center text-grayText p-16rpx w-100vw text-32rpx">
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
