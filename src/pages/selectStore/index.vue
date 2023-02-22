<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxScrollView from '@/components/nxScrollView/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { getProvinceList, getStoreList } from '@/api/my/maintenance';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useStore } from '../../store/modules/store';

const {setStore} = useStore();
const router = useRouter();
const scrollViewRef:any = ref(null);
const params = reactive({
  provinceCode:uni.getStorageSync('provinceCode'),
  province:uni.getStorageSync('province'),
  pageSize:10,
  name:''
});
const citySelectShow =ref(false);

const {data:cityData} = useRequest<MyCenter.AreaVo[]>(getProvinceList, {
  manual:false
});

function choseCity(){
  citySelectShow.value=true;
}
function confirmCity(value:any){
  citySelectShow.value=false;
  params.provinceCode = value.detail.value;
  params.province = value.detail.name;
  scrollViewRef.value.search();
}
function choseStore(item:any){
  setStore(item);
  router.navigateBack({});
}
function changeInput(){
  scrollViewRef.value.search();
}
onLoad(() => {
  params.province = uni.getStorageSync('province');
  params.provinceCode = uni.getStorageSync('provinceCode');
});
</script>

<template>
  <div class="relative">
    <div class="h-5vh bg-white flex justify-between w-100vw box-border p-x-32rpx items-center">
      <div class="text-titleMedium w-200rpx" @click="choseCity">
        {{ params.province }}
        <van-icon name="arrow-down" />
      </div>
      <div class="bg-pageBg flex flex-1 items-center p-x-32rpx box-border rounded-16rpx p-y-8rpx">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/search.png"
          class="mr-24rpx"
          width="28rpx"
          height="28rpx"
        />
        <input v-model="params.name" type="text" placeholder="请输入4S店名称" class="text-titleMedium" @change="changeInput">
      </div>
    </div>
    <nxScrollView ref="scrollViewRef" :cb-fn="getStoreList" :header-height="64" :params="params">
      <template #list="{ list }">
        <div class="lh-108rpx bg-pageBg p-x-32rpx">
          全部4S店
        </div>
        <div v-for="(item,index) in list as MyCenter.DealersAppPageResultAo[]" :key="index">
          <div class="w-100vw bg-white p-32rpx box-border" @click="choseStore(item)">
            <div class="flex justify-between items-center">
              <div class="font-bold flex-1">
                {{ item.name }}
              </div>
              <div class="text-gray text-titleMedium flex">
                {{ item.hotPhone }}
                <nx-image
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/phone.png"
                  class="ml-8rpx"
                  width="24rpx"
                  height="24rpx"
                />
              </div>
            </div>
            <div class="text-gray mt-24rpx text-titleMedium flex items-center">
              <nx-image
                src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/position.png"
                class="mr-8rpx"
                width="24rpx"
                height="24rpx"
              />
              {{ item.address }}
            </div>
            <div></div>
          </div>
        </div>
      </template>
    </nxScrollView>
    <van-action-sheet
      title="请选择所在地区"
      :show="citySelectShow"
      :actions="cityData?.map(item=>{
        return {
          value:item.areaId,
          name:item.shortName
        }
      })"
      close-on-click-overlay
      close-on-click-action
      @select="confirmCity"
      @close="citySelectShow=false"
    />
  </div>
</template>
<style scoped lang="scss">
</style>
