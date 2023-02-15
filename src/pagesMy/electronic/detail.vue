<script setup lang="ts">
import { ref, reactive, Ref, computed, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import type { TextData, Path, markersData } from './type';

import AMap from '../../common/amap-wx.130.js';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(1);
const markLength: Ref<number> = ref(0.5);
const DialogShow = ref(true);
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

    state.markersData = data.markers.splice(0, 1);
    state.markers = state.markersData;
    latitude.value = state.markersData[0].latitude;
    longitude.value = state.markersData[0].longitude;
    createMarker(state.markersData);
    //成功回调
  },
  fail: function (info: any) {
    //失败回调
    console.log(info, 123);
  }
});
const router = useRouter();

//true为圆 false方形
const markType = ref(true);
function tipBtn() {
  state.polygons = [];
  state.circle = [];
  state.markers.forEach((element: any) => {
    //绘制圆
    if (markType.value) {
      state.circle.push({
        longitude: element.longitude,
        latitude: element.latitude,
        radius: markLength.value * 1000,
        fillColor: '#FF34543a',
        color: '#FF3454',
        strokeWidth: '1'
      });
    } else {
      //绘制矩形
      let points = [];
      points.push({
        ['longitude']: Number(+element.longitude + markLength.value / 100),
        ['latitude']: Number(+element.latitude - markLength.value / 111)
      });
      points.push({
        ['longitude']: Number(+element.longitude + markLength.value / 100),
        ['latitude']: Number(+element.latitude + markLength.value / 111)
      });
      points.push({
        ['longitude']: Number(+element.longitude - markLength.value / 100),
        ['latitude']: Number(+element.latitude + markLength.value / 111)
      });
      points.push({
        ['longitude']: Number(+element.longitude - markLength.value / 100),
        ['latitude']: Number(+element.latitude - markLength.value / 111)
      });
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

}
function makertap(e: any) {
  console.log(e);
  // let id = e.markerId;
  // console.log(e);
  // DialogShow.value = true;
  // createMarker(state.markersData);
  // tipBtn(2);
}
function createMarker(data: any) {
  let markers = [];
  for (let j = 0; j < data.length; j++) {
    data[j].iconPath = 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/map_icon.png'; //如：..­/..­/img/marker_checked.png
    data[j].width = '80rpx';
    data[j].height = '96rpx';
    data[j].type = j + 1;
    markers.push(data[j]);
  }
  state.markers = markers;
  tipBtn();
}
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
    <ElectronicDiaLog v-model="DialogShow" :overlay="false" />
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
