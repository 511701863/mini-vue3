<script setup lang="ts">
import { ref } from 'vue';
// import { onShow } from '@dcloudio/uni-app';
import { useRouter } from '@/router/router';
import tabs from './components/tabs.vue';
import Recommend from '@/pages/find/container/Recommend.vue';
import Problem from '@/pages/find/container/problem.vue';
import Dynamic from '@/pages/find/container/dynamic.vue';
import Public from '@/pages/find/container/public.vue';
import Club from '@/pages/find/container/club.vue';
import News from '@/pages/find/container/news.vue';
import Activity from '@/pages/find/container/activity.vue';
import publicPraise from '@/pages/find/container/publicPraise.vue';
import { useFind } from '@/store/modules/find';
const router = useRouter();
const findStore = useFind();
// 选择tab
const tabActive = ref('find');

const questionshow = ref(false);
const questionClick = (e: any): void => {
  questionshow.value = !questionshow.value;
};
const questionClose = () => {
  questionshow.value = false;
};
const questions = (type: string) => {
  if (type === 'go') {
    router.navigateTo({ name: 'releaseQuestion' });
  } else {
    router.navigateTo({ name: 'myProblem' });
  }
  questionshow.value = false;
};

const dynamicShow = ref(false);
const dynamicClick = (e: any): void => {
  dynamicShow.value = !dynamicShow.value;
};
const dynamicClose = () => {
  dynamicShow.value = false;
};

const clubShow = ref(false);
const clubClick = (e: any): void => {
  clubShow.value = !clubShow.value;
};
const clubClose = () => {
  clubShow.value = false;
};

const publicShow=ref(false);
const publicClick=(e:any):void => {
  publicShow.value=!publicShow.value;
};
const publicClose=() => {
  publicShow.value=false;
};

const jumpDynamic=() => {
  findStore.reset();
  router.navigateTo({ name: 'releaseDynamic' });
};
const tabList = [
  {
    name: '推荐',
    id: 'find'
  },
  {
    name: '动态',
    id: 'dynamic'
  },
  {
    name: '活动',
    id: 'activity'
  },
  {
    name: '资讯',
    id: 'news'
  },
  {
    name: '问答',
    id: 'problem'
  },
  {
    name: '口碑',
    id: 'publicPraise'
  },
  {
    name: '俱乐部',
    id: 'club'
  }
];
</script>

<template>
  <van-overlay
    :show="questionshow"
    :lock-scroll="true"
    class=" fixed z-999"
    @click="questionClose"
  >
    <view class="w-180rpx h-150rpx bg-white fixed right-20rpx bottom-220rpx rounded">
      <view
        class="w-full h-2/4 text-center leading-75rpx"
        @click="questions('go')"
      >
        去提问
      </view>
      <view
        class="w-full h-2/4 text-center leading-75rpx"
        @click="questions('my')"
      >
        我的问题
      </view>
    </view>
    <view class="triangle border-20rpx fixed right-50rpx bottom-180rpx" />
  </van-overlay>
  <van-overlay
    :show="publicShow"
    :lock-scroll="true"
    class=" fixed z-999"
    @click="publicClose"
  >
    <view class="w-186rpx h-80rpx bg-white fixed right-20rpx bottom-220rpx rounded">
      <view
        class="w-full h-1/4 text-center leading-75rpx text-titleMeduim"
        @click="router.navigateTo({name:'releasePublic'})"
      >
        发口碑
      </view>
    </view>
    <view class="triangle border-20rpx fixed right-50rpx bottom-180rpx" />
  </van-overlay>
  <van-overlay
    :show="clubShow"
    :lock-scroll="true"
    class=" fixed z-999"
    @click="clubClose"
  >
    <view class="w-186rpx h-80rpx bg-white fixed right-20rpx bottom-220rpx rounded">
      <view
        class="w-full h-1/4 text-center leading-75rpx text-titleMeduim"
        @click="router.navigateTo({name:'clubAdd'})"
      >
        创建俱乐部
      </view>
    </view>
    <view class="triangle border-20rpx fixed right-50rpx bottom-180rpx" />
  </van-overlay>
  <van-overlay
    :show="dynamicShow"
    :lock-scroll="true"
    class=" fixed z-999"
    @click="dynamicClose"
  >
    <view class="w-186rpx h-80rpx bg-white fixed right-20rpx bottom-220rpx rounded">
      <view
        class="w-full h-1/4 text-center leading-75rpx text-titleMeduim"
        @click="jumpDynamic"
      >
        发动态
      </view>
      <!-- <view
        class="w-full h-1/4 text-center leading-75rpx text-titleMeduim"
        @click="plus('question')"
      >
        提问题
      </view>
      <view
        class="w-full h-1/4 text-center leading-75rpx text-titleMeduim"
        @click="plus('club')"
      >
        创建俱乐部
      </view>
      <view
        class="w-full h-1/4 text-center leading-75rpx text-titleMeduim"
        @click="plus('scan')"
      >
        扫一扫
      </view> -->
    </view>
    <view class="triangle border-20rpx fixed right-50rpx bottom-180rpx" />
  </van-overlay>
  <view>
    <view class="w-full p-t-20rpx bg-white fixed top-0 z-20 p-l-40rpx p-r-40rpx">
      <tabs
        v-model="tabActive"
        :tablist="tabList"
        width="610rpx"
      >
        <view class="w-40rpx h-40rpx m-l-25rpx m-t-5rpx">
          <nx-image
            width="40rpx"
            height="40rpx"
            static="search.png"
          />
        </view>
      </tabs>
    </view>
    <view class="m-l-40rpx m-r-40rpx p-t-80rpx">
      <Recommend v-if="tabActive === 'find'" />
      <Topic v-if="tabActive === 'topic'" />
      <Problem
        v-if="tabActive === 'problem'"
        @show-click="questionClick"
      />
      <Dynamic
        v-if="tabActive === 'dynamic'"
        @show-click="dynamicClick"
      />
      <Public v-if="tabActive === 'public'" />
      <Club
        v-if="tabActive === 'club'"
        @show-click="clubClick"
      />
      <News v-if="tabActive === 'news'" />
      <Activity v-if="tabActive === 'activity'" />
      <publicPraise
        v-if="tabActive === 'publicPraise'"
        @show-click="publicClick"
      />
    </view>
  </view>
</template>
