<script setup lang="ts">
import { useRouter } from '@/router/router';
import tabs from '../components/tabs.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import nxImage from '@/components/nxImage/nxImage.vue';
import * as publicPraise from '@/api/find/publicPraise';
import * as publicInterface from '@/interface/find/publicPraise';
import praiseCard from '../components/praiseCard.vue';
const router = useRouter();

interface Showprops {
  (event: 'showClick', bool: boolean): void
}
const emits = defineEmits<Showprops>();
const plus = () => {
  emits('showClick', true);
};

// 选择tab
const tabActive = ref('1');

const tabList = reactive([
  {
    name: '推荐',
    id: '8'
  },
  {
    name: '空间',
    id: '1'
  },
  {
    name: '驾驶感受',
    id: '2'
  },
  {
    name: '外观',
    id: '3'
  },
  {
    name: '内饰',
    id: '4'
  },
  {
    name: '服务',
    id: '5'
  },
  {
    name: '油耗',
    id: '6'
  },
  {
    name: '配置',
    id: '7'
  }
]);
watch(tabActive, (newVal) => {
  publicList.value = [];
  if (newVal !== '8') {
    isTrue.value=true;
    pageIndexSum.value=1;
    publicList.value=[];
    fnpublicList(pageIndexSum.value);
  }
});

const followClick=(param:any) => {
  publicList.value.forEach((item) => {
    if (item.createUser?.id === param.id && item.createUser?.follow !== undefined) {
      if (param.types === 'follow') {
        item.createUser.follow = 1;
      } else {
        item.createUser.follow = 0;
      }
    }
  });
};

const modelList = ref();
const modelCode = ref();
const modelName = ref();
const modelShow = ref(false);
async function fnModeList() {
  const { dataList } = await publicPraise.modelList();
  console.log(dataList);
  dataList.forEach((item: publicInterface.modelListProps) => {
    item.name = item.seriesShowName;
  });

  modelList.value = dataList;
  if (modelList.value[0].name) {
    modelCode.value = modelList.value[0].seriesCode;
    modelName.value = modelList.value[0].seriesShowName;
    if (tabActive.value !== '8') {
      fnpublicList(pageIndexSum.value);
    }

  } else {
    modelCode.value = '';
    modelName.value = '选择车系';
  }
}
const selectModel = (e: any) => {
  modelCode.value = e.detail.seriesCode;
  modelName.value = e.detail.seriesShowName;
  isTrue.value=true;
  pageIndexSum.value=1;
  publicList.value=[];
  fnpublicList(pageIndexSum.value);

};

const publicList = ref<publicInterface.DataList>([]);
const isTrue = ref(true);
const pageIndexSum = ref(1);
const pages = ref();
async function fnpublicList(pageIndex: number) {
  const params = {
    pageIndex: pageIndex,
    pageSize: 10,
    vehicleSeriesCode: modelCode.value,
    scoreType: tabActive.value
  };
  const { dataList, page } = await publicPraise.publicList(params);
  pages.value = page;
  publicList.value.push(...dataList);
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
    if (tabActive.value !== '8') {
      fnpublicList(pageIndexSum.value);
    }
  }
}

onReachBottom(() => {
  if (isTrue.value) {
    pageIndexSum.value++;
    emptyData();
  }
});
onMounted(() => {
  fnModeList();
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
  <view class="m-y-normal w-full h-400rpx bg-inputGray p-t-32rpx p-x-36rpx p-b-22rpx">
    <view
      class="flex"
      @click="modelShow = true"
    >
      <view class="text-titleLarge font-600">
        {{ modelName }}
      </view>
      <view class="m-l-8rpx">
        <nx-image
          static="down-arrow.png"
          width="28rpx"
          height="28rpx"
        />
      </view>
    </view>
  </view>
  <tabs
    v-model="tabActive"
    :tablist="tabList"
  />
  <view
    v-for="item in publicList"
    :key="item.id"
  >
    <praise-card
      :props="item"
      @follow-click="followClick"
    />
  </view>
  <van-action-sheet
    title="选择车系"
    :show="modelShow"
    :actions="modelList"
    @select="selectModel"
    @close="modelShow = false"
  />
</template>
