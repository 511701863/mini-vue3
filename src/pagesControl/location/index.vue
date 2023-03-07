<script setup lang="ts">
import { ref, reactive, Ref, computed, watch, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import ControlDiaLog from './components/ControlDiaLog.vue';
import PinInput from '@/components/pinInput/myp-one.vue';

import type { TextData, Path, markersData } from './type';

import qqmapsdk from '@/utils/sdk/qq-map-sdk/index';
import { findVehicleDefault } from '../../api/control/index';
import dayjs from 'dayjs';
import { sendToCar, getCarLocation } from '@/api/control/location';
import { uniqueFunc, getDistance } from '@/utils/tool/index';
import AMap from '../../common/amap-wx.130.js';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import { useConfig } from '@/store/modules/config';

const { setPin, config } = useConfig();

const { run: getCarLocationFn, data } = useRequest<Control.VehicleLocationAo>(getCarLocation, {
  manual: true,
  onSuccess: () => {
    const params: any = data.value;
    //没有车位置的情况
    if (data.value?.longitude === 0 || data.value?.latitude === 0) {
      latitude.value = uni.getStorageSync('latitude');
      longitude.value = uni.getStorageSync('longitude');
      state.chosen = {
        address: uni.getStorageSync('address'),
        name: uni.getStorageSync('addName'),
        latitude: uni.getStorageSync('latitude'),
        longitude: uni.getStorageSync('longitude')
      };
      createMarker([]);
      return;
    }
    myAmapFun.getRegeo({
      location: `${data.value?.longitude},${data.value?.latitude}`,
      success: (res: any) => {
        state.chosen.id = 1;
        params.latitude = Number(params.latitude?.toFixed(6));
        params.longitude = Number(params.longitude?.toFixed(6));
        nextTick(() => {
          latitude.value = params.latitude;
          longitude.value = params.longitude;
          let mapCtx = wx.createMapContext('myMap');
          mapCtx.moveToLocation({ latitude: params.latitude, longitude: params.longitude });
        });
        console.log(res[0].regeocodeData.addressComponent.building?.name);

        //车辆所在地信息
        params.name = Array.isArray(res[0].regeocodeData.addressComponent.building?.name) ? res[0].regeocodeData.addressComponent.township : res[0].regeocodeData.addressComponent.building?.name;
        params.address = res[0].regeocodeData.formatted_address ?? '';
        params.distance = getDistance(uni.getStorageSync('latitude'), uni.getStorageSync('longitude'), params.latitude, params.longitude);
        state.chosen = params;
        createMarker([params]);
      }
    });
  }
});
const { run: sendToCarFn } = useRequest(sendToCar, {
  manual: true,
  onSuccess: () => {
    uni.showToast({
      title: '发送成功',
      icon: 'none'
    });
  }
});
const { run: findVehicleDefaultFn, data: carDetail } = useRequest(findVehicleDefault, {
  manual: false
});
let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });
const latitude = ref(uni.getStorageSync('latitude'));
const longitude = ref(uni.getStorageSync('longitude'));
const scale: Ref<number> = ref(15);
const isShow = ref(false);
const state = reactive({
  markers: [] as Path[],
  markersData: [] as markersData,
  chosen: {} as Path
});
const carVin: any = ref('');
onLoad((query) => {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      uni.setStorageSync('longitude', res.longitude);
      uni.setStorageSync('latitude', res.latitude);
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res: any) {
          uni.setStorageSync('city', res.result.ad_info.city);
          uni.setStorageSync('addName', res.result.formatted_addresses.recommend);
          uni.setStorageSync('provinceCode', res.result.ad_info.adcode.slice(0, 3) + '000');
          uni.setStorageSync('province', res.result.ad_info.province);
          uni.setStorageSync('findCity', res.result.ad_info.city);
          uni.setStorageSync('address', res.result.address);
          const { vin } = query;
          carVin.value = vin;
          getCarLocationFn({ vin });
        },
        fail: function (error: any) {
          console.error(error);
        }
      });
    },
    fail() {
      uni.showToast({
        title: '位置获取失败',
        icon: 'error',
        duration: 2000
      });
    }
  });
});

