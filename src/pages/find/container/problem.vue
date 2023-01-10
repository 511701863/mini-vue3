<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import userInfo from '@/components/userinfo/userInfo.vue';
import content from '../../../components/content/content.vue';
import browseComments from '@/components/browseComments/browseComments.vue';
import * as problem from '@/api/find/problem';
import * as findInterface from '@/interface/find/problem';
import nxImage from '@/components/nxImage/nxImage.vue';
import {QDExposure, QDClick} from '@/helper/tracker';
const router = useRouter();

const commonProblemList = ref<findInterface.CommonProblemProps[][]>([]);
async function fnCommonProblem() {
  let problemLists = [];
  problemLists = await problem.questionList();
  console.log(problemLists);
  for (let i = 0; i < problemLists.length; i = i + 2) {
    commonProblemList.value.push(problemLists.slice(i, i + 2));
  }
  console.log(commonProblemList.value);
}
fnCommonProblem();

interface Showprops {
  (event: 'showClick', bool: boolean): void
}
const emits = defineEmits<Showprops>();
const questions = () => {
  emits('showClick', true);
};

const hotProblemList = ref<findInterface.HotListProps[]>([]);
const isTrue = ref(true);
const pageIndexSum = ref(1);
const pages = ref();
async function requestlist(pageIndex: number) {
  const params = {
    pageIndex: pageIndex,
    pageSize: 3
  };
  const { dataList, page } = await problem.hotQuestionList(params);
  dataList.forEach((item: any) => {
    const params ={
      content_id: item.id,
      section_id: '1595962723940904960'
    };
    // 曝光
    QDExposure(params);
  });

  dataList.forEach((item: findInterface.HotListProps) => {
    item.modelList = [{
      id: item.modelId,
      name: item.modelName
    }];
    item.questionTypeList = [{
      questionTypeName: item.questionTypeName,
      questionType: item.questionType
    }];
  });
  pages.value = page;
  hotProblemList.value.push(...dataList);
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
    requestlist(pageIndexSum.value);
  }
}
onReachBottom(() => {
  if (isTrue.value) {
    pageIndexSum.value++;
    emptyData();
  }
});

const followClick = (param: any) => {
  hotProblemList.value.forEach((item) => {
    if (item.questionUser?.id === param.id) {
      if (param.types === 'follow') {
        item.questionUser!.follow = 1;
      } else {
        item.questionUser!.follow = 0;
      }
    }
  });
};

const jumpDetail=(id:string) => {
  const params={
    content_id: id,
    section_id: '1595962723940904960'
  };
  QDClick(params);
  router.navigateTo({ name: 'problemDetail', query: { id: id } });
};

onMounted(() => {
  uni.hideHomeButton();
  requestlist(pageIndexSum.value);
});
</script>

<template>
  <img
    class="w-100rpx h-100rpx fixed right-20rpx bottom-70rpx z-999"
    src="@/static/images/tiwen.png"
    alt=""
    @click="questions"
  >
  <view>
    <view>
      <view class="text-title_large m-t-20rpx font-600">
        常见问题
      </view>
      <view class="m-t-20rpx">
        <swiper
          :display-multiple-items="commonProblemList.length>=3?2.5:1"
          :duration="1000"
          class="w-full h-160rpx"
        >
          <swiper-item
            v-for="(item, index) in commonProblemList"
            :key="index"
            class="m-r-15rpx"
          >
            <view
              v-for="(it, i) in item"
              :key="i"
              class="w-220rpx m-b-15rpx h-60rpx text-meduim text-center leading-60rpx border-gray-400 border-1rpx text-32rpx"
              @click="router.navigateTo({ name: 'problemList', query: { name: it.name, id: it.id } });"
            >
              {{ it.name }}
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view>
      <view class="text-title_large m-t-20rpx font-600">
        热门问题
      </view>
      <view
        v-for="item in hotProblemList"
        :key="item.id"
        class="m-t-40rpx m-b-64rpx p-b-40rpx border-b border-gray-200 problem"
      >
        <userInfo
          :userinfo="item.questionUser"
          @follow-click="followClick"
        />
        <view @click="jumpDetail(item.id as string)">
          <content
            :ellipsis="true"
            :content="item?.content"
            :model-list="item?.modelList"
            :question-type-list="item?.questionTypeList"
            :pictures="item?.pictures"
          >
            <view class="flex">
              <view class="m-t-5rpx">
                <nx-image
                  static="money.png"
                  width="40rpx"
                  height="40rpx"
                />
              </view>
              <text class="color-money">
                悬赏风行币{{ item?.popularCurrency }}
              </text>
            </view>
          </content>
        </view>
        <browse-comments
          :answer-number="item?.answerNumber"
          :create-time="item?.createTime"
          @answer-click="jumpDetail(item.id as string)"
        />
        <!-- 采纳问题 -->
        <view
          v-if="item?.answerInfoVo"
          class="m-t-12rpx bg-inputGray relative p-12rpx"
        >
          <view class=" m-b-24rpx">
            <text class="text-meduim font-600">
              {{ item?.answerInfoVo.userInfo?.nickname }}
            </text>
            <text class="m-l-10rpx text-meduim font-600">
              回答
            </text>
          </view>
          <view>
            <p class="m-t-8rpx line-clampes  text-meduim">
              {{ item?.answerInfoVo.content }}
            </p>
          </view>
          <view class="absolute right-0 top-0">
            <nx-image
              static="caina.png"
              width="130rpx"
              height="130rpx"
            />
          </view>
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
  </view>
</template>
