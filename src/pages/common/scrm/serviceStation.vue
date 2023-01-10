<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue';
import { usePageList } from '@/hooks/usePageList';
import { getDealerList } from '@/api/common/scrm';
import nxSearch from '@/components/nxSearch/nxSearch.vue';
import { useDealer } from '@/store/modules/dealer';
import { useRouter } from '@/router/router';
import { onReachBottom, onLoad, onShow } from '@dcloudio/uni-app';
import { useFind } from '@/store/modules/find';
import * as appoint from '@/interface/service/appointRepair';
import * as appointRepair from '@/api/service/appointRepair';
import {serviceStation } from '@/store/modules/serviceStation';
import Bus from '@/utils/tool/bus';
const findStore = useFind();
const router = useRouter();
const serviceStore=serviceStation();
// const { dataList, refParams } = usePageList<Scrm.Dealer>(getDealerList, { name: '' }, { pageSize: 10 });

// const { dealer, changeDealer } = useDealer();

// const selectDealer = (item: Scrm.Dealer) => {
//   changeDealer(item);
//   router.navigateBack({});
// };
const isBus=ref(false);
const keywords=ref('');
const serviceStationList = ref<appoint.getLatestStation[]>([]);
  async function getLatestStation() {
  const params = {
    cityCode: findStore.city.areaId,
    count:99,
    name:keywords.value,
    latitude: uni.getStorageSync('latitude'),
    longitude: uni.getStorageSync('longitude')
  };
  const data = await appointRepair.getLatestStation(params);
  console.log(data);
  if(data && data.length){
    serviceStationList.value=data;
  }else{
    serviceStationList.value=[];
  }

}
const sureClick=(item:any) => {
  if(!isBus.value){
    serviceStore.pushStation({name:item.salesNetName, id:item.serviceStationCode});
  }else{
    Bus.emit('selecteStation', {name:item.salesNetName, id:item.serviceStationCode});
  }
  setTimeout(() => {
    uni.navigateBack({});
  }, 500);
};
const search=(e:any) => {
  // console.log('str', e.detail);
  // searchEBook(e.detail);
  keywords.value= e.detail;
  // console.log('keywords.value', keywords.value);
  getLatestStation();
};
const clear=() => {
  // searchEBook('');
  keywords.value='';
  getLatestStation();
};
onLoad((query:any) => {
  // setTimeout(() => {
    if(query.id){
      isBus.value=true;
    }
    getLatestStation();
    // console.log('findStore.city.areaId', findStore);
  // }, 5000);
});
</script>

<template>
  <view class="fixed w-full z-999 bg-white">
    <view class="box-border w-full flex-between p-l-40rpx p-r-20rpx">
      <view
        class="flex-between text-titleMeduim w-125rpx"
        @click.stop="router.navigateTo({name:'city'})"
      >
        {{ findStore.city.areaName }}<van-icon
          name="arrow-down"
          color="#999999"
        />
      </view>
      <van-search class="w-560rpx" placeholder="请输入搜索内容" @search="search" @clear="clear" />
    </view>
  </view>
  <view class="p-40rpx p-t-80rpx">
    <view
      v-for="item in serviceStationList"
      :key="item.id"
      class="m-t-large"
      @click="sureClick(item)"
    >
      <view class="py-12rpx border-b border-strokeWeak flex items-center justify-between">
        <view>
          <view class="text-titleLarge font-400">
            {{ item.serviceStationName }}
          </view>
          <view class="text-meduim color-secondaryText m-t-8rpx">
            {{ item.serviceStationAddress || '无地址数据' }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
