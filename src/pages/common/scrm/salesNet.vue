<script setup lang="ts">
import { usePageList } from '@/hooks/usePageList';
import { getDealerList } from '@/api/common/scrm';
import nxSearch from '@/components/nxSearch/nxSearch.vue';
import { getSalesNetList } from '@/api/common/scrm';
import { useSalesNet } from '@/store/modules/salesNet';
import { useRouter } from '@/router/router';
import { onMounted, ref } from 'vue';
import { useFind } from '@/store/modules/find';
import { watch } from 'vue';

const router = useRouter();

const findStore = useFind();

onMounted(() => {
  getSalesNet();
});

watch(findStore, () => {
  getSalesNet();
});

async function getSalesNet() {
  const params: Scrm.salesNetReq = {
    lat: uni.getStorageSync('latitude')?.toString(),
    lng: uni.getStorageSync('longitude')?.toString(),
    cityId: findStore.city.areaId,
    salesNetName: salesNetName.value
  };
  if (!params.salesNetName) {
    delete params.salesNetName;
  }
  dataList.value = await getSalesNetList(params);
}

const salesNetName = ref('');
const dataList = ref<Scrm.SalesNet[]>([]);

const { salesNet, changeDealer } = useSalesNet();

const selectDealer = (item: Scrm.SalesNet) => {
  changeDealer(item);
  router.navigateBack({});
};

</script>

<template>
  <view class="fixed w-full">
    <nx-search v-model="salesNetName" />
  </view>
  <view class="p-40rpx p-t-80rpx">
    <view
      v-for="item in dataList"
      :key="item.salesNetId"
      class="m-t-large"
      @click="selectDealer(item)"
    >
      <view class="py-12rpx border-b border-strokeWeak flex items-center justify-between">
        <view>
          <view class="text-titleLarge font-400">
            {{ item.salesNetName }}
          </view>
          <view class="text-meduim color-secondaryText m-t-8rpx">
            {{ item.salesNetAddress || '无地址数据' }}
          </view>
        </view>

        <view v-show="salesNet.salesNetId === item.salesNetId">
          <nx-image
            static="select-dealer.png"
            width="40rpx"
            height="40rpx"
          />
        </view>
      </view>
    </view>
  </view>
</template>
