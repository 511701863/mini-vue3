<script setup lang="ts">
import { useRouter } from '@/router/router';
import nxImage from '@/components/nxImage/nxImage.vue';
import activityCard from '../components/activityCard.vue';
import { ActivityHomeVo } from '@/interface/find/activity/home';
import { onMounted, ref } from 'vue';
import { getActivityHome } from '@/api/find/activity';

//其他活动
import { DataList } from '@/interface/find/activity/list';
import { usePageList } from '@/hooks/usePageList';
import { getActivityOther } from '@/api/find/activity';

const { dataList } = usePageList<DataList>(getActivityOther, {});

const router = useRouter();

function navigateToByName(name: string) {
  router.navigateTo({ name });
}

const activityHome = ref<ActivityHomeVo>();

const activityStatusMap = ['线下', '投票活动', '裂变活动', '抽奖活动', '答题闯关'];

function getMapKey(map: string[], index: number | undefined) {
  return map[index ?? 0];
}

function toSign(id = 0) {
  // TODO：跳转对应活动
  console.log(id);
}
async function getDetail() {
  const data = await getActivityHome();
  activityHome.value = data;
}

onMounted(() => {
  getDetail();
});
</script>

<template>
  <view class="m-t-medium">
    <swiper
      class="w-670rpx h-670rpx"
      :autoplay="true"
      interval="3000"
      :indicator-dots="true"
      :circular="true"
    >
      <swiper-item class="bg-pink">
        <view class="wh-full">
          <nx-image width="670rpx" height="670rpx" static="1to1.png" />
        </view>
      </swiper-item>
      <swiper-item class="bg-blue">
        <view class="wh-full">
          <nx-image width="670rpx" height="670rpx" static="1to1.png" />
        </view>
      </swiper-item>
      <swiper-item class="bg-green">
        <view class="wh-full">
          <nx-image width="670rpx" height="670rpx" static="1to1.png" />
        </view>
      </swiper-item>
      <swiper-item class="bg-red">
        <view class="wh-full">
          <nx-image width="670rpx" height="670rpx" static="1to1.png" />
        </view>
      </swiper-item>
    </swiper>

    <view class="m-t-56rpx card-2 grid-gap-18rpx">
      <nx-image
        height="212rpx"
        static="3to4.png"
      >
        <view class="py-10rpx px-20rpx flex-between text-24rpx">
          <text class="font-500">
            {{ getMapKey(activityStatusMap, activityHome?.beforePeriod.activityStatus) }}
          </text>
          <text class="color-rgba(255,255,255,0.8)">
            {{ activityHome?.beforePeriod.city }}
          </text>
        </view>
      </nx-image>
      <nx-image
        height="212rpx"
        static="3to4.png"
      >
        <view class="py-10rpx px-20rpx flex-between text-24rpx">
          <text class="font-500">
            {{ getMapKey(activityStatusMap, activityHome?.localCity.activityStatus) }}
          </text>
          <text class="color-rgba(255,255,255,0.8)">
            {{ activityHome?.beforePeriod.city }}
          </text>
        </view>
      </nx-image>
    </view>

    <!-- 热门活动 -->
    <view class="m-t-60rpx flex-between">
      <text class="text-32rpx font-600 text-black">
        热门活动
      </text>
      <text
        class="text-24rpx text-mantle"
        @click="navigateToByName('hotActivity')"
      >
        更多
      </text>
    </view>

    <view class="m-t-20rpx card-2 grid-gap-18rpx">
      <view
        v-for="item in activityHome?.hotList"
        :key="item.id"
      >
        <nxImage
          height="340rpx"
          :src="item.coverPicture"
        />
        <view class="my-20rpx text-28rpx">
          {{ getMapKey(activityStatusMap, item.activityStatus) }}
          |
          {{ item.activityName }}
        </view>
        <view
          class="text-24rpx text-mantle"
          @click="toSign(item.id)"
        >
          立即报名
        </view>
      </view>
    </view>

    <!-- 推荐活动 -->
    <view class="m-t-60rpx flex-between">
      <text class="text-32rpx font-600 text-black">
        推荐活动
      </text>
      <text
        class="text-24rpx text-mantle"
        @click="navigateToByName('recommendActivity')"
      >
        更多
      </text>
    </view>

    <view class="m-t-20rpx card-2 grid-gap-18rpx">
      <view
        v-for="item in activityHome?.recommendList"
        :key="item.id"
      >
        <nxImage
          height="340rpx"
          :src="item.coverPicture"
        />
        <view class="my-20rpx text-28rpx">
          {{ getMapKey(activityStatusMap, item.activityStatus) }}
          |
          {{ item.activityName }}
        </view>
        <view
          class="text-24rpx text-mantle"
          @click="toSign(item.id)"
        >
          立即报名
        </view>
      </view>
    </view>

    <!-- 其他活动 -->
    <view class="m-t-60rpx flex-between">
      <text class="text-32rpx font-600 text-black">
        其他活动
      </text>
    </view>

    <view class="m-t-20rpx">
      <activity-card
        v-for="item in dataList"
        :key="item.id"
        :props="item"
      />
    </view>
  </view>
</template>
