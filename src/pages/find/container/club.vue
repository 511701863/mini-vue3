<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import * as clubInterface from '@/interface/find/club';
import * as club from '@/api/find/club';
import ClubList from '../components/clubCard.vue';
import { useRouter } from '@/router/router';
import nxInput from '@/components/nxInput/nxInput.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

const router = useRouter();

interface Showprops {
  (event: 'showClick', bool: boolean): void
}
const emits = defineEmits<Showprops>();
const plus = () => {
  emits('showClick', true);
};

const swiperList=ref<clubInterface.swiperList[]>([]);
const swiperPicture=async () => {
  swiperList.value=await club.swiperPicture();
};

const clubList = ref<clubInterface.ClubLIst[]>([]);
async function fnclubList() {
  const params = {
    pageIndex: 1,
    pageSize: 2,
    isTop: 1
  };
  const { dataList } = await club.ClubList(params);
  clubList.value = dataList;
}
const addClubShow = ref(false);
const clubId = ref();
const addClub = (param: any) => {
  clubId.value = param.id;
  addClubShow.value = true;
};
const applyContent = ref<string>('');
const applyClub = async () => {
  const param = {
    clubId: clubId.value,
    applyReason: applyContent.value
  };
  await club.addClub(param);
  addClubShow.value = false;
  router.navigateTo({ name: 'clubDetail', query: { id: clubId.value } });
};

const clubDetail = (param: any) => {
  router.navigateTo({ name: 'clubDetail', query: { id: param.id } });
};

const IJoinClub = ref<clubInterface.IJoinClub[]>([]);
async function fnIJoinClub() {
  const param = {
    status: 1,
    pageIndex: 1,
    pageSize: 3
  };
  const { dataList } = await club.IJoinClub(param);
  IJoinClub.value = dataList;
}

const lickClubList=ref<clubInterface.IJoinClub[]>([]);
const isTrue = ref(true);
const pageIndexSum = ref(1);
const pages = ref();
const city=uni.getStorageSync('findCity');
async function fnlikeClubList(pageIndex: number) {
  const params = {
    cityName: city||'',
    pageIndex: pageIndex,
    pageSize: 10
  };
  const { dataList, page } = await club.lickClubList(params);
  pages.value = page;
  lickClubList.value.push(...dataList);
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
    fnlikeClubList(pageIndexSum.value);
  }
}
onReachBottom(() => {
  if (isTrue.value) {
    pageIndexSum.value++;
    emptyData();
  }
});
onMounted(() => {
  fnclubList();
  fnIJoinClub();
  swiperPicture();
  fnlikeClubList(pageIndexSum.value);
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
  <view>
    <view>
      <swiper
        class="w-670rpx h-670rpx"
        :autoplay="true"
        interval="3000"
        :indicator-dots="true"
        :circular="true"
      >
        <swiper-item
          v-for="item in swiperList"
          :key="item.coverPicture+'1'"
        >
          <view class="wh-full">
            <nx-image
              width="670rpx"
              height="670rpx"
              :src="item.coverPicture"
            />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view
      v-if="IJoinClub.length >= 1"
      class="flex justify-between m-t-56rpx"
    >
      <view class="text-titleLarge font-600">
        我的俱乐部
      </view>
      <view
        class="text-titleSmall color-secondaryText"
        @click="router.navigateTo({ name: 'myClub' })"
      >
        更多
      </view>
    </view>
    <view
      v-if="IJoinClub.length >= 1"
      class="m-t-16rpx"
    >
      <swiper
        :display-multiple-items="IJoinClub.length > 1 ? 1.6 : 1"
        :duration="1000"
        class="h-128rpx"
        :circular="true"
      >
        <swiper-item
          v-for="item in IJoinClub"
          :key="item?.id"
          @click="router.navigateTo({ name: 'clubDetail', query: { id: item?.id } });"
        >
          <view class="w-398rpx h-128rpx flex items-center justify-around bg-strokeSmall">
            <view class="m-r-20rpx">
              <nx-image
                :src="item?.logo"
                width="96rpx"
                height="96rpx"
              />
            </view>
            <view>
              <view class="text-titleMeduim">
                {{ item?.name }}
              </view>
              <view class="text-small color-secondaryText">
                {{ item?.memberNumber }}会员 | {{ item?.activityNumber }}活动
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="flex justify-between m-t-56rpx">
      <view class="text-titleLarge font-600">
        官方推荐
      </view>
      <view
        class="text-titleSmall color-secondaryText"
        @click="router.navigateTo({ name: 'official' })"
      >
        更多
      </view>
    </view>
    <ClubList
      v-for="item in clubList"
      :key="item.id"
      :club-id="item.id"
      :name="item?.name"
      :introduction="item?.introduction"
      :province-city-area="item?.provinceCityArea"
      :member-number="item?.memberNumber"
      :activity-number="item?.activityNumber"
      :join-status="item?.joinStatus"
      :logo="item?.logo"
      :sign="item?.sign"
      @add-club="addClub"
      @club-detail="clubDetail"
    />
    <view class="flex justify-between m-t-56rpx">
      <view class="text-titleLarge font-600">
        猜你喜欢
      </view>
      <view
        class="text-titleSmall color-secondaryText"
        @click="router.navigateTo({ name: 'official' })"
      >
        成都
      </view>
    </view>
    <view>
      <ClubList
        v-for="item in lickClubList"
        :key="item.id"
        :club-id="item.id"
        :name="item?.name"
        :introduction="item?.introduction"
        :province-city-area="item?.provinceCityArea"
        :member-number="item?.memberNumber"
        :activity-number="item?.activityNumber"
        :join-status="item?.joinStatus"
        :logo="item?.logo"
        :sign="item?.sign"
        @add-club="addClub"
        @club-detail="clubDetail"
      />
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
    <van-popup
      :show="addClubShow"
      position="bottom"
      custom-style="height: 600rpx;padding:40rpx"
      @close="addClubShow = false"
    >
      <nx-input
        v-model="applyContent"
        type="textarea"
        custom-style="background:rgba(0, 0, 0, 0.04);"
        placeholder="请输入申请理由"
        :autosize="[100, 500]"
        :maxlength="500"
        :show-word-limit="true"
      />
      <view class="m-t-24rpx color-secondaryText text-titleSmall text-center">
        申请被拒后，需等待1天才能再次申请
      </view>
      <view class="flex justify-between m-t-68rpx">
        <button
          class="button-minor-large"
          @click="addClubShow = false"
        >
          取消
        </button>
        <button
          class="button-primary-large"
          @click="applyClub"
        >
          申请加入
        </button>
      </view>
    </van-popup>
  </view>
</template>
