<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from '@/router/router';
import { onReachBottom } from '@dcloudio/uni-app';
import userInfo from '@/components/userinfo/userInfo.vue';
import content from '@/components/content/content.vue';
import browseComments from '@/components/browseComments/browseComments.vue';
import * as dynamicInterface from '@/interface/find/dynamic';
import * as dynamic from '@/api/find/dynamic';
import nxImage from '@/components/nxImage/nxImage.vue';
import {QDExposure, QDClick} from '@/helper/tracker';
const router = useRouter();

interface Showprops {
  (event: 'showClick', bool: boolean): void
}
const emits = defineEmits<Showprops>();
const plus = () => {
  emits('showClick', true);
};

const typeValue = ref<number>(1);
const typeClick = (type: number) => {
  typeValue.value = type;
  pageIndexSum.value = 1;
  dynamicList.value = [];
  fndynamicList(pageIndexSum.value);
};

const dynamicList = ref<dynamicInterface.dynamicDetail[]>([]);
const isTrue = ref(true);
const pageIndexSum = ref(1);
const pages = ref();
async function fndynamicList(pageIndex: number) {
  const params = {
    type: typeValue.value,
    pageIndex: pageIndex,
    pageSize: 4
  };
  const { dataList, page } = await dynamic.dynamicList(params);
  dataList.forEach((item: any) => {
    const params ={
      content_id: item.id,
      section_id: '1595961581769011200'
    };
    // 曝光
    QDExposure(params);
  });
  pages.value = page;
  dynamicList.value.push(...dataList);
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
    fndynamicList(pageIndexSum.value);
  }
}

onReachBottom(() => {
  if (isTrue.value) {
    pageIndexSum.value++;
    emptyData();
  }
});
const jumpDetail=(id:string) => {
  const params={
    content_id: id,
    section_id: '1595961581769011200'
  };
  QDClick(params);
  router.navigateTo({ name: 'dynamic', query: { id: id } });
};
const followClick = (param: any) => {
  dynamicList.value.forEach((item) => {
    if (item.commentUser?.id === param.id && item.commentUser?.follow !== undefined) {
      if (param.types === 'follow') {
        item.commentUser.follow = 1;
      } else {
        item.commentUser.follow = 0;
      }
    }
  });
};

const likeClick = (id: string) => {
  let params = {
    type: 7,
    entityId: id
  };
  dynamicList.value.forEach(async (item: dynamicInterface.dynamicDetail) => {
    if (item.id === id) {
      if (item?.liked === 0) {
        await dynamic.like(params);
        if (item?.likeNumber !== undefined) {
          item.likeNumber += 1;
          item.liked = 1;
        }
      } else {
        await dynamic.cancelLike(params);
        if (item?.likeNumber !== undefined) {
          item.likeNumber -= 1;
          item.liked = 0;
        }
      }
    }
  });

};

onMounted(() => {
  fndynamicList(pageIndexSum.value);
});
</script>

<template>
  <view class="w-96rpx h-96rpx fixed right-20rpx bottom-70rpx z-999 bg-secondaryLight shadow  rounded-full">
    <view class="text-center leading-116rpx">
      <view @click="plus">
        <nx-image
          static="jia.png"
          width="44rpx"
          height="44rpx"
        />
      </view>
    </view>
  </view>
  <view class="m-t-28rpx flex">
    <view
      :class="{
        'w-112rpx h-56rpx text-titleSmall text-center leading-56rpx  m-r-24rpx': true, 'bg-secondaryDark color-secondaryLight': typeValue === 1,
        'bg-grayText': typeValue === 2
      }"
      @click="typeClick(1)"
    >
      最新
    </view>
    <view
      :class="{
        'w-112rpx h-56rpx text-titleSmall text-center leading-56rpx': true, 'bg-grayText': typeValue === 1, 'bg-secondaryDark color-secondaryLight': typeValue === 2
      }"
      @click="typeClick(2)"
    >
      关注
    </view>
  </view>
  <view class="m-t-88rpx">
    <view
      v-for="item in dynamicList"
      :key="item.id"
      class="m-t-64rpx p-b-40rpx border-b border-gray-200 problem"
    >
      <userInfo
        :userinfo="item?.commentUser"
        @follow-click="followClick"
      />
      <view @click="jumpDetail(item.id as string)">
        <content
          :title="item?.title"
          :ellipsis="true"
          :content="item?.dynamicWords"
          :relation-club="item?.relationClub"
          :relation-topic="item?.relationTopic"
          :pictures="item?.pictures"
        >
        </content>
      </view>
      <view class="m-t-32rpx">
        <browse-comments
          :like-number="item?.likeNumber"
          :like-status="item?.liked"
          :browse-number="item?.browseNumber"
          :answer-number="item?.commentNumber"
          :create-time="item?.createTime"
          @like-click="likeClick(item?.id as string)"
          @answer-click="jumpDetail(item.id as string)"
        />
      </view>
    </view>
    <view
      v-if="!isTrue"
      class="h-180rpx text-center leading-180rpx"
    >
      <nx-image
        width="144rpx"
        height="40rpx"
        static="logobottom.png"
      />
    </view>
  </view>
</template>
