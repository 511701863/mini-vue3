<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import AMap from '@/common/amap-wx.130.js';
import { useConfig } from '@/store/modules/config';
// import { QDinit } from '@/helper/tracker';

// QDinit();
// login();
let myAmapFun = new AMap.AMapWX({ key: 'cf893f474862b6533054310120072d17' });

onLaunch(() => {
  console.log('App onLaunch');
});
onShow(() => {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      uni.setStorageSync('longitude', res.longitude);
      uni.setStorageSync('latitude', res.latitude);
      myAmapFun.getRegeo({
        location: `${res.longitude},${res.latitude}`,
        success: function (res: any) {
          uni.setStorageSync('city', res[0].regeocodeData.addressComponent.city);
          uni.setStorageSync('addName', res[0].desc);
          uni.setStorageSync('provinceCode', res[0].regeocodeData.addressComponent.adcode.slice(0, 3) + '000');
          uni.setStorageSync('province', res[0].regeocodeData.addressComponent.province);
          uni.setStorageSync('findCity', res[0].regeocodeData.addressComponent.city);
          uni.setStorageSync('address', res[0].regeocodeData.formatted_address);
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
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style></style>
