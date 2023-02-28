<script setup lang="ts">
import { ref, reactive, Ref, computed, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';

import type { TextData, Path, markersData } from './type';

import { uniqueFunc } from '@/utils/tool/index';
import AMap from '../../common/amap-wx.130.js';
import { useRouter } from '@/router/router';
import { getElectricDetail } from '@/api/my/electronic';
import { useRequest } from '../../hooks/useRequest/useRequst';

let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const { run: getElectricDetailFn, data } = useRequest<MyCenter.ElectricFenceVo>(getElectricDetail, {
  manual: true,
  onSuccess: () => {
    latitude.value = data.value?.roundFence?.center?.latitude ?? data.value?.polygonFence?.center?.latitude ?? uni.getStorageSync('latitude');
    longitude.value = data.value?.roundFence?.center?.longitude ?? data.value?.polygonFence?.center?.longitude ?? uni.getStorageSync('longitude');
    state.markersData = data.value ? [data.value] : [];
    state.markers = state.markersData.map((item) => {
      return {
        latitude: (item.roundFence?.center?.latitude ?? item.polygonFence?.center?.latitude ?? 0) ?? 0,
        longitude: (item.roundFence?.center?.longitude ?? item.polygonFence?.center?.longitude ?? 0),
        length: item.roundFence?.radius ?? item.polygonFence?.radius,
        fenceType:item.fenceType
      };
    });
    checkLocal.value = {
      address: state.markersData[0].centerAddress ?? '',
      name: state.markersData[0].fenceCenter ?? ''
    };
    markType.value = state.markersData[0].fenceType === 'ROUND';
    createMarker(state.markers);
  }
});
const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(1);
const markLength: Ref<number> = ref(500);
const addFlag = ref(true);
const state = reactive({
  markers: [] as any[],
  markersData: [] as MyCenter.ElectricFenceVo[],
  polygons: [] as any,
  circle: [] as any,
  chosen: {} as Path
});
const router = useRouter();

onLoad((e) => {
  const { id, add } = e;
  if (add === 'true') {
    latitude.value = uni.getStorageSync('latitude');
    longitude.value = uni.getStorageSync('longitude');
    addFlag.value = true;
    wx.setNavigationBarTitle({ title: '电子围栏创建' });
  } else {
    wx.setNavigationBarTitle({ title: '电子围栏编辑' });
    getElectricDetailFn({ id });
    addFlag.value = false;
  }
});
//true为圆 false方形
const markType = ref(true);
function changeType() {
  markType.value = !markType.value;
  state.markers[0].fenceType = markType.value ? 'ROUND' :'POLYGON';
  tipBtn();
}
function changeSize(add: boolean) {
  if (add) {
    state.markers[0].length += 500;
  } else {
    if (state.markers[0].length <= 500) {
      state.markers[0].length = 500;
    } else {
      state.markers[0].length -= 500;
    }
  }
  tipBtn();
}

function tipBtn() {
  state.polygons = [];
  state.circle = [];
  console.log(state.markers);

  state.markers.forEach((element: any) => {
    //绘制圆
    if (element.fenceType === 'ROUND') {
      state.circle.push({
        longitude: element.longitude,
        latitude: element.latitude,
        radius: (element.length || markLength.value),
        fillColor: '#FF34543a',
        color: '#FF3454',
        strokeWidth: '1'
      });
    } else {
      //绘制矩形
      let points = [];
      points.push({
        ['longitude']: Number(+element.longitude + (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(+element.latitude - (element.length || markLength.value) / 111 / 1000)
      });
      points.push({
        ['longitude']: Number(+element.longitude + (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(+element.latitude + (element.length || markLength.value) / 111 / 1000)
      });
      points.push({
        ['longitude']: Number(+element.longitude - (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(+element.latitude + (element.length || markLength.value) / 111 / 1000)
      });
      points.push({
        ['longitude']: Number(+element.longitude - (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(+element.latitude - (element.length || markLength.value) / 111 / 1000)
      });
      element.path = points;
      state.polygons.push({
        points: points,
        dashArray: [10, 10],
        fillColor: '#FF34543a',
        strokeColor: '#FF3454',
        strokeWidth: '2',
        zIndex: 1
      });
    }
  });
  //将绘图信息
}
function makertap(e: any) {
  console.log(e);
}
function createMarker(data: any) {
  let markers = [];
  for (let j = 0; j < data.length; j++) {
    data[j].iconPath = 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/map_icon.png'; //如：..­/..­/img/marker_checked.png
    data[j].width = '80rpx';
    data[j].height = '96rpx';
    markers.push(data[j]);
  }
  state.markers = markers;
  tipBtn();
}
function nextTap(){
  let params = state.markersData[0];

  if(addFlag.value){
    params = state.markers[0];
    params.fenceCenter = checkLocal.value.name;
    params.centerAddress = checkLocal.value.address;
    params.fenceType = state.markers[0].fenceType ?? 'ROUND';
  }else{
    params = state.markersData[0];
    params.fenceType = state.markers[0].fenceType;
  }
  if(params.fenceType === 'ROUND'){
    params.polygonFence = null;
    params.roundFence = {
      center:{
        latitude:state.markers[0].latitude,
        longitude:state.markers[0].longitude
      },
      radius:state.markers[0].length
    };
  }else{
    params.roundFence = null;
    params.polygonFence = {
      center:{
        latitude:state.markers[0].latitude,
        longitude:state.markers[0].longitude
      },
      path:state.markers[0].path,
      radius:state.markers[0].length
    };
  }
  console.log(params);
  router.navigateTo({ name: 'electronicInfo', query: { add: addFlag.value, info:JSON.stringify(params) } });
}
//搜索相关
const tips: any = ref([]);
const onFocusFlag = ref(false);
const searchInput = ref('');
const localHistory = ref(uni.getStorageSync('localHistory') || []);
const checkLocal = ref({ name: '', address: '' });
function onFocus() {
  onFocusFlag.value = true;
}
function bindInput(e: any) {
  let keywords = e.detail.value;
  myAmapFun.getInputtips({
    keywords: keywords,
    location:`${uni.getStorageSync('longitude')},${uni.getStorageSync('latitude')}`,
    city: uni.getStorageSync('city'),
    success: function (data: any) {
      if (data && data.tips) {
        console.log(data.tips);
        tips.value = data.tips;
      }

    }
  });
}
function bindSearch(e: any) {
  // let keywords = e.target.dataset.keywords;
  const item = {
    longitude: '',
    latitude: '',
    fenceType:'ROUND',
    length:500
  };
  const locations = e.location.split(',');
  item.longitude = locations[0];
  item.latitude = locations[1];
  longitude.value = locations[0];
  latitude.value = locations[1];
  markType.value = true;
  createMarker([item]);
  onFocusFlag.value = false;
  searchInput.value = '';
  checkLocal.value = e;
  //搜索记录存入缓存
  localHistory.value.push(e);
  localHistory.value = uniqueFunc(localHistory.value, 'name');
  tips.value = localHistory.value;
  uni.setStorageSync('localHistory', localHistory.value);

}
watch(searchInput, (n) => {
  if (n === '') {
    tips.value = localHistory.value;
  }
}, { immediate: true });
// onLoad(() => {

// });

</script>

<template>
  <div class="relative">
    <map
      id="map"
      class="map"
      :circles="state.circle"
      :polygons="state.polygons"
      :longitude="longitude"
      :latitude="latitude"
      scale="14"
      :show-location="true"
      :markers="state.markers"
      @markertap="makertap"
    ></map>
    <div class="absolute top-20rpx left-32rpx z-30">
      <div class="flex justify-between w-686rpx h-106rpx bg-white rounded-32rpx items-center p-30rpx box-border">
        <input v-model="searchInput" placeholder="搜索围栏中心" class="flex-1" @input="bindInput" @focus="onFocus">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/search.png"
          width="48rpx"
          height="48rpx"
        />
      </div>
      <scroll-view v-if="onFocusFlag" :scroll-y="true" class="mt-20rpx w-686rpx h-1280rpx bg-white rounded-32rpx">
        <div
          v-for="(item) in tips"
          :key="item.name"
          @click="bindSearch(item)"
        >
          <div v-show="item.location?.length" class="flex justify-between items-center p-32rpx">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/local.png"
              width="32rpx"
              height="32rpx"
            />
            <div class="flex-1 ml-24rpx">
              <div>{{ item.name }}</div>
              <div class="text-titleSmall text-gray">
                {{ item.district + item.address }}
              </div>
            </div>
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/icon_arrow_right.png"
              width="24rpx"
              height="24rpx"
            />
          </div>
        </div>
      </scroll-view>
    </div>

    <div v-if="state.markers.length" class="absolute bottom-0">
      <div class="flex justify-between">
        <div
          class="bg-white rounded-34rpx w-212rpx h-96rpx flex justify-between items-center mb-20rpx  ml-24rpx"
          @click="changeType"
        >
          <nx-image
            :src="markType ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/changeEl2.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/changeEl.png'"
            width="96rpx"
            height="96rpx"
          />
          <div class="text-titleSmall mr-18rpx">
            {{ markType ? '切换方形' : '切换圆形' }}
          </div>
        </div>
        <div class="bg-white rounded-32rpx w-324rpx h-96rpx flex justify-between items-center mb-20rpx  mr-24rpx">
          <div @click="changeSize(false)">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/reduceEl.png"
              width="96rpx"
              height="96rpx"
            />
          </div>
          <div @click="changeSize(true)">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/addEl.png"
              width="96rpx"
              height="96rpx"
            />
          </div>
          <div class="text-titleSmall mr-18rpx">
            围栏缩放
          </div>
        </div>
      </div>
      <div class="box-border p-32rpx p-y-42rpx w-750rpx bg-white rounded-t-32rpx box-border  p-32rpx p-y-42rpx">
        <div class="text-titleLarge font-bold mb-48rpx">
          围栏中心
        </div>
        <div class="flex justify-between items-start mb-88rpx">
          <nx-image
            src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/car_in_map.png"
            width="112rpx"
            height="112rpx"
          />
          <div class="flex-1 ml-24rpx">
            <div class="text-titleLarge font-bold mb-12rpx">
              {{ checkLocal.name }}
            </div>
            <div class="text-titleMedium text-gray">
              {{ checkLocal.address }}
            </div>
          </div>
        </div>
        <button
          class="rounded-50rpx w-686rpx h-100rpx bg-buttonColor text-white text-32rpx lh-100rpx"
          @click="nextTap"
        >
          下一步
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
