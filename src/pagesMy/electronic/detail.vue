<script setup lang="ts">
import { ref, reactive, Ref, computed, watch } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import type { TextData, Path, markersData } from './type';

import AMap from '../../common/amap-wx.130.js';
import { getElectricDetail} from '@/api/my/electronic';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

const { run:getElectricDetailFn, data } = useRequest<MyCenter.ElectricFenceVo>(getElectricDetail, {
  manual: true,
  onSuccess:() => {
    latitude.value = data.value?.roundFence?.center?.latitude ?? data.value?.polygonFence?.center?.latitude ?? uni.getStorageSync('latitude');
    longitude.value = data.value?.roundFence?.center?.longitude ?? data.value?.polygonFence?.center?.longitude ?? uni.getStorageSync('longitude');
    state.markersData = data.value? [data.value] : [];
    state.markers = state.markersData.map((item) => {
      return {
        latitude: (item.roundFence?.center?.latitude ?? item.polygonFence?.center?.latitude ?? 0) ?? 0,
        longitude: (item.roundFence?.center?.longitude ?? item.polygonFence?.center?.longitude ?? 0),
        length: item.roundFence?.radius ?? item.polygonFence?.radius,
        type: item.roundFence ? 1 : 2
      };
    });
    createMarker(state.markers);
  }
});
const eId:any = ref('');
onLoad((query) => {
  const { id } = query;
  eId.value = id;
  getElectricDetailFn({id});
});
onShow(() => {
  getElectricDetailFn({id:eId.value});
});
let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(1);
const markLength: Ref<number> = ref(500);
const DialogShow = ref(true);
const state = reactive({
  markers: [] as Path[],
  markersData: [] as MyCenter.ElectricFenceVo[],
  polygons: [] as any,
  circle: [] as any,
  chosen: {} as Path
});
const router = useRouter();

//true为圆 false方形
const markType = ref(true);
function tipBtn() {
  state.polygons = [];
  state.circle = [];
  state.markers.forEach((element: any) => {
    //绘制圆
    if (element.type === 1) {
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
      console.log(element.length);

      points.push({
        ['longitude']: Number(element.longitude + (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(element.latitude - (element.length || markLength.value) / 111 / 1000)
      });
      points.push({
        ['longitude']: Number(element.longitude + (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(element.latitude + (element.length || markLength.value) / 111 / 1000)
      });
      points.push({
        ['longitude']: Number(element.longitude - (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(element.latitude + (element.length || markLength.value) / 111 / 1000)
      });
      points.push({
        ['longitude']: Number(element.longitude - (element.length || markLength.value) / 100 / 1000),
        ['latitude']: Number(element.latitude - (element.length || markLength.value) / 111 / 1000)
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
}
function createMarker(data: any) {
  let markers = [];
  for (let j = 0; j < data.length; j++) {
    data[j].iconPath = 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/map_icon.png'; //如：..­/..­/img/marker_checked.png
    data[j].width = '80rpx';
    data[j].height = '96rpx';
    data[j].id = j;
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
    <ElectronicDiaLog v-model="DialogShow" :overlay="false" :info="data" />
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