function makertap(e: any) {
  //没有车辆的情况
  if (state.markers.length === 2 && e.markerId === 2) {
    state.chosen = state.markers[1];
    return;
  }
  state.chosen = state.markers[e.markerId];
}
function createMarker(data: any) {
  const markerList = [{
    id: 0,
    width: '122rpx',
    height: '134rpx',
    iconPath: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/self.png',
    address: uni.getStorageSync('address'),
    name: uni.getStorageSync('addName'),
    latitude: uni.getStorageSync('latitude'),
    longitude: uni.getStorageSync('longitude')
  }];
  if (data.length) {
    data[0].iconPath = 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/lCar.png'; //如：..­/..­/img/marker_checked.png
    data[0].width = '80rpx';
    data[0].height = '96rpx';
    data[0].id = 1;
    markerList.push(data[0]);
  }
  state.markers = markerList;
  console.log(state.markers);
}
function restMap() {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      uni.setStorageSync('longitude', res.longitude);
      uni.setStorageSync('latitude', res.latitude);
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res: any) {
          uni.setStorageSync('city', res.result.ad_info.city);
          uni.setStorageSync('addName', res.result.formatted_addresses.recommend);
          uni.setStorageSync('provinceCode', res.result.ad_info.adcode.slice(0, 3) + '000');
          uni.setStorageSync('province', res.result.ad_info.province);
          uni.setStorageSync('findCity', res.result.ad_info.city);
          uni.setStorageSync('address', res.result.address);
          getCarLocationFn({ vin: carVin.value });
          let mapCtx = wx.createMapContext('myMap');
          mapCtx.moveToLocation();
        },
        fail: function (error: any) {
          console.error(error);
        }
      });
    },
    fail() {
      uni.showToast({
        title: '位置获取失败',
        icon: 'error',
        duration: 2000
      });
    }
  });

}
function send() {
  sendToCarFn({
    detailedAddress: state.chosen.address,
    latitude: state.chosen.latitude,
    longitude: state.chosen.longitude,
    position: state.chosen.name,
    vin: carVin.value
  });
}
function openEnjoy() {
  wx.openLocation({
    latitude: +state.chosen.latitude,
    longitude: +state.chosen.longitude,
    address: state.chosen.address,
    name: state.chosen.name,
    scale: 18
  });
}
//搜索相关
const tips: any = ref([]);
const onFocusFlag = ref(false);
const searchInput = ref('');
const localHistory = ref(uni.getStorageSync('localHistory') || []);
function onFocus() {
  onFocusFlag.value = true;
}
function bindInput(e: any) {
  let keywords = e.detail.value;
  myAmapFun.getInputtips({
    keywords: keywords,
    location: '',
    city: uni.getStorageSync('city'),
    success: function (data: any) {
      if (data && data.tips) {
        tips.value = data.tips;
      }

    }
  });
}
function bindSearch(e: any) {
  // let keywords = e.target.dataset.keywords;
  const item: any = {
    longitude: '',
    latitude: '',
    address: '',
    name: ''
  };
  const locations = e.location.split(',');
  item.longitude = locations[0];
  item.latitude = locations[1];
  item.address = e.district + e.address;
  item.name = e.name;
  item.latitude = locations[1];
  longitude.value = locations[0];
  latitude.value = locations[1];
  //绘图
  item.iconPath = 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/destination.png'; //如：..­/..­/img/marker_checked.png
  item.width = '80rpx';
  item.height = '96rpx';
  item.id = 3;
  if (state.markers.length < 3) {
    state.markers.push(item);
  } else {
    state.markers.splice(2, 3, item);
  }
  item.distance = getDistance(uni.getStorageSync('latitude'), uni.getStorageSync('longitude'), item.latitude, item.longitude);

  state.chosen = item;
  state.chosen.id = 2;
  scale.value = 16;

  onFocusFlag.value = false;
  searchInput.value = '';
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
      id="myMap"
      class="map"
      :longitude="longitude"
      :latitude="latitude"
      :scale="scale"
      :markers="state.markers"
      @markertap="makertap"
    ></map>
    <div class="absolute top-20rpx left-32rpx z-30">
      <div class="flex justify-between w-686rpx h-106rpx bg-white rounded-32rpx items-center p-30rpx box-border">
        <input v-model="searchInput" placeholder="搜索目的地" class="flex-1" @input="bindInput" @focus="onFocus">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/search.png"
          width="48rpx"
          height="48rpx"
        />
      </div>
      <scroll-view v-if="onFocusFlag" :scroll-y="true" class="mt-20rpx w-686rpx h-1280rpx bg-white rounded-32rpx">
        <div v-for="(item) in tips" :key="item.name" @click="bindSearch(item)">
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
    <div class="absolute top-158rpx right-32rpx z-10">
      <div @click="restMap">
        <nx-image
          src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/reload.png"
          width="96rpx"
          height="96rpx"
        />
      </div>
    </div>
    <div class="absolute bottom-0">
      <div
        v-if="state.chosen.id === 2"
        class="box-border p-32rpx p-y-56rpx w-750rpx bg-white rounded-t-32rpx box-border  p-32rpx p-y-42rpx"
      >
        <div class="flex justify-between mb-32rpx">
          <div class="text-36rpx font-bold">
            目的位置
          </div>
          <div class="text-titleMedium text-gray">
          </div>
        </div>
        <div class="flex justify-between items-center mb-48rpx">
          <div class="flex-1">
            <div class="text-titleLarge font-bold mb-12rpx">
              {{ state.chosen.name }}
            </div>
            <div class="text-titleMedium text-gray mb-12rpx">
              {{ state.chosen.address }}
            </div>
            <div class="text-titleMedium">
              {{ state.chosen.distance }}
            </div>
          </div>
          <div @click="openEnjoy">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/enjoy.png"
              width="72rpx"
              height="72rpx"
            />
          </div>
        </div>
        <div class="flex flex-between">
          <button class="button-white w-320rpx" @click="openEnjoy">
            导航
          </button>
          <button class="button-primary w-320rpx" @click="send">
            发送到车
          </button>
        </div>
      </div>
      <div
        v-else-if="state.chosen.id === 1"
        class="box-border p-32rpx p-y-56rpx w-750rpx bg-white rounded-t-32rpx box-border  p-32rpx p-y-42rpx"
      >
        <div class="flex justify-between mb-32rpx">
          <div class="text-36rpx font-bold">
            车辆位置
          </div>
          <div class="text-titleMedium text-gray">
            {{ dayjs(state.chosen.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </div>
        <div class="flex justify-between items-center mb-48rpx">
          <div class="flex-1">
            <div class="text-titleLarge font-bold mb-12rpx">
              {{ state.chosen.name }}
            </div>
            <div class="text-titleMedium text-gray mb-12rpx">
              {{ state.chosen.address }}
            </div>
            <div class="text-titleMedium">
              {{ state.chosen.distance }}
            </div>
          </div>
          <div @click="openEnjoy">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/enjoy.png"
              width="72rpx"
              height="72rpx"
            />
          </div>
        </div>
        <div class="flex flex-between">
          <button class="button-white w-320rpx" @click="setPin(true, 0, () => { isShow = true })">
            寻车
          </button>
          <button class="button-primary w-320rpx" @click="openEnjoy">
            导航到车
          </button>
        </div>
      </div>
      <div v-else class="box-border p-32rpx p-y-56rpx w-750rpx bg-white rounded-t-32rpx box-border  p-32rpx p-y-42rpx">
        <div class="text-36rpx font-bold mb-32rpx">
          我的位置
        </div>
        <div class="flex justify-between items-center mb-48rpx">
          <div class="flex-1">
            <div class="text-titleLarge font-bold mb-12rpx">
              {{ state.chosen.name }}
            </div>
            <div class="text-titleMedium text-gray mb-12rpx">
              {{ state.chosen.address }}
            </div>
          </div>
          <div @click="openEnjoy">
            <nx-image
              src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/enjoy.png"
              width="72rpx"
              height="72rpx"
            />
          </div>
        </div>
      </div>
    </div>
    <PinInput type="box" />
    <ControlDiaLog v-model="isShow" :car-info="carDetail" :btn-id="2" />
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
