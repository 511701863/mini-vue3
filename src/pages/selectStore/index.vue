<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxScrollView from '@/components/nxScrollView/index.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import {areaList} from './areaList';
import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useStore } from '../../store/modules/store';

const {setStore} = useStore();
const router = useRouter();
const params = reactive({
  provinceCode:'',
  province:''
});
const citySelectShow =ref(false);
function choseCity(){
  citySelectShow.value=true;
}
function confirmCity(value:any){
  citySelectShow.value=false;
  params.provinceCode = value.detail.values[0].code;
  params.province = value.detail.values[0].name;
}
function choseStore(item:any){
  setStore(item);
  router.navigateBack({});
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
        <input type="text" placeholder="请输入4S店名称" class="text-titleMedium">
      </div>
    </div>
    <nxScrollView :cb-fn="getList" :header-height="64" :params="{pageSize:10}">
      <template #list="{ list }">
        <div class="lh-108rpx bg-pageBg p-x-32rpx">
          全部4S店
        </div>
        <div v-for="(item,index) in list" :key="index">
          <div class="w-100vw bg-white p-32rpx box-border" @click="choseStore(item)">
            <div class="flex justify-between items-center">
              <div class="font-bold flex-1">
                宜宾三丰
              </div>
              <div class="text-gray text-titleMedium flex">
                {{ '02800000000' }}
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
              {{ '成都市成华区建设路2段22号成都市成华区建设路2段22号' }}
            </div>
            <div></div>
          </div>
        </div>
      </template>
    </nxScrollView>
    <van-popup :show="citySelectShow" round position="bottom" close-on-click-overlay @close="citySelectShow=false">
      <van-area :area-list="areaList" value="110000" :columns-num="1" @cancel="citySelectShow=false" @confirm="confirmCity" />
    </van-popup>
  </div>
</template>
<style scoped lang="scss">
</style>
