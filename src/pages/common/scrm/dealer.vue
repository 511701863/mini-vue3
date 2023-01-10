<script setup lang="ts">
import {ref} from 'vue';
// import { usePageList } from '@/hooks/usePageList';
import { getDealerList } from '@/api/common/scrm';
import { onLoad} from '@dcloudio/uni-app';
import nxSearch from '@/components/nxSearch/nxSearch.vue';
import { useDealer } from '@/store/modules/dealer';
import { useRouter } from '@/router/router';
// import Bus from '@/utils/tool/bus';
const usePageList = () => {};
const router = useRouter();
const isBus=ref(false);
const { dataList, refParams } = usePageList<Scrm.Dealer>(getDealerList, { name: '' }, { pageSize: 10 });

const { dealer, changeDealer } = useDealer();

const selectDealer = (item: Scrm.Dealer) => {
  if(!isBus.value){
    changeDealer(item);
  }else{
    Bus.emit('selectDealer', item);
  }
  router.navigateBack({});
};
onLoad((query:any) => {
  if(query.id){
      isBus.value=true;
    }
});
</script>

<template>
  <view class="fixed w-full">
    <nx-search v-model="refParams.name" />
  </view>
  <view class="p-40rpx p-t-80rpx">
    <view
      v-for="item in dataList"
      :key="item.id"
      class="m-t-large"
      @click="selectDealer(item)"
    >
      <view class="py-12rpx border-b border-strokeWeak flex items-center justify-between">
        <view>
          <view class="text-titleLarge font-400">
            {{ item.name }}
          </view>
          <view class="text-meduim color-secondaryText m-t-8rpx">
            {{ item.address || '无地址数据' }}
          </view>
        </view>
        <view v-show="dealer.id === item.id">
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
