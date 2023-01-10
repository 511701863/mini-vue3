<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import * as news from '@/api/find/news';
import * as newsInterface from '@/interface/find/news';
import nxImage from '@/components/nxImage/nxImage.vue';
import { onMounted, ref } from 'vue';

const router = useRouter();

const aboutNews = ref<newsInterface.aboutPopular[]>([]);
  const aboutPopularList = async () => {
    const data = await news.aboutNews();
    aboutNews.value = data;
  };

const albumList = ref<newsInterface.albumList[]>([]);
async function fnAlbumList() {
  const data = await news.albumList();
  albumList.value = data;
}

const hotNewsList = ref<newsInterface.hotNewsList[]>([]);
const isTrue = ref(true);
const pageIndexSum = ref(1);
const pages = ref();
async function fnHotNewsList(pageIndex: number) {
  const params = {
    pageIndex: pageIndex,
    pageSize: 10
  };
  const { dataList, page } = await news.hotNewsList(params);
  pages.value = page;
  hotNewsList.value.push(...dataList);
}
function emptyData() {
  if (pageIndexSum.value > pages.value.pageTotal) {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
      duration: 2000
    });
    isTrue.value = false;
  } else {
    fnHotNewsList(pageIndexSum.value);
  }
}
onReachBottom(() => {
  if (isTrue.value) {
    pageIndexSum.value++;
    emptyData();
  }
});
onMounted(() => {
  aboutPopularList();
  fnAlbumList();
  fnHotNewsList(pageIndexSum.value);
});
</script>

<template>
  <view class="m-t-36rpx">
    <view class="flex-between h-80rpx leading-80rpx">
      <view class="text-titleLarge font-600">
        关于风行
      </view>
      <view
        class="text-meduim text-secondaryText"
        @click="router.navigateTo({ name: 'aboutPopular', query: { aboutNews: JSON.stringify(aboutNews)} })"
      >
        更多
      </view>
    </view>

    <view class="flex-between">
      <view
        v-for="item in aboutNews.length > 3 ? aboutNews.slice(0, 3) : aboutNews"
        :key="item?.id"
        class="relative w-212rpx h-340rpx"
        @click="router.navigateTo({ name: 'newsList', query: { id: item?.id, coverPicture: item?.coverPicture, categoryName: item?.categoryName, describe: item?.describe }})"
      >
        <view class="">
          <nx-image
            :src="item?.coverPicture"
            width="212rpx"
            height="340rpx"
          />
        </view>

        <view class="w-212rpx h-128rpx text-whiteText absolute bottom-0 px-normal box-border saturate-180 blur-50 bg-black bg-opacity-50">
          <view
            class="text-meduim "
          >
            {{ item?.categoryName }}
          </view>
          <view class="text-small">
            {{ item?.describe }}
          </view>
        </view>
      </view>
    </view>

    <view class="flex-between h-80rpx leading-80rpx m-t-56rpx">
      <view class="text-titleLarge font-600">
        高清风行时刻
      </view>
      <view
        class="text-meduim text-secondaryText"
        @click="router.navigateTo({ name: 'HDMoment', query: { albumList: JSON.stringify(albumList) }})"
      >
        更多
      </view>
    </view>

    <view class="flex">
      <view
        class="m-r-18rpx relative"
        @click="router.navigateTo({ name: 'HDAlbum', query: { id: albumList[0]?.id}})"
      >
        <nx-image
          :src="albumList[0]?.coverPicture"
          width="440rpx"
          height="440rpx"
        />
        <view class="text-meduim text-whiteText absolute left-20rpx bottom-medium">
          {{ albumList[0]?.categoryName }}
        </view>
      </view>
      <view class="flex flex-col justify-between">
        <view
          class="m-r-18rpx relative"
          @click="router.navigateTo({ name: 'HDAlbum', query: { id: albumList[1]?.id}})"
        >
          <nx-image
            :src="albumList[1]?.coverPicture"
            width="212rpx"
            height="212rpx"
          />
          <view class="text-meduim text-whiteText absolute left-20rpx bottom-medium">
            {{ albumList[1]?.categoryName }}
          </view>
        </view>
        <view
          class="m-r-18rpx relative"
          @click="router.navigateTo({ name: 'HDAlbum', query: { id: albumList[2]?.id}})"
        >
          <nx-image
            :src="albumList[2]?.coverPicture"
            width="212rpx"
            height="212rpx"
          />
          <view class="text-meduim text-whiteText absolute left-20rpx bottom-medium">
            {{ albumList[2]?.categoryName }}
          </view>
        </view>
      </view>
    </view>

    <view class="h-80rpx leading-80rpx m-t-56rpx text-titleLarge font-600">
      热点资讯
    </view>
    <view
      class="flex h-252rpx border-b border-strokeSmall last:border-0 m-b-80rpx"
      @click="router.navigateTo({ name:'newsDetail'})"
    >
      <view class="m-r-24rpx">
        <nx-image
          static="lookcar.png"
          width="212rpx"
          height="212rpx"
        />
      </view>
      <view>
        <view class="text-titleLarge m-b-116rpx">
          风行进化论，新风行品牌之夜
        </view>
        <view class="flex text-meduim">
          <view class="m-r-big">
            <img
              class="w-28rpx h-28rpx vertical-middle"
              src="@/static/images/eyes-gray.png"
              alt=""
            >
            <text class="text-secondaryText m-l-5rpx">
              1
            </text>
          </view>
          <view>
            <img
              class="w-28rpx h-28rpx vertical-middle"
              src="@/static/images/pinglun-gray.png"
              alt=""
            >
            <text class="text-secondaryText m-l-5rpx">
              1
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="text-center">
      <img
        src="@/static/images/logobottom.png"
        alt=""
        class="w-144rpx h-40rpx  m-b-62rpx"
      >
    </view>
  </view>
</template>

