<script setup lang="ts">
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, Ref } from 'vue';
import posC from '../../static/images/poscheck.png';
import pos from '../../static/images/pos.png';
import AMap from '../../common/amap-wx.130.js';
import { TextData, Path, markersData } from './type';
  // const { data: data1, params: params1, run } = useRequest(getUsername, { manual: true });
// console.log(run);

let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(0);
const markLength:Ref<number> = ref(0.5);
const state = reactive({
  textData: {} as TextData,
  markers: [] as Path[],
  markersData: [] as markersData,
  polygons: [] as any,
  circle: [] as any,
  chosen: {} as Path
});
//获取当前位置 poi搜索附近兴趣点
myAmapFun.getPoiAround({
  success: function (data: any) {
    state.markersData = data.markers;
    state.markers = state.markersData;
    latitude.value = state.markersData[1].latitude;
    longitude.value = state.markersData[1].longitude;
    showMarkerInfo(state.markersData, 1);
    changeMarkerColor(state.markersData, 0);
    //成功回调
  },
  fail: function (info: any) {
    //失败回调
    console.log(info, 123);
  }
});
const router = useRouter();
function changeLength(e: any) {
  markLength.value = e.detail;
  tipBtn(2);
}
function tipBtn(type: number) {
  state.polygons = [{
      longitude: undefined,
      latitude: undefined,
      radius: 1
    }];
  state.circle = [{
      points: undefined
    }];
  //绘制圆
  if (type === 1) {
    state.circle = [{
      longitude: state.chosen.longitude,
      latitude: state.chosen.latitude,
      radius: markLength.value * 1000,
      fillColor: '#FF7A791a',
      strokeColor: '#FF7A79',
      zIndex: 1
    }];
  } else {
    //绘制矩形
    let pointss = [];
    pointss.push({
      ['longitude']: Number(state.chosen.longitude + markLength.value / 100),
      ['latitude']: Number(state.chosen.latitude - markLength.value / 111)
    });
    pointss.push({
      ['longitude']: Number(state.chosen.longitude + markLength.value / 100),
      ['latitude']: Number(state.chosen.latitude + markLength.value / 111)
    });
    pointss.push({
      ['longitude']: Number(state.chosen.longitude - markLength.value / 100),
      ['latitude']: Number(state.chosen.latitude + markLength.value / 111)
    });
    pointss.push({
      ['longitude']: Number(state.chosen.longitude - markLength.value / 100),
      ['latitude']: Number(state.chosen.latitude - markLength.value / 111)
    });
    state.polygons = [{
      points: pointss,
      fillColor: '#FF7A794a',
      strokeColor: '#FF7A39',
      zIndex: 1
    }];
  }

}
function makertap(e: any) {
  let id = e.markerId;
  showMarkerInfo(state.markersData, id);
  changeMarkerColor(state.markersData, id);
  tipBtn(2);
}
function showMarkerInfo(data: any, i: number) {
  state.textData = {
    name: data[i].name,
    desc: data[i].address
  };
}
function changeMarkerColor(data: any, i: number) {
  let markers = [];
  for (let j = 0; j < data.length; j++) {
    if (j === i) {
      state.chosen = data[j];
      data[j].iconPath = posC; //如：..­/..­/img/marker_checked.png
    } else {
      data[j].iconPath = pos; //如：..­/..­/img/marker.png
    }
    data[j].width = '25';
    data[j].height = '25';
    markers.push(data[j]);
  }
  state.markers = markers;
}

onLoad(() => {
  // uni.getSystemInfo({
  //   success: function (res) {
  //     screenHeight.value = res.windowHeight;
  //   }
  // });
});

</script>

<template>
  <div>
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
    <view class="map_text">
      <text class="h1">
        {{ state.textData.name }}
      </text>
      <text>{{ state.textData.desc }}</text>
      <view>
        <van-field
          :value="markLength"
          title-width="200"
          label="设置围栏范围(公里)"
          placeholder="设置围栏范围(公里)"
          :border="false"
          @change="changeLength"
        />
      </view>
      <view class="button-box">
        <van-button size="normal" type="info" @click="tipBtn(1)">
          圆形围栏
        </van-button>
        <van-button size="normal" type="primary" @click="tipBtn(2)">
          矩形围栏
        </van-button>
      </view>
    </view>
  </div>
</template>
<style scoped lang="scss">
.button-box {
  display: flex;
  justify-content: space-around;
}

.map {
  width: 750rpx;
  height: 950rpx;
}
.map_text {
  height: 80px;
  background: #fff;
  padding: 0 15px;
}

text {
  margin: 5px 0;
  display: block;
  font-size: 12px;
}

.h1 {
  margin: 15px 0;
  font-size: 15px;
}
</style>
