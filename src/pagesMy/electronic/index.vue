<script setup lang="ts">
import { ref, reactive, Ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import type { TextData, Path } from './type';

import { getSetElectricList } from '@/api/my/electronic';

import AMap from '../../common/amap-wx.130.js';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

const { run: getSetElectricListFn, data: electricList } = useRequest<MyCenter.ElectricFenceVo[]>(getSetElectricList, {
  manual: true,
  onSuccess: (res) => {
    latitude.value = electricList.value?.[0].roundFence?.center?.latitude ?? electricList.value?.[0].polygonFence?.center?.latitude ?? uni.getStorageSync('latitude');
    longitude.value = electricList.value?.[0].roundFence?.center?.longitude ?? electricList.value?.[0].polygonFence?.center?.longitude ?? uni.getStorageSync('longitude');
    state.markersData = electricList.value ?? [];
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
onShow(() => {
  getSetElectricListFn();
  DialogShow.value = false;
});
let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(1);
const markLength: Ref<number> = ref(1000);
const dialogDetail = ref({});
const DialogShow = ref(false);
const state = reactive({
  markers: [] as Path[],
  markersData: [] as MyCenter.ElectricFenceVo[],
  polygons: [] as any,
  circle: [] as any,
  chosen: {} as Path
});
const router = useRouter();

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
  let id = e.markerId;
  DialogShow.value = true;
  dialogDetail.value = state.markersData[e.detail.markerId];
  // createMarker(state.markersData);
  // tipBtn(2);
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
      scale="12"
      :show-location="true"
      :markers="state.markers"
      @markertap="makertap"
    ></map>
    <view class="absolute top-32rpx right-23rpx w-112rpx h-266rpx rounded-32rpx bg-white">
      <div class="text-center text-20rpx mt-24rpx" @click="router.navigateTo({ name: 'electronicList' })">
        <image
          class="w-48rpx h-48rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/electronicList.png"
        />
        <p>围栏列表</p>
      </div>
      <div class="text-center text-20rpx mt-50rpx" @click="router.navigateTo({ name: 'electronicAdd', query: { add: true } })">
        <image
          class="w-48rpx h-48rpx"
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/addElectronic.png"
        />
        <p>新增围栏</p>
      </div>
    </view>
    <ElectronicDiaLog v-model="DialogShow" :info="dialogDetail" @deleteFn="getSetElectricListFn" />
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
