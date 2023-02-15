<script setup lang="ts">
import { ref, reactive, Ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import type { TextData, Path, markersData } from './type';

import AMap from '../../common/amap-wx.130.js';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(1);
const markLength: Ref<number> = ref(0.1);
const DialogShow = ref(false);
const state = reactive({
  markers: [] as Path[],
  markersData: [] as markersData,
  polygons: [] as any,
  circle: [] as any,
  chosen: {} as Path
});
//获取当前位置 poi搜索附近兴趣点 模拟数据
myAmapFun.getPoiAround({
  success: function (data: any) {
    latitude.value = uni.getStorageSync('latitude');
    longitude.value = uni.getStorageSync('longitude');
    state.markersData = data.markers.splice(0, 1).concat(data.markers[9]);
    state.markers = state.markersData;
    createMarker(state.markersData);
    //成功回调
  },
  fail: function (info: any) {
    //失败回调
    console.log(info, 123);
  }
});
const router = useRouter();

function tipBtn() {
  state.polygons = [];
  state.circle = [];
  state.markers.forEach((element:any) => {
    //绘制圆
    if (element.type === 1) {
      state.circle.push({
        longitude: element.longitude,
        latitude: element.latitude,
        radius: markLength.value * 1000,
        fillColor: '#FF34543a',
        color: '#FF3454',
        strokeWidth:'1'
      });
    } else {
      //绘制矩形
      let points = [];
      points.push({
        ['longitude']: Number(element.longitude + markLength.value / 100),
        ['latitude']: Number(element.latitude - markLength.value / 111)
      });
      points.push({
        ['longitude']: Number(element.longitude + markLength.value / 100),
        ['latitude']: Number(element.latitude + markLength.value / 111)
      });
      points.push({
        ['longitude']: Number(element.longitude - markLength.value / 100),
        ['latitude']: Number(element.latitude + markLength.value / 111)
      });
      points.push({
        ['longitude']: Number(element.longitude - markLength.value / 100),
        ['latitude']: Number(element.latitude - markLength.value / 111)
      });
      state.polygons.push({
        points: points,
        dashArray:[10, 10],
        fillColor: '#FF34543a',
        strokeColor: '#FF3454',
        strokeWidth:'2',
        zIndex: 1
      });
    }
  });

}
function makertap(e: any) {
  let id = e.markerId;
  console.log(e);
  DialogShow.value = true;
  // createMarker(state.markersData);
  // tipBtn(2);
}
function createMarker(data: any) {
  let markers = [];
  for (let j = 0; j < data.length; j++) {
    data[j].iconPath = 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/map_icon.png'; //如：..­/..­/img/marker_checked.png
    data[j].width = '80rpx';
    data[j].height = '96rpx';
    data[j].type = j+1;
    markers.push(data[j]);
  }
  state.markers = markers;
  tipBtn();
}

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
      scale="15"
      :show-location="true"
      :markers="state.markers"
      @markertap="makertap"
    ></map>
    <view class="absolute top-32rpx right-23rpx w-112rpx h-266rpx rounded-32rpx bg-white">
      <div class="text-center text-20rpx mt-24rpx" @click="router.navigateTo({ name:'electronicList'})">
        <image
          class="w-48rpx h-48rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/electronicList.png"
        />
        <p>围栏列表</p>
      </div>
      <div class="text-center text-20rpx mt-50rpx" @click="router.navigateTo({ name:'electronicAdd',query:{add:true}})">
        <image
          class="w-48rpx h-48rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/addElectronic.png"
        />
        <p>新增围栏</p>
      </div>
    </view>
    <ElectronicDiaLog v-model="DialogShow" />
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
